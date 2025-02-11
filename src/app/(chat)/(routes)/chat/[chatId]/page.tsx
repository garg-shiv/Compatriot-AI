import React from "react";
import { auth } from '@clerk/nextjs/server';
import prismadb from "@/lib/prismadb";
import ChatClient from "./components/client";

interface ChatIdPageProps {
  params: { chatId: string };
}

export default async function ChatIdPage({ params }: ChatIdPageProps) {
  const { userId, redirectToSignIn } = await auth();

  if (!userId) return redirectToSignIn(); // ✅ Yehi use kiya

  if (!params?.chatId) return redirectToSignIn(); // ✅ Params check bhi iske saath fix

  const companion = await prismadb.companion.findUnique({
    where: { id: params.chatId },
    include: {
      messages: { orderBy: { createdAt: "asc" }, where: { userId } },
      _count: { select: { messages: true } }
    }
  });

  if (!companion) return redirectToSignIn(); // ✅ Agar data na mile to bhi sign-in pe bhej

  return <ChatClient companion={companion} />;
}
