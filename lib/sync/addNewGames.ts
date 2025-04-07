import { prisma } from '@/prisma/prisma';

import { fetchExternalGames } from './fetchExternalGames';
import { normalizeGames } from './normalizeGames';

export const addNewGames = async () => {
  try {
    const newGames = await fetchExternalGames();
    console.log("Starting adding new games");
    const parsedGames = await normalizeGames(newGames);

    await prisma.game.createMany({
      data: parsedGames,
      skipDuplicates: true,
    });
    console.log(`Added ${parsedGames.length} new games`);
  } catch (error) {
    console.error("Failed to add new games", error);
    throw new Error("Failed to add new games");
  }
};
