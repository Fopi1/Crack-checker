import { prisma } from "@/prisma/prismaClient";

const alterTable = async () => {
  await prisma.$executeRawUnsafe(`
    ALTER TABLE "Game" RENAME COLUMN "is_AAA" TO "isAAA";
  `);

  console.log("Columns has been altered");
};

alterTable();
