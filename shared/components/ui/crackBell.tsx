"use client";

import { Bell } from "lucide-react";
import { observer } from "mobx-react-lite";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/shadcn/components/ui";
import { cn } from "@/shadcn/lib";
import { useGameBell } from "@/shared/hooks";
import { FullGame } from "@/types/api";

interface Props {
  className?: string;
  game: FullGame;
}

export const CrackBell = observer(({ className, game }: Props) => {
  const { toggleSubscription, isSubscribed } = useGameBell(game);
  const bellColor = isSubscribed ? "text-red-600" : "text-orange-400";
  const bellText = isSubscribed
    ? "Turn off notifications"
    : "Turn on notifications";
  if (game.id === "018f1715-194e-4d8d-8bd4-546efbaf18bd") {
    console.log(bellText);
  }
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <button
          className={cn(
            "h-full bg-gray-950 rounded-xl px-3 py-1 flex items-center transition-transform duration-300 ease-in-out hover:scale-110 will-change-transform hover:rotate-[15deg]",
            className
          )}
          onClick={toggleSubscription}
        >
          <Bell size={20} strokeWidth={3} className={bellColor} />
        </button>
      </HoverCardTrigger>
      <HoverCardContent
        className="bg-black text-center rounded-[6px] border-none w-auto"
        side="top"
      >
        <p className="font-normal px-1">{bellText}</p>
      </HoverCardContent>
    </HoverCard>
  );
});
