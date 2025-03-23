"use client";

import { ThumbsUp } from "lucide-react";
import { observer } from "mobx-react-lite";

import { cn } from "@/shadcn/lib";
import { useGameLike } from "@/shared/hooks";

import type { FullGame } from "@/types/api";
interface Props {
  className?: string;
  game: FullGame;
}

export const CrackLike = observer(({ className, game }: Props) => {
  const { likesNumber, fillOpacity, toggleLike } = useGameLike(game);
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
