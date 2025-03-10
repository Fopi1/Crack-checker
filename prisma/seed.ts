import pLimit from 'p-limit';

import { Game } from '@prisma/client';

import { GameStatusApi } from '../services/externalApi/apiClient';
import { AllGameData, categories, GameSchema, ReleasedGamesData } from './constants';
import { prisma } from './prismaClient';

const limit = pLimit(10);

async function fetchGameData(): Promise<Game[]> {
  try {
    const releasedGames = await GameStatusApi.games.getReleasedGames();
    console.log(`Fetched ${releasedGames.length} games`);

    const allGameData = await Promise.allSettled(
      releasedGames.map((game: ReleasedGamesData) =>
        limit(() => GameStatusApi.games.getGameDetailsByTitle(game.title))
      )
    );

    const successfulData = allGameData
      .filter(
        (result): result is PromiseFulfilledResult<AllGameData> =>
          result.status === "fulfilled" && result.value !== null
      )
      .map((result) => {
        const validation = GameSchema.safeParse(result.value);
        if (!validation.success) {
          console.error("Invalid game data:", validation.error);
          return null;
        }
        return validation.data;
      })
      .filter(Boolean) as AllGameData[];
    console.log(
      `Successfully processed ${successfulData.length}/${releasedGames.length} games`
    );

    return successfulData.map((game) => ({
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
    }));
  } catch (e) {
    console.error(
      "Error fetching games:",
      e instanceof Error ? e.message : "Unknown error"
    );
    throw new Error(
      `Failed to fetch games: ${
        e instanceof Error ? e.message : "Unknown error"
      }`
    );
  }
}

async function populateDatabaseWithSeedData() {
  const games = await fetchGameData();
  if (games.length === 0) {
    throw new Error("No games data available for data seeding");
  }
  await prisma.$transaction([
    prisma.category.createMany({
      data: categories,
      skipDuplicates: true,
    }),
    prisma.game.createMany({
      data: games,
      skipDuplicates: true,
    }),
  ]);
}

async function resetDatabase() {
  await Promise.all([
    prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`,
    prisma.$executeRaw`TRUNCATE TABLE "Game" RESTART IDENTITY CASCADE`,
  ]);
}

async function main() {
  try {
    console.log("Starting database reset...");
    await resetDatabase();
    console.log("Database cleaned successfully");

    console.log("Starting data seeding...");
    await populateDatabaseWithSeedData();
    console.log("Data seeded successfully");
  } catch (e) {
    console.error(
      "Seeding failed:",
      e instanceof Error ? e.message : "Unknown error"
    );
    process.exit(1);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("Process completed successfully");
  })
  .catch(async (e) => {
    console.error("Fatal error: ", e);
    await prisma.$disconnect();
    process.exit(1);
  });
