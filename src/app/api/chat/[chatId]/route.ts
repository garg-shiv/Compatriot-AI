import dotenv from "dotenv";
import { LangChainAdapter } from "ai";
import { currentUser } from "@clerk/nextjs/server";
import { Replicate } from "@langchain/community/llms/replicate";
import { NextResponse, NextRequest } from "next/server";
import { MemoryManager } from "@/lib/memory";
import { ratelimit } from "@/lib/rate-limit";
import prismadb from "@/lib/prismadb";

dotenv.config({ path: `.env` });

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ chatId: string }> }
) {
  try {
    const { prompt } = await request.json();
    const user = await currentUser();

    if (!user || !user.firstName || !user.id)
      return new NextResponse("Unauthorized!", { status: 401 });

    const identifier = request.url + "-" + user.id;
    const { success } = await ratelimit(identifier);

    if (!success)
      return new NextResponse("Ratelimit Exceeded!", { status: 429 });

    const { chatId } = await params;
    const companion = await prismadb.companion.update({
      where: { id: chatId },
      data: {
        messages: {
          create: {
            content: prompt,
            role: "user",
            userId: user.id,
          },
        },
      },
    });

    if (!companion)
      return new NextResponse("Companion Not Found.", { status: 404 });

    const name = companion.id;
    const companion_file_name = name + ".txt";

    const companionKey = {
      companionName: name,
      userId: user.id,
      modelName: "llama2-13b",
    };

    const memoryManager = await MemoryManager.getInstance();
    const records = await memoryManager.readLatestHistory(companionKey);

    if (records.length === 0)
      await memoryManager.seedChatHistory(companion.seed, "\n\n", companionKey);

    await memoryManager.writeToHistory("User: " + prompt + "\n", companionKey);

    const recentChatHistory = await memoryManager.readLatestHistory(
      companionKey
    );
    const similarDocs = await memoryManager.vectorSearch(
      recentChatHistory,
      companion_file_name
    );

    let relevantHistory = "";
    if (!!similarDocs && similarDocs.length !== 0)
      relevantHistory = similarDocs.map((doc) => doc.pageContent).join("\n");

    const model = new Replicate({
      model:
        "a16z-infra/llama-2-13b-chat:df7690f1994d94e96ad9d568eac121aecf50684a0b0963b25a41cc40061269e5",
      input: { max_length: 2048 },
      apiKey: process.env.REPLICATE_API_TOKEN,
    });

    model.verbose = true;

    const stream = await model.stream(`
      ONLY generate plain sentences without prefix of who is speaking. DO NOT use ${companion.name}: prefix. 

      ${companion.instructions}

      Below are relevant details about ${companion.name}'s past and the conversation you are in.
      ${relevantHistory}

      ${recentChatHistory}\n${companion.name}:`);

    let fullResponse = "";

    const interceptingStream = new ReadableStream({
      async start(controller) {
        const reader = stream[Symbol.asyncIterator]();
        while (true) {
          const { value, done } = await reader.next();
          if (done) break;
          const text = value.toString();
          fullResponse += text;
          controller.enqueue(text);
        }

        // Persist AI message AFTER streaming ends
        await memoryManager.writeToHistory(
          `System: ${fullResponse}\n`,
          companionKey,
          "agent"
        );

        await prismadb.companion.update({
          where:{
            id:chatId,
          },
          data:{
            messages:{
              create:{
                content: fullResponse.trim(),
                role: "system",
                userId: user.id,
              }
            }
          }
        });
        controller.close();
      },
    });

    return LangChainAdapter.toDataStreamResponse(interceptingStream);
  } catch (error) {
    console.error("[CHAT_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
