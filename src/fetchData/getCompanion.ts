import prismadb from "@/lib/prismadb";


export const getCompanions = async ({chatId, userId}:{chatId:string, userId:string})=>{
  try {
    const companion = await prismadb.companion.findUnique({
      where: { id: chatId }, 
      include: {
        messages: { orderBy: { createdAt: "asc" }, where: { userId } },
        _count: { select: { messages: true } }
      }
    });
    return companion;
  } catch (error) {
    console.log(error);
    return null;
  }
}