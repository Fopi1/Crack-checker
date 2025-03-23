"use client";

import { useGameById } from "@/shared/hooks";
import { FullGame } from "@/types/api";

import FPI from "./default";
import { Game } from "./game";

interface Props {
  initialData: FullGame;
}

export default function GameClient({ initialData }: Props) {
  const { data: game } = useGameById(initialData);
  if (!game) {
    return <FPI />;
  }

  return <Game game={game} />;
}
