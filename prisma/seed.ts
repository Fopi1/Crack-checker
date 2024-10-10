import { prisma } from "./prismaClient";
import { categories } from "./constants";
import { GameStatusApi } from "../services/externalApi/apiClient";
import { AllGameData, ReleasedGamesData } from "@/types/api";

interface GameForBD {
  apiId: string;
  slug: string;
  title: string;
  isAAA: boolean;
  releaseDate: string;
  shortImage: string;
  protections: string;
  hackedGroups: string;
  crackDate: string | null;
}

async function fetchGameData(): Promise<GameForBD[]> {
  try {
    const releasedGames = await GameStatusApi.games.getReleasedGames();
    const allGameData = await Promise.allSettled(
      releasedGames.map(
        async (game: ReleasedGamesData) =>
          await GameStatusApi.games.getGameDetailsByTitle(game.title)
      )
    );

    const successfulData = allGameData
      .filter(
        (result): result is PromiseFulfilledResult<AllGameData> =>
          result.status === "fulfilled"
      )
      .map((result) => result.value);
    const GameForBDData: GameForBD[] = successfulData.map(
      (game: AllGameData) => {
        return {
          apiId: game.id,
          slug: game.slug,
          title: game.title,
          isAAA: game.is_AAA,
          protections: game.protections,
          hackedGroups: game.hacked_groups,
          releaseDate: game.release_date,
          crackDate: game.crack_date,
          shortImage: game.short_image,
        };
      }
    );
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
