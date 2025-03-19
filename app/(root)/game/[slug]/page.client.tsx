"use client";

import { SiteApi } from "@/services/siteApi/apiClient";
import { FullGame } from "@/types/api";
import { useQuery } from "@tanstack/react-query";

import FPI from "./default";
import { Game } from "./game";

interface Props {
  initialData: FullGame;
}

export default function GameClient({ initialData }: Props) {
  const { data: game, isError } = useQuery({
    queryKey: ["game", initialData.id],
    queryFn: () => SiteApi.games.getGameById(initialData.id),
    initialData: initialData,
  });

  if (isError || !game) {
    return <FPI />;
  }

  return <Game game={game} />;
}
