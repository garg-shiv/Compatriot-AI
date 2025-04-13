import { RedirectToSignIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import ChatClient from "./components/client";
import { getCompanions } from "@/fetchData/getCompanion";
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

  const companion = await getCompanions({userId,chatId});

  if (!companion) return redirect("/");

  return <ChatClient companion={companion} />;
}
