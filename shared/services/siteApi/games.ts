import { Game } from "@prisma/client";
import { axiosSiteInstance } from "./instance";
import { ApiRoutes } from "./constants";

export const getByParams = async (
  category: string,
  take: string
): Promise<Game[]> => {
  const data = (
    await axiosSiteInstance.get<Game[]>(ApiRoutes.GAMES, {
      params: { category, take },
    })
  ).data;
  return data;
};
