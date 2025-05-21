"use client";

import { observer } from "mobx-react-lite";

import { GamesGroup } from "@/shared/components/shared/gamesGroup";
import { useGamesByCategory } from "@/shared/hooks";
import { Loader } from "@/shared/components/shared";

interface Props {
  category: string;
}

export const GamesTable = observer(({ category }: Props) => {
  const { data: games, isLoading, isError } = useGamesByCategory(category);
  if (isLoading) return <Loader />;
  if (isError) return <div>Error loading data</div>;
  return <GamesGroup games={games!} />;
});
