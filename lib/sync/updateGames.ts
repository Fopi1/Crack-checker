import { prisma } from "@/prisma/prisma";
import { Game } from "@prisma/client";

import { normalizeGames } from "./normalizeGames";

export const updateGames = async (games: Game[]) => {
  try {
    console.log("Starting updating existing games");
    const parsedGames = await normalizeGames(games);

    await Promise.all(
      parsedGames.map((game, i) =>
        prisma.game
          .update({ where: { id: game.id }, data: game })
          .then(() =>
            console.log(
              `Updated [${i + 1}/${parsedGames.length}] ${game.title}`
            )
          )
      )
    );
    console.log(`Updated ${parsedGames.length} games`);
  } catch (error) {
    console.error("Failed to update games", error);
    throw new Error("Failed to update games");
  }
};
