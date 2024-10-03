import axios from "axios";
import { prisma } from "./prismaClient";
import { categories } from "./constants";

interface ReleasedGamesData {
  id: string;
  slug: string;
  title: string;
  is_AAA: boolean;
  release_date: string;
  short_image: string;
}

interface AllGameData extends ReleasedGamesData {
  protections: string;
  hacked_groups: string;
  crack_date: string | null;
}

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

async function fetchGameDetailsByTitle(title: string): Promise<AllGameData> {
  try {
    const response = await axios.post(
      "https://gamestatus.info/back/api/gameinfo/game/search_title/",
      { title }
    );
    return response.data[0] as AllGameData;
  } catch (e) {
    console.error(e);
    throw new Error(`Failed to fetch game data for title: ${title}`);
  }
}

async function fetchGameData(): Promise<GameForBD[]> {
  try {
    const response = await axios.get(
      "https://gamestatus.info/back/api/gameinfo/game/releasedgame/"
    );

    const releasedGames = Object.values(
      response.data.data as ReleasedGamesData[]
    )
      .filter((game) => game !== null)
      .flat(1);

    const allGameData = await Promise.allSettled(
      releasedGames.map(
        async (game: ReleasedGamesData) =>
          await fetchGameDetailsByTitle(game.title)
      )
    );

    const succesfulData = allGameData
      .filter(
        (result): result is PromiseFulfilledResult<AllGameData> =>
          result.status === "fulfilled"
      )
      .map((result) => result.value);
    const GameForBDData: GameForBD[] = succesfulData.map(
      (game: AllGameData) => ({
        apiId: game.id,
        slug: game.slug,
        title: game.title,
        isAAA: game.is_AAA,
        protections: game.protections,
        hackedGroups: game.hacked_groups,
        releaseDate: game.release_date,
        crackDate: game.crack_date,
        shortImage: game.short_image,
      })
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
