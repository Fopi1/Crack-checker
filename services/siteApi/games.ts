import { Game } from "@prisma/client";
import { ApiRoutes } from "./constants";
import { axiosSiteInstance } from "../instance";
import { SortBy, SortOrder, TakeGames } from "@/types/api";
import { prisma } from "@/prisma/prismaClient";

export const getByParams = async (
  category: string,
  take: TakeGames,
  sortBy: SortBy,
  sortOrder: SortOrder,
  isAAA: boolean
): Promise<Game[]> => {
  const data = (
    await axiosSiteInstance.get<Game[]>(ApiRoutes.GAMES, {
      params: { category, take, sortBy, sortOrder, isAAA },
    })
  ).data;
  return data;
};

const sortFunctions: Record<SortBy, (a: Game, b: Game) => number> = {
  views: (a, b) => a.views - b.views,
  likes: (a, b) => a.likes - b.likes,
  releaseDate: (a, b) => Date.parse(a.releaseDate) - Date.parse(b.releaseDate),
  crackDate: (a, b) => Date.parse(a.crackDate) - Date.parse(b.crackDate),
};

export const sortGames = (
  games: Game[],
  sortBy: SortBy,
  order: SortOrder,
  isAAAOption: boolean
): Game[] => {
  const filteredGames = isAAAOption
    ? games.filter((game) => game.isAAA)
    : [...games];
  const sortByFunction = sortFunctions[sortBy];
  return filteredGames.sort((a, b) => {
    const comparison = sortByFunction(a, b);
    return order === "descending" ? -comparison : comparison;
  });
};
