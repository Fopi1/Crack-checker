"use client";

import { ThumbsUp } from "lucide-react";
import { FC, MouseEvent } from "react";

import { cn } from "@/lib/utils";
import { performActionOnGame } from "@/services/siteApi/games";
import { processingActionsStore } from "@/shared/store/processingActionsStore";

interface Props {
  className?: string;
  gameId: string;
  isLiked: boolean;
  likesNumber: number;
  handleClick: (likesNumber: number, isLiked: boolean) => void;
}

export const GameLike: FC<Props> = ({
  className,
  gameId,
  isLiked,
  likesNumber,
  handleClick,
}) => {
  const toggleLike = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (processingActionsStore.hasAction(gameId, "like")) return;
    processingActionsStore.addAction(gameId, "like");
    const newLikesNumber = isLiked ? likesNumber - 1 : likesNumber + 1;
    const newIsLiked = isLiked ? false : true;
    handleClick(newLikesNumber, newIsLiked);
    await performActionOnGame(gameId, "like");
    processingActionsStore.removeAction(gameId, "like");
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
        fillOpacity={isLiked ? "1" : "0"}
      />
      <p>{likesNumber}</p>
    </button>
  );
};
