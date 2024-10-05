import { Game } from "@prisma/client";
import { axiosInstance } from "./instance";
import { ApiRoutes } from "./constants";

export const getByCategory = async (category: string): Promise<Game[]> => {
  const da = (
    await axiosInstance.get<Game[]>(ApiRoutes.GAMES, {
      params: { category },
    })
  ).data;
  console.log(da);
  return da;
};
