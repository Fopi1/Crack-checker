import { FC } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../../ui/hover-card";
import { Bell } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

export const GameBell: FC<Props> = ({ className }) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <button className="h-full bg-gray-950 rounded-xl px-3 py-1 flex items-center transition-transform duration-300 ease-in-out hover:scale-110 will-change-transform hover:rotate-[15deg]">
          <Bell size={20} strokeWidth={3} className="text-orange-400" />
        </button>
      </HoverCardTrigger>
      <HoverCardContent
        className={cn(
          "bg-black text-center rounded-[6px] border-none w-auto",
          className
        )}
        side="top"
      >
        <p className="font-normal px-1">Turn on notifications</p>
      </HoverCardContent>
    </HoverCard>
  );
};
