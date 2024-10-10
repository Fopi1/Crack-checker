import { prisma } from "@/prisma/prismaClient";
import { GameStatusApi } from "@/services/externalApi/apiClient";

async function addNewGames() {
  try {
    const releasedGames = await GameStatusApi.games.getReleasedGames();
    for (const game of releasedGames) {
      const existingGame = await prisma.game.findUnique({
        where: {
          apiId: game.id,
        },
      });
      if (!existingGame) {
        const newGameAllData = await GameStatusApi.games.getGameDetailsByTitle(
          game.title
        );
        console.log("newGameAllData", newGameAllData);
        await prisma.game.create({
          data: {
            apiId: newGameAllData.id,
            slug: newGameAllData.slug,
            title: newGameAllData.title,
            isAAA: newGameAllData.is_AAA,
            protections: newGameAllData.protections,
            hackedGroups: newGameAllData.hacked_groups,
            releaseDate: newGameAllData.release_date,
            crackDate: newGameAllData.crack_date,
            shortImage: newGameAllData.short_image,
          },
        });
      }
    }
    console.log("Added new games");
  } catch (e) {
    console.error(e);
    throw new Error("Failed to add new games");
  } finally {
    prisma.$disconnect();
  }
}

addNewGames();
