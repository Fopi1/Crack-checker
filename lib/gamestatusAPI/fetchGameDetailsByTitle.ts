import { ExternalApiRoutes } from "@/constants";
import { AllGameData } from "@/prisma/constants";

import { axiosGameStatusInstance } from "../axios";

export const fetchGameDetailsByTitle = async (
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
