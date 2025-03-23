import { useSession } from "next-auth/react";
import { MouseEvent, useEffect, useState } from "react";

import { SiteApi } from "@/services/siteApi/apiClient";
import { FullGame } from "@/types/api";
import { useQueryClient } from "@tanstack/react-query";

import { likedGamesStore } from "../store/likedGamesStore";
import { processingActionsStore } from "../store/processingActionsStore";
import { searchStore } from "../store/searchStore";

export const useGameLike = (game: FullGame) => {
  const queryClient = useQueryClient();
  const { data } = useSession();
  const { id: gameId, likes } = game;
  const [isLiked, setIsLiked] = useState(
    likedGamesStore.likedGames.includes(gameId)
  );
  const [likesNumber, setLikesNumber] = useState(likes.length);
  const fillOpacity = isLiked && data?.user ? "1" : "0";

  useEffect(() => {
    setLikesNumber(game.likes.length);
    setIsLiked(likedGamesStore.likedGames.includes(gameId));
  }, [gameId, game.likes.length]);

  const toggleLike = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (processingActionsStore.hasAction(gameId, "like") || !data?.user) return;
    processingActionsStore.addAction(gameId, "like");
    likedGamesStore.setIsPending(true);
    try {
      if (isLiked) {
        likedGamesStore.removeGame(gameId);
        setLikesNumber((prevLikes) => prevLikes - 1);
      } else {
        likedGamesStore.addGame(gameId);
        setLikesNumber((prevLikes) => prevLikes + 1);
      }
      setIsLiked((prevIsLiked) => !prevIsLiked);
      await SiteApi.games.performActionOnGame(gameId, "like");
      queryClient.refetchQueries({
        queryKey: ["search", searchStore.debouncedUserInput],
      });
      await Promise.all([
        game.categories.forEach((category) =>
          queryClient.refetchQueries({ queryKey: ["games", category.title] })
        ),
        queryClient.refetchQueries({ queryKey: ["game", gameId] }),
      ]);
    } catch (error) {
      console.error("Cannot toggle like", error);
      if (isLiked) {
        likedGamesStore.addGame(gameId);
        setLikesNumber((prev) => prev + 1);
      } else {
        likedGamesStore.removeGame(gameId);
        setLikesNumber((prev) => prev - 1);
      }
      setIsLiked((prev) => !prev);
    } finally {
      likedGamesStore.setIsPending(false);
      processingActionsStore.removeAction(gameId, "like");
    }
  };
  return { likesNumber, toggleLike, fillOpacity };
};
