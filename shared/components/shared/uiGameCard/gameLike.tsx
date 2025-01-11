"use client";

import { cn } from "@/lib/utils";
import { performActionOnGame } from "@/services/siteApi/games";
import { ThumbsUp } from "lucide-react";
import { FC, MouseEvent, useRef } from "react";

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
  const processingActions = useRef<string[]>([]);
  const toggleLike = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (processingActions.current.includes("like")) return;
    processingActions.current = [...processingActions.current, "like"];
    try {
      const action = await performActionOnGame(gameId, "like");
      switch (action) {
        case "disliked":
          likesNumber--;
          handleClick(likesNumber, false);
          break;
        case "liked":
          likesNumber++;
          handleClick(likesNumber, true);
        default:
          break;
      }
    } catch (error) {
      console.error(error);
    } finally {
      processingActions.current = processingActions.current.filter(
        (action) => action !== "like"
      );
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
        fillOpacity={isLiked ? "1" : "0"}
      />
      <p>{likesNumber}</p>
    </button>
  );
};
