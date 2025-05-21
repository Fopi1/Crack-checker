import { prisma } from "@/prisma/prisma";
import { SteamGame } from "@/types/lib";
import pLimit from "p-limit";
import { fetchGameDetailsByTitle } from "../gamestatusAPI";

const limit = pLimit(10);

export const saveGamesToDatabase = async (steamGames: SteamGame[]) => {
  console.log("saveGamesToDatabase...");
  console.log("steamGames: ", steamGames);
  const gamePromiese = steamGames.map((game) =>
    limit(() => fetchGameDetailsByTitle(game.name)),
  );

  try {
    const gameDetails = (await Promise.all(gamePromiese)).filter(Boolean);
    console.log("Got more details about games: ", gameDetails);
    await prisma.game.createMany({
      data: gameDetails.map((game) => {
        return {
          id: game.id,
          slug: game.slug,
          title: game.title,
          hackedGroups: game.hacked_groups,
          isAAA: game.is_AAA,
          protections: game.protections,
          releaseDate: game.release_date,
          crackDate: game.crack_date,
          metaScore: game.mata_score,
          steamId: game.steam_prod_id,
          userScore: game.user_score,
          shortImage: game.short_image,
        };
      }),
      skipDuplicates: true,
    });
  } catch (error) {
    console.error("Error while saving games to database", error);
    throw error;
  }
};
