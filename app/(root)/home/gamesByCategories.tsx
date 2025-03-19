"use client";

import { FC } from 'react';

import { categories } from '@/prisma/constants';
import { cn } from '@/shadcn';
import { Container } from '@/shared/components/shared';

import { GameFilter } from './gameFilter';
import { GamesTable } from './gamesTable';

interface Props {
  className?: string;
}

export const GamesByCategories: FC<Props> = ({ className }) => {
  const gameCategories = categories;
  return (
    <>
      {gameCategories.map((category) => (
        <div
          key={category.title}
          className="flex justify-center [&:nth-child(even)]:bg-secondary-foreground"
        >
          <Container
            className={cn(
              "w-full flex flex-col items-center pb-16 responsive md:px-4",
              className
            )}
          >
            <GameFilter title={category.title} />
            <GamesTable category={category.title} />
          </Container>
        </div>
      ))}
    </>
  );
};
