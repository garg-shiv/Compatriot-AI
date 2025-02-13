import { auth } from '@clerk/nextjs/server';
import prismadb from "@/lib/prismadb";
import { CompanionForm } from "./components/companion-form";

interface CompanionIdPageProps {
  params?: { companionId?: string }; // ✅ Params optional kiya to avoid undefined error
}

export default async function CompanionIdPage({ params }: CompanionIdPageProps) {
  if (!params?.companionId) return null; // ✅ Agar params undefined hai to return

  const { userId, redirectToSignIn } = await auth();
  if (!userId) return redirectToSignIn();

  const companion = await prismadb.companion.findUnique({
    where: { id: params.companionId, userId }
  });

  const categories = await prismadb.category.findMany();

  return <CompanionForm initialData={companion} categories={categories} />;
}
