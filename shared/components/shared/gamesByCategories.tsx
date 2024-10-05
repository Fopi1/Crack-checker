"use client";

import { cn } from "@/lib/utils";
import { FC, useState } from "react";
import { GameFilterHeader } from "./gameFilterHeader";
import { CardsGroup } from "./cardsGroup";
import { useAsyncEffect } from "@reactuses/core";
import axios from "axios";
import { Category } from "@prisma/client";

interface Props {
  className?: string;
}

export const GamesByCategories: FC<Props> = ({ className }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  useAsyncEffect(
    async () => {
      const categories = await axios
        .get("/api/categories")
        .then((response) => response.data);
      setCategories(categories);
    },
    () => {},
    []
  );
  return (
    <div className={cn("", className)}>
      {categories.map((category) => (
        <div className="pb-16" key={category.id}>
          <GameFilterHeader title={category.title} icon={category.icon} />
          <CardsGroup category={category.title} className="lg:grid-cols-3" />
        </div>
      ))}
    </div>
  );
};
