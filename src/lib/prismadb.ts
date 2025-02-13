import { PrismaClient } from "@prisma/client";

interface globalForPrisma {
  prisma: PrismaClient;
}

declare const globalThis: globalForPrisma;

const prisma = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;

export default prisma ;
