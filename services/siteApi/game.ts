import { SiteApiRoutes } from '@/constants/routes';
import { axiosSiteInstance } from '@/lib/axios';
import { AddValue, FullGame } from '@/types/api';

import type { SortBy, SortOrder, TakeGames } from "@/types/store";

export const getByParams = async (
  category: string,
  take: TakeGames,
  sortBy: SortBy,
  sortOrder: SortOrder,
  isAAA: boolean
): Promise<FullGame[]> => {
  try {
    const { data } = await axiosSiteInstance.get<{ data: FullGame[] }>(
      SiteApiRoutes.GAMES,
      {
        params: { category, take, sortBy, sortOrder, isAAA },
      }
    );
    return data.data;
  } catch (error) {
    console.error("Cant get list of games");
    throw error;
  }
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
    throw error;
  }
};

export const getGameById = async (gameId: string) => {
  try {
    const { data } = await axiosSiteInstance.get<{ data: FullGame }>(
      SiteApiRoutes.GAME(gameId)
    );
    return data.data;
  } catch (error) {
    console.error(`Cannot get game by id ${gameId}: `, error);
    throw error;
  }
};

export const searchGame = async (query: string) => {
  try {
    const { data } = await axiosSiteInstance.get<{ data: FullGame[] }>(
      SiteApiRoutes.SEARCH_GAME(query)
    );
    return data.data;
  } catch (error) {
    console.error(`Cannot search game by this query ${query}: `, error);
    throw error;
  }
};
