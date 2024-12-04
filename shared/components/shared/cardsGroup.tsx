"use client";

import { FC, useState } from "react";
import { cn } from "@/lib/utils";
import { useAsyncEffect } from "@reactuses/core";
import { Game } from "@prisma/client";
import { SiteApi } from "@/services/siteApi/apiClient";
import { sortStore } from "@/shared/store/sortStore";
import { observer } from "mobx-react-lite";
import { GameCard } from "./gameCard";
import { axiosSiteInstance } from "@/services/instance";
import { ApiRoutes } from "@/services/siteApi/constants";

interface Props {
  category: string;
  className?: string;
}

export const CardsGroup: FC<Props> = observer(({ category, className }) => {
  const [games, setGames] = useState<Game[]>([]);
  const [likedGames, setLikedGames] = useState([]);
  const { takeGames, sortBy, sortOrder, isAAA } =
    sortStore.categoriesSortOptions[category];
  useAsyncEffect(
    async () => {
      const [games, likedGames] = await Promise.all([
        SiteApi.games.getByParams(
          category,
          takeGames,
          sortBy,
          sortOrder,
          isAAA
        ),
        axiosSiteInstance.post(ApiRoutes.USER),
      ]);
      if (games.length) {
        setGames(games);
      }
      setLikedGames(likedGames.data);
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
                id={game.id}
                slug={game.slug}
                isAAA={game.isAAA}
                likes={game.likes}
                views={game.views}
                title={game.title}
                releaseDate={game.releaseDate}
                shortImage={game.shortImage}
                crackDate={game.crackDate}
                protections={game.protections}
                hackedGroups={game.hackedGroups}
                isLiked={isGameLiked}
              />
            );
          })}
        </div>
      )}
    </>
  );
});
