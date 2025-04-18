import { ExternalApiRoutes } from '../../constants/routes';
import { axiosGameStatusInstance } from '../../lib/axios';

import type { AllGameData, ReleasedGamesData } from "../../prisma/constants";

export const getGameDetailsByTitle = async (
  title: string
): Promise<AllGameData> => {
  try {
    const response = await axiosGameStatusInstance.post(
      ExternalApiRoutes.SEARCH,
      {
        title,
      }
    );
    const game: AllGameData[] = response.data.filter(
      (e: AllGameData) => e.title === title
    );
    return game[0];
  } catch (e) {
    console.error(e);
    throw new Error(`Failed to fetch game data for title: ${title}`);
  }
};

export const getReleasedGames = async (): Promise<ReleasedGamesData[]> => {
  try {
    const response = await axiosGameStatusInstance.get(
      ExternalApiRoutes.RELEASED_GAMES
    );

    const releasedGames = Object.values(
      response.data.data as ReleasedGamesData[]
    )
      .filter((game) => game !== null)
      .flat(1);
    return releasedGames;
  } catch (e) {
    console.error(e);
    throw new Error("Failed to get released games");
  }
};
