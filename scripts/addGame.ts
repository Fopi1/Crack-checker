import type { AllGameData } from "@/prisma/constants";
import { prisma } from "@/prisma/prismaClient";
import { GameStatusApi } from "@/services/externalApi/apiClient";

const addGame = async (title: string) => {
  try {
    const game: AllGameData = await GameStatusApi.games.getGameDetailsByTitle(
      title
    );

    if (!game) {
      console.error(`Game ${title} not found`);
      return;
    }

    await prisma.game.create({
      data: {
        id: game.id,
        slug: game.slug,
        title: game.title,
        isAAA: game.is_AAA,
        protections: game.protections,
        hackedGroups: game.hacked_groups,
        releaseDate: game.release_date,
        crackDate: game.crack_date,
        shortImage: game.short_image,
        steamId: game.steam_prod_id,
        userScore: game.user_score,
        metaScore: game.mata_score,
        views: 0,
      },
    });
    console.log(`Successfully added game: ${title} `);
  } catch (error) {
    if (error instanceof Error && error.message.includes("Unique constraint")) {
      console.error(`Game ${title} already exists in database`);
      return;
    }
    console.error(`Error adding game "${title}":`, error);
    throw error;
  }
};

const gameTitle = process.argv[2];

if (!gameTitle) {
  console.error("Give me a title");
  process.exit(1);
}

addGame(gameTitle)
  .then(() => process.exit(0))
  .catch(() => process.exit(1));
