"use client";

import { FC, useState } from "react";
import { Card } from "./card";
import { cn } from "@/lib/utils";
import { useAsyncEffect } from "@reactuses/core";
import axios from "axios";
import { Game } from "@prisma/client";
import { Api } from "@/services/apiClient";

interface Props {
  category: string;
  className?: string;
}

export const CardsGroup: FC<Props> = ({ category, className }) => {
  const [games, setGames] = useState<Game[]>([]);

  useAsyncEffect(
    async () => {
      const games = await Api.games.getByCategory(category);
      setGames(games);
    },

    () => {},
    []
  );

  return (
    <>
      {games.length === 0 ? (
        <div>Loading...</div>
      ) : (
        <div
          className={cn(
            "grid grid-cols-1 gap-6 w-full responsive px-2 lg:px-0",
            className
          )}
        >
          {games.map((game, index) => (
            <Card
              key={index}
              isAAA={game.isAAA}
              likes={game.likes}
              views={game.views}
              title={game.title}
              releaseDate={game.releaseDate}
              shortImage={game.shortImage}
              crackDate={game.crackDate}
              protections={game.protections}
              hackedGroups={game.hackedGroups}
            />
          ))}
        </div>
      )}
    </>
  );
};
