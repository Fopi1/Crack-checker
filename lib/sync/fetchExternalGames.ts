import { prisma } from "@/prisma/prisma";
import { GameStatusApi } from "@/services/externalApi/apiClient";

export const fetchExternalGames = async () => {
  try {
    const releasedGames = await GameStatusApi.games.getReleasedGames();
    if (!releasedGames.length) {
      console.log("No released games found from external API");
      return [];
    }
    console.log(releasedGames.length, "games were detected");

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
    return newGames;
  } catch (error) {
    console.error("Failed to fetch released games", error);
    throw new Error("Failed to fetch released games");
  }
};
