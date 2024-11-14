import { prisma } from "@/prisma/prismaClient";

const deleteUsers = async () => {
  try {
    await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
    console.log("Users have been successfully deleted");
  } catch (error) {
    console.error("An error was catched when deleting users", error);
  } finally {
    await prisma.$disconnect();
  }
};

deleteUsers();
