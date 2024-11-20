import { prisma } from "@/prisma/prismaClient";
import { GameStatusApi } from "@/services/externalApi/apiClient";
import { AllGameData } from "@/types/api";

const addNewGames = async () => {
  try {
    const releasedGames = await GameStatusApi.games.getReleasedGames();
    const existingGames: AllGameData[] = [];
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
        existingGames.push(newGameAllData);
      }
    }
    await prisma.game.createMany({
      data: existingGames.map((game: AllGameData) => ({
        apiId: game.id,
        slug: game.slug,
        title: game.title,
        isAAA: game.is_AAA,
        protections: game.protections,
        hackedGroups: game.hacked_groups,
        releaseDate: game.release_date,
        crackDate: game.crack_date,
        shortImage: game.short_image,
      })),
    });
    console.log(`Added ${existingGames.length} new games`);
  } catch (e) {
    console.error(e);
    throw new Error("Failed to add new games");
  } finally {
    prisma.$disconnect();
  }
};

addNewGames();
