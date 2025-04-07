import pLimit from "p-limit";

import { AllGameDataSchema } from "@/prisma/constants";
import { GameStatusApi } from "@/services/externalApi/apiClient";
import { Game } from "@prisma/client";

const limit = pLimit(10);

export const normalizeGames = async (
  games: { [key: string]: unknown; title: string }[]
) => {
  const gamesPromises = games.map((game) =>
    limit(async () => {
      try {
        const gameDetails = await GameStatusApi.games.getGameDetailsByTitle(
          game.title
        );
        const validation = AllGameDataSchema.safeParse(gameDetails);
        if (!validation.success) {
          console.error("Invalid game data:", validation.error);
          return null;
        }

        return {
          id: validation.data.id,
          slug: validation.data.slug,
          title: validation.data.title,
          isAAA: validation.data.is_AAA,
          protections: validation.data.protections,
          hackedGroups: validation.data.hacked_groups,
          releaseDate: validation.data.release_date,
          crackDate: validation.data.crack_date,
          shortImage: validation.data.short_image,
          steamId: validation.data.steam_prod_id,
          userScore: validation.data.user_score,
          metaScore: validation.data.mata_score,
        };
      } catch (error) {
        console.error(`Failed to fetch details for ${game.title}:`, error);
        return null;
      }
    })
  );
  const parsedGames = (await Promise.all(gamesPromises)).filter(
    (game): game is Game => Boolean(game)
  );
  return parsedGames;
};
