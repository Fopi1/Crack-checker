import { Bell } from "lucide-react";
import { MouseEvent } from "react";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/shadcn/components/ui";
import { cn } from "@/shadcn/lib";

interface Props {
  className?: string;
}

export const CrackBell = ({ className }: Props) => {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <button
          className={cn(
            "h-full bg-gray-950 rounded-xl px-3 py-1 flex items-center transition-transform duration-300 ease-in-out hover:scale-110 will-change-transform hover:rotate-[15deg]",
            className
          )}
          onClick={handleClick}
        >
          <Bell size={20} strokeWidth={3} className="text-orange-400" />
        </button>
      </HoverCardTrigger>
      <HoverCardContent
        className="bg-black text-center rounded-[6px] border-none w-auto"
        side="top"
      >
        <p className="font-normal px-1">Turn on notifications</p>
      </HoverCardContent>
    </HoverCard>
  );
};
