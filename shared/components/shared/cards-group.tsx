"use client";

import { FC, useState } from "react";
import { Card } from "./card";
import { cn } from "@/lib/utils";
import { useAsyncEffect } from "@reactuses/core";
import axios from "axios";
import { GameFromAPI } from "@/types/types";

interface Props {
  className?: string;
}

export const CardsGroup: FC<Props> = ({ className }) => {
  const [games, setGames] = useState<GameFromAPI[]>([]);
  const [loading, setLoading] = useState(true);

  useAsyncEffect(
    async () => {
      if (games.length === 0) {
        const response = await axios.get("/api/games");
        const data = await response.data;
        setGames(data);
        setLoading(false);
      }
    },
    () => {},
    [games]
  );

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div
          className={cn("grid grid-cols-1 gap-6 w-full responsive", className)}
        >
          {games.map((game, index) => {
            return (
              <Card
                key={index}
                title={game.name}
                isCracked={false}
                releaseDate={game.released}
                imageUrl={game.background_image}
              />
            );
          })}
        </div>
      )}
    </>
  );
};
