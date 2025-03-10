"use client";

import { observer } from 'mobx-react-lite';

import { SiteApi } from '@/services/siteApi/apiClient';
import { sortStore } from '@/shared/store/sortStore';
import { useQuery } from '@tanstack/react-query';

import { GamesGroup } from '../shared/gamesGroup';

interface Props {
  category: string;
}

export const GamesTable = observer(({ category }: Props) => {
  const { takeGames, sortBy, sortOrder, isAAA } =
    sortStore.categoriesSortOptions[category];
  const {
    data: games,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["games", category, takeGames, sortBy, sortOrder, isAAA],
    queryFn: () =>
      SiteApi.games.getByParams(category, takeGames, sortBy, sortOrder, isAAA),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  return <GamesGroup games={games!} />;
});
