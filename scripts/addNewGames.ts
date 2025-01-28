import pLimit from "p-limit";

import { GameSchema } from "@/prisma/constants";
import { prisma } from "@/prisma/prismaClient";
import { GameStatusApi } from "@/services/externalApi/apiClient";

const limit = pLimit(10);

const addNewGames = async () => {
  try {
    const releasedGames = await GameStatusApi.games.getReleasedGames();
    console.log(releasedGames.length, "games were detected");

    console.log("Starting adding new games");
    const existingIds = (
      await prisma.game.findMany({
        where: { id: { in: releasedGames.map((game) => game.id) } },
        select: { id: true },
      })
    ).map((game) => game.id);
    console.log(existingIds.length, "games already exist");

    const newGames = releasedGames.filter(
      (game) => !existingIds.includes(game.id)
    );
    const gamesPromises = newGames.map((game) =>
      limit(async () => {
        try {
          const gameDetails = await GameStatusApi.games.getGameDetailsByTitle(
            game.title
          );
          const validation = GameSchema.safeParse(gameDetails);
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
            views: 0,
          };
        } catch (error) {
          console.error(`Failed to fetch details for ${game.title}:`, error);
          return null;
        }
      })
    );
    const gamesToAdd = (await Promise.all(gamesPromises)).filter(Boolean);

    await prisma.game.createMany({
      //@ts-expect-error gamesToAdd cant be falsy because filter(Boolean)
      data: gamesToAdd,
      skipDuplicates: true,
    });
    console.log(`Added ${gamesToAdd.length} new games`);
  } catch (e) {
    console.error(e);
    throw new Error("Failed to add new games");
  } finally {
    prisma.$disconnect();
  }
};

addNewGames();
