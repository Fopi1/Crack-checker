import { MouseEvent, useState } from "react";

import { performActionOnGame } from "@/services/siteApi/games";
import { FullGame } from "@/types/api";
import { useQueryClient } from "@tanstack/react-query";

import { authStore } from "../store/authStore";
import { likedGamesStore } from "../store/likedGamesStore";
import { processingActionsStore } from "../store/processingActionsStore";

export const useGameLike = (game: FullGame) => {
  const queryClient = useQueryClient();
  const { id: gameId, likes } = game;
  const [isLiked, setIsLiked] = useState(
    likedGamesStore.likedGames.includes(gameId)
  );
  const [likesNumber, setLikesNumber] = useState(likes.length);
  const fillOpacity = isLiked && authStore.userData ? "1" : "0";

  const toggleLike = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (processingActionsStore.hasAction(gameId, "like") || !authStore.userData)
      return;
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

      await performActionOnGame(gameId, "like");

      game.categories.forEach((category) =>
        queryClient.refetchQueries({ queryKey: ["games", category.title] })
      );
      queryClient.refetchQueries({ queryKey: ["game", gameId] });
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
