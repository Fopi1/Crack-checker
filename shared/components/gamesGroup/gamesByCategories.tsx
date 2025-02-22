"use client";

import { FC } from "react";

import { cn } from "@/lib/utils";
import { categories } from "@/prisma/constants";

import { Container } from "../shared/container";
import { GamesGroup } from "./gamesGroup";
import { GameFilterHeader } from "./header/gameFilterHeader";

interface Props {
  className?: string;
}

export const GamesByCategories: FC<Props> = ({ className }) => {
  const gameCategories = categories;
  return (
    <>
      {gameCategories.map((category) => (
        <div
          key={category.id}
          className="flex justify-center [&:nth-child(even)]:bg-secondary-foreground"
        >
          <Container
            className={cn(
              "w-full flex flex-col items-center pb-16 responsive md:px-4",
              className
            )}
          >
            <GameFilterHeader title={category.title} icon={category.icon} />
            <GamesGroup category={category.title} />
          </Container>
        </div>
      ))}
    </>
  );
};
