import { ExternalApiRoutes } from "@/constants";
import { ReleasedGamesData } from "@/prisma/constants";

import { axiosGameStatusInstance } from "../axios";

export const fetchReleasedGames = async (): Promise<ReleasedGamesData[]> => {
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
