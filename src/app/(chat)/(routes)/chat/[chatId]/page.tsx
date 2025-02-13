import { RedirectToSignIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import prismadb from "@/lib/prismadb";
import ChatClient from "./components/client";

interface ChatIdPageProps {
  params: { chatId: string }; // ✅ params ko sahi type diya
}

export default async function ChatIdPage({ params }: ChatIdPageProps) {
  const { userId } = await auth(); // ✅ Auth ko await karna sahi hai

  if (!userId) return <RedirectToSignIn />;

  if (!params?.chatId) {
    throw new Error("Chat ID is missing");
  }

  const companion = await prismadb.companion.findUnique({
    where: { id: params.chatId }, // ✅ Direct params.chatId use karo
    include: {
      messages: { orderBy: { createdAt: "asc" }, where: { userId } },
      _count: { select: { messages: true } }
    }
  });

  if (!companion) return redirect("/");

  return <ChatClient companion={companion} />;
}
