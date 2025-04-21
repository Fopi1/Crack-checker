import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { MouseEvent, useEffect, useState } from "react";

import { AppRoutes } from "@/constants";
import { SiteApi } from "@/services/apiClient";
import { FullGame } from "@/types/api";
import { useQueryClient } from "@tanstack/react-query";

import { likedGamesStore } from "../store/likedGamesStore";
import { processingActionsStore } from "../store/processingActionsStore";
import { searchStore } from "../store/searchStore";

export const useGameLike = (game: FullGame) => {
  const queryClient = useQueryClient();
  const { push } = useRouter();
  const { data } = useSession();
  const [isLiked, setIsLiked] = useState(
    likedGamesStore.likedGames.includes(game.id)
  );
  const [likesNumber, setLikesNumber] = useState(game.likes.length);
  const fillOpacity = isLiked && data?.user ? "1" : "0";

  useEffect(() => {
    setLikesNumber(game.likes.length);
    setIsLiked(likedGamesStore.likedGames.includes(game.id));
  }, [game.id, game.likes.length]);

  const toggleLike = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (processingActionsStore.hasAction(game.id, "like")) return;
    if (!data?.user) {
      push(AppRoutes.LOGIN);
      return;
    }

    processingActionsStore.addAction(game.id, "like");
    try {
      if (isLiked) {
        likedGamesStore.removeGame(game.id);
        setLikesNumber((prevLikes) => prevLikes - 1);
      } else {
        likedGamesStore.addGame(game.id);
        setLikesNumber((prevLikes) => prevLikes + 1);
      }
      setIsLiked((prevIsLiked) => !prevIsLiked);
      await SiteApi.game.performActionOnGame(game.id, "like");
      queryClient.refetchQueries({
        queryKey: ["search", searchStore.debouncedUserInput],
      });
      await Promise.all([
        ...game.categories.map((category) =>
          queryClient.refetchQueries({ queryKey: ["games", category.title] })
        ),
        queryClient.refetchQueries({ queryKey: ["game", game.id] }),
      ]);
    } catch (error) {
      console.error("Cannot toggle like", error);
      if (isLiked) {
        likedGamesStore.addGame(game.id);
        setLikesNumber((prev) => prev + 1);
      } else {
        likedGamesStore.removeGame(game.id);
        setLikesNumber((prev) => prev - 1);
      }
      setIsLiked((prev) => !prev);
    } finally {
      processingActionsStore.removeAction(game.id, "like");
    }
  };
  return { likesNumber, toggleLike, fillOpacity };
};
