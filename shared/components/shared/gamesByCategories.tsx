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
    <div className={cn("", className)}>
      {gameCategories.map((category) => (
        <div className="pb-16" key={category.id}>
          <GameFilterHeader title={category.title} icon={category.icon} />
          <CardsGroup category={category.title} />
        </div>
      ))}
    </div>
  );
};
