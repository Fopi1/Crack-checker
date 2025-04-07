import { prisma } from '@/prisma/prisma';

import { addNewGames } from './addNewGames';
import { updateGames } from './updateGames';

export const syncGames = async () => {
  try {
    const gamesToUpdate = await prisma.game.findMany();
    console.log("Starting synchronization");
    await Promise.all([addNewGames(), updateGames(gamesToUpdate)]);
  } catch (error) {
    console.error("Syncronization failed", error);
    throw new Error("Syncronization failed");
  }
};