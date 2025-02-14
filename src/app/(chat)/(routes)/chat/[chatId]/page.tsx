import { RedirectToSignIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import prismadb from "@/lib/prismadb";
import ChatClient from "./components/client";
/*
interface ChatIdPageProps {
  chatId: string  
}
*/
export default async function chatIdPage({params}) {
  const {chatId} = await params;  
  const { userId } = await auth();

  if (!userId) return <RedirectToSignIn />;

  if (!chatId) {
    throw new Error("Chat ID is missing");
  }

  const companion = await prismadb.companion.findUnique({
    where: { id: chatId }, 
    include: {
      messages: { orderBy: { createdAt: "asc" }, where: { userId } },
      _count: { select: { messages: true } }
    }
  });

  if (!companion) return redirect("/");

  return <ChatClient companion={companion} />;
}
