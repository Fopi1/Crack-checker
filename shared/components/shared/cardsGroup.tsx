"use client";

import { FC, useState } from "react";
import { Card } from "./card";
import { cn } from "@/lib/utils";
import { useAsyncEffect } from "@reactuses/core";
import axios from "axios";
import { GameFromDB } from "@/shared/types";

interface Props {
  className?: string;
}

export const CardsGroup: FC<Props> = ({ className }) => {
  const [games, setGames] = useState<GameFromDB[]>([]);
  useAsyncEffect(
    async () => {
      const games = await axios
        .get("/api/games")
        .then((response) => response.data);
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
