"use client";

import { observer } from "mobx-react-lite";
import { FC } from "react";

import { SiteApi } from "@/services/siteApi/apiClient";
import { cn } from "@/shadcn";
import { sortStore } from "@/shared/store/sortStore";
import { useQueries } from "@tanstack/react-query";

import { GameCard } from "./gameCard";

interface Props {
  category: string;
  className?: string;
}

const staleTime = 1000 * 60 * 5;

export const GamesGroup: FC<Props> = observer(({ category, className }) => {
  const { takeGames, sortBy, sortOrder, isAAA } =
    sortStore.categoriesSortOptions[category];
  const [gamesQuery, likedGamesQuery] = useQueries({
    queries: [
      {
        queryKey: ["games", category, takeGames, sortBy, sortOrder, isAAA],
        queryFn: () =>
          SiteApi.games.getByParams(
            category,
            takeGames,
            sortBy,
            sortOrder,
            isAAA
          ),
        staleTime,
      },
      {
        queryKey: ["likedGames"],
        queryFn: () => SiteApi.users.getLikedGames(),
        staleTime,
      },
    ],
  });
  if (gamesQuery.isLoading || likedGamesQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (gamesQuery.error || likedGamesQuery.error) {
    return <div>Error loading data.</div>;
  }

  const games = gamesQuery.data || [];
  const likedGames = likedGamesQuery.data || [];
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 w-full responsive px-2 lg:px-0 z-[1]",
        className
      )}
    >
      {games.map((game) => {
        const isGameLiked = likedGames.includes(game.id);
        return (
          <GameCard
            key={game.id}
            {...game}
            likes={game.likes}
            isLiked={isGameLiked}
          />
        );
      })}
    </div>
  );
});
