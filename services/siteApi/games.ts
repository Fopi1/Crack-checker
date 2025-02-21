import { SiteApiRoutes } from "@/constants/routes";
import { AddValue, GameWithLikes } from "@/types/api";
import { SortBy, SortOrder, TakeGames } from "@/types/store";

import { axiosSiteInstance } from "../instance";

export const getByParams = async (
  category: string,
  take: TakeGames,
  sortBy: SortBy,
  sortOrder: SortOrder,
  isAAA: boolean
): Promise<GameWithLikes[]> => {
  const { data } = await axiosSiteInstance.get<GameWithLikes[]>(
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

const sortFunctions: Record<
  SortBy,
  (a: GameWithLikes, b: GameWithLikes) => number
> = {
  views: (a, b) => a.views - b.views,
  likes: (a, b) => a.likes.length - b.likes.length,
  releaseDate: (a, b) => Date.parse(a.releaseDate) - Date.parse(b.releaseDate),
  crackDate: (a, b) => {
    const a_crackDate = a.crackDate === null ? "0" : a.crackDate;
    const b_crackDate = b.crackDate === null ? "0" : b.crackDate;
    return Date.parse(a_crackDate) - Date.parse(b_crackDate);
  },
};

export const sortGames = (
  games: GameWithLikes[],
  sortBy: SortBy,
  order: SortOrder,
  isAAAOption: boolean
): GameWithLikes[] => {
  const filteredGames = isAAAOption
    ? games.filter((game) => game.isAAA)
    : [...games];
  const sortByFunction = sortFunctions[sortBy];
  return filteredGames.sort((a, b) => {
    const comparison = sortByFunction(a, b);
    return order === "descending" ? -comparison : comparison;
  });
};

export const getGameBySlug = async (
  slug: string
): Promise<GameWithLikes | null> => {
  const { data: game } = await axiosSiteInstance.get<GameWithLikes>(
    SiteApiRoutes.GAME,
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
    await axiosSiteInstance.put(SiteApiRoutes.GAME, {
      gameId,
      addValue,
    });
  } catch (error) {
    console.error(`Cant perform ${addValue} on the game`, error);
  }
};
