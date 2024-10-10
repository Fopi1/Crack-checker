import { prisma } from "@/prisma/prismaClient";

async function deleteGameById(gameId: number) {
  try {
    await prisma.game.delete({
      where: { id: gameId },
    });
    console.log(`Game by id ${gameId} was deleted`);
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
}

const gameId = process.argv[2];

if (!gameId || isNaN(Number(gameId))) {
  console.error("No game id provided");
  process.exit(1);
}

deleteGameById(Number(gameId));
