"use client";
import { SiteApi } from '@/services/siteApi/apiClient';
import { useQueries } from '@tanstack/react-query';

import { coolPlaceholder } from './constants';
import { Game } from './game';

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
