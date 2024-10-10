import { Game } from "@prisma/client";
import { axiosSiteInstance } from "./instance";
import { ApiRoutes } from "./constants";

export const getByCategory = async (category: string): Promise<Game[]> => {
  const data = (
    await axiosSiteInstance.get<Game[]>(ApiRoutes.GAMES, {
      params: { category },
    })
  ).data;
  return data;
};
