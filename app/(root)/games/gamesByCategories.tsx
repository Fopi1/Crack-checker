"use client";

import { categories } from "@/prisma/constants";
import { Container } from "@/shared/components/shared";

import { GameFilter } from "./gameFilter";
import { GamesTable } from "./gamesTable";

export const GamesByCategories = () => {
  const gameCategories = categories;
  return (
    <>
      {gameCategories.map((category) => (
        <div
          key={category.title}
          className="flex justify-center [&:nth-child(even)]:bg-secondary-foreground"
        >
          <Container className="w-full flex flex-col items-center pb-16 responsive md:px-4">
            <GameFilter title={category.title} />
            <GamesTable category={category.title} />
          </Container>
        </div>
      ))}
    </>
  );
};
