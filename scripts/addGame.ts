import { prisma } from "@/prisma/prismaClient";
import { ApiRoutes } from "@/services/externalApi/constants";
import { AllGameData } from "@/types/api";
import axios from "axios";

async function checkIfGameExists(title: string): Promise<boolean> {
  const game = await prisma.game.findFirst({
    where: { title: title },
  });
  const isGameExist = game !== undefined && game !== null;
  return isGameExist;
}

async function addGame(title: string) {
  try {
    const response = await axios.post(ApiRoutes.SEARCH, {
      slug: "",
      title: title,
      is_AAA: false,
      protections: "",
      hacked_groups: "",
      release_date: null,
      crack_date: null,
      teaser_link: "",
      torrent_link: "",
      mata_score: null,
      user_score: null,
      steam_media_id: null,
      steam_prod_id: null,
    });

    const games: AllGameData[] = response.data;
    if (games.length) {
      const gameData = games.filter((e: AllGameData) => e.title === title)[0];
      if (await checkIfGameExists(gameData.title)) {
        throw new Error();
      }

      const game = await prisma.game.create({
        data: {
          apiId: gameData.id,
          slug: gameData.slug,
          title: gameData.title,
          isAAA: gameData.is_AAA,
          protections: gameData.protections,
          hackedGroups: gameData.hacked_groups,
          releaseDate: gameData.release_date,
          crackDate: gameData.crack_date,
          shortImage: gameData.short_image,
        },
      });

      console.log("The game:", game.title, "was added");
    } else {
      console.log("The game was not found");
    }
  } catch (_) {
    throw new Error("An error was catched when trying to add a new game");
  } finally {
    await prisma.$disconnect();
  }
}

const gameTitle = process.argv[2];

if (!gameTitle) {
  console.error("Название дай");
  process.exit(1);
}

addGame(gameTitle);
