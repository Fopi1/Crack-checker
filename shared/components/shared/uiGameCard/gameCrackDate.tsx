import { cn } from "@/lib/utils";
import { Calendar } from "lucide-react";
import { FC } from "react";

interface Props {
  className?: string;
  crackDate: string;
}

export const GameCrackDate: FC<Props> = ({ className, crackDate }) => {
  return (
    <div className={cn("flex gap-1", className)}>
      <p>Crack Date:</p>
      <time className="flex gap-1 items-center text-orange-300 font-bold">
        <Calendar size={16} strokeWidth={2.7} />
        {crackDate}
      </time>
    </div>
  );
};
