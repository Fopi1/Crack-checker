import { prisma } from "./prismaClient";
import { categories } from "./constants";
import { AllGameData, ReleasedGamesData } from "@/types/api";
import { GameStatusApi } from "../services/externalApi/apiClient";
import { Game } from "@prisma/client";

async function fetchGameData(): Promise<Game[]> {
  try {
    const releasedGames = await GameStatusApi.games.getReleasedGames();
    const allGameData = await Promise.allSettled(
      releasedGames.map(async (game: ReleasedGamesData) =>
        GameStatusApi.games.getGameDetailsByTitle(game.title)
      )
    );

    const successfulData = allGameData
      .filter(
        (result): result is PromiseFulfilledResult<AllGameData> =>
          result.status === "fulfilled"
      )
      .map((result) => result.value);
    const GameForBDData: Game[] = successfulData.map((game: AllGameData) => {
      return {
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
      };
    });
    return GameForBDData;
  } catch (e) {
    console.error(e);
    throw new Error("Failed to fetch game data");
  }
}

async function populateDatabaseWithSeedData() {
  await prisma.$transaction([
    prisma.category.createMany({
      data: categories,
    }),
    prisma.game.createMany({
      data: await fetchGameData(),
    }),
  ]);
}

async function resetDatabase() {
  await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Game" RESTART IDENTITY CASCADE`;
}

async function main() {
  try {
    await resetDatabase();
    await populateDatabaseWithSeedData();
  } catch (e) {
    console.error(e);
  }
}

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
