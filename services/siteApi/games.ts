import { SiteApiRoutes } from "@/constants/routes";
import { AddValue, FullGame } from "@/types/api";
import { SortBy, SortOrder, TakeGames } from "@/types/store";

import { axiosSiteInstance } from "../instance";

export const getByParams = async (
  category: string,
  take: TakeGames,
  sortBy: SortBy,
  sortOrder: SortOrder,
  isAAA: boolean
): Promise<FullGame[]> => {
  const { data } = await axiosSiteInstance.get<FullGame[]>(
    SiteApiRoutes.GAMES,
    {
      params: {
        category,
        take,
        sortBy,
        sortOrder,
        isAAA,
      },
    }
  );
  return data;
};

const sortFunctions: Record<SortBy, (a: FullGame, b: FullGame) => number> = {
  views: (a, b) => a.views - b.views,
  likes: (a, b) => a.likes.length - b.likes.length,
  releaseDate: (a, b) => Date.parse(a.releaseDate) - Date.parse(b.releaseDate),
  crackDate: (a, b) => {
    const a_crackDate =
      a.crackDate === null ? Infinity : Date.parse(a.crackDate);
    const b_crackDate =
      b.crackDate === null ? Infinity : Date.parse(b.crackDate);
    return a_crackDate - b_crackDate;
  },
};

export const sortGames = (
  games: FullGame[],
  sortBy: SortBy,
  order: SortOrder,
  isAAAOption: boolean
): FullGame[] => {
  const filteredGames = isAAAOption
    ? games.filter((game) => game.isAAA)
    : [...games];
  const sortByFunction = sortFunctions[sortBy];
  return filteredGames.sort((a, b) => {
    const comparison = sortByFunction(a, b);
    return order === "descending" ? -comparison : comparison;
  });
};

export const getGameBySlug = async (slug: string): Promise<FullGame | null> => {
  const { data: game } = await axiosSiteInstance.get<FullGame>(
    SiteApiRoutes.GAME(slug),
    {
      params: {
        slug,
      },
    }
  );
  if (!game) {
    return null;
  }
  return game;
};

export const performActionOnGame = async (
  gameId: string,
  addValue: AddValue
) => {
  try {
    await axiosSiteInstance.put(SiteApiRoutes.GAME(gameId), {
      addValue,
    });
  } catch (error) {
    console.error(`Cant perform ${addValue} on the game`, error);
  }
};
