"use client";

import { FC, useState } from "react";
import { cn } from "@/lib/utils";
import { useAsyncEffect } from "@reactuses/core";
import { SiteApi } from "@/services/siteApi/apiClient";
import { sortStore } from "@/shared/store/sortStore";
import { observer } from "mobx-react-lite";
import { GameCard } from "./gameCard";
import { GameWithLikes } from "@/types/api";

interface Props {
  category: string;
  className?: string;
}
export const CardsGroup: FC<Props> = observer(({ category, className }) => {
  const [games, setGames] = useState<GameWithLikes[]>([]);
  const [likedGames, setLikedGames] = useState<string[]>([]);
  const { takeGames, sortBy, sortOrder, isAAA } =
    sortStore.categoriesSortOptions[category];
  useAsyncEffect(
    async () => {
      const [games, likedGamesIds] = await Promise.all([
        SiteApi.games.getByParams(
          category,
          takeGames,
          sortBy,
          sortOrder,
          isAAA
        ),
        SiteApi.users.getLikedGames(),
      ]);
      if (likedGamesIds !== null) {
        setLikedGames(likedGamesIds);
      }
      if (games.length) {
        setGames(games);
      }
    },
    () => {},
    [takeGames, sortBy, sortOrder, isAAA]
  );

  return (
    <>
      {games.length === 0 ? (
        <div>Loading...</div>
      ) : (
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
      )}
    </>
  );
});
