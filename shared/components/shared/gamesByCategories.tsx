"use client";

import { cn } from "@/lib/utils";
import { FC, useState } from "react";
import { GameFilterHeader } from "./gameFilterHeader";
import { CardsGroup } from "./cardsGroup";
import { Category } from "@prisma/client";
import { categories } from "@/prisma/constants";

interface Props {
  className?: string;
}

export const GamesByCategories: FC<Props> = ({ className }) => {
  const [gameCategories] = useState<Category[]>(categories);
  return (
    <>
      {gameCategories.map((category) => (
        <div
          key={category.id}
          className="flex justify-center [&:nth-child(even)]:bg-secondary-foreground"
        >
          <div
            className={cn(
              "w-full flex flex-col items-center pb-16 responsive md:px-4",
              className
            )}
          >
            <GameFilterHeader title={category.title} icon={category.icon} />
            <CardsGroup category={category.title} />
          </div>
        </div>
      ))}
    </>
  );
};
