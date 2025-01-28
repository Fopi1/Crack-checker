"use client";
import { useQueries } from "@tanstack/react-query";
import { SiteApi } from "@/services/siteApi/apiClient";
import { Game } from "./game";
import { coolPlaceholder } from "./constants";

interface Props {
  slug: string;
}

export default function GameClient({ slug }: Props) {
  const [gameQuery, likedGamesQuery] = useQueries({
    queries: [
      {
        queryKey: ["game", slug],
        queryFn: () => SiteApi.games.getGameBySlug(slug),
      },
      {
        queryKey: ["likedGames"],
        queryFn: () => SiteApi.users.getLikedGames(),
      },
    ],
  });

  if (gameQuery.isLoading || likedGamesQuery.isLoading) {
    return <div>Loading...</div>;
  }

  const game = gameQuery.data || coolPlaceholder;
  const likedGames = likedGamesQuery.data || [];

  const isLiked = likedGames.includes(game.id);
  return <Game {...game} isLiked={isLiked} />;
}
