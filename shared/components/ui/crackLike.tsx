"use client";

import { ThumbsUp } from "lucide-react";
import { observer } from "mobx-react-lite";
import { MouseEvent, useState } from "react";

import { performActionOnGame } from "@/services/siteApi/games";
import { cn } from "@/shadcn/lib";
import { authStore } from "@/shared/store/authStore";
import { processingActionsStore } from "@/shared/store/processingActionsStore";
import { FullGame } from "@/types/api";
import { useQueryClient } from "@tanstack/react-query";

interface Props {
  className?: string;
  game: FullGame;
}

export const CrackLike = observer(({ className, game }: Props) => {
  const { id: gameId, likes } = game;
  const [category] = game.categories;
  const queryClient = useQueryClient();
  const likedGames: string[] = queryClient.getQueryData(["likedGames"]) || [];

  const [isLiked, setIsLiked] = useState(likedGames.includes(gameId));
  const [likesNumber, setLikesNumber] = useState(likes.length);

  const fillOpacity = isLiked && authStore.userData ? "1" : "0";

  const toggleLike = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (processingActionsStore.hasAction(gameId, "like") || !authStore.userData)
      return;
    const userId = authStore.userData!.id;
    const newLikedGames = isLiked
      ? likedGames.filter((id) => id !== gameId)
      : [...likedGames, gameId];
    const newLikes = isLiked
      ? likes.filter((user) => user.id !== userId)
      : [...likes, { id: userId }];
    setLikesNumber(newLikes.length);
    setIsLiked(!isLiked);
    processingActionsStore.addAction(gameId, "like");
    console.log(
      queryClient.getQueriesData({ queryKey: ["games", category.title] })
    );
    console.log(queryClient.getQueryData(["games", category.title]));
    try {
      await performActionOnGame(gameId, "like");
      queryClient.setQueryData(["likedGames"], newLikedGames);
      // queryClient.setQueryData(["games", category.title], newLikes);
    } catch (error) {
      console.error("Cannot toggle like", error);
    } finally {
      processingActionsStore.removeAction(gameId, "like");
    }
  };
  return (
    <button
      onClick={toggleLike}
      className={cn(
        "bg-blue-600 rounded-2xl px-10 py-[6px] flex items-center gap-1 transition-transform duration-300 ease-in-out hover:scale-110 will-change-transform hover:rotate-[-15deg]",
        className
      )}
    >
      <ThumbsUp
        className="pointer-events-none mb-[2px]"
        size={18}
        strokeWidth={3}
        fill="white"
        fillOpacity={fillOpacity}
      />
      <p>{likesNumber}</p>
    </button>
  );
});
