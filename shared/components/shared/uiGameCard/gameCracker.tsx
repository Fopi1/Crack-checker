import { cn } from "@/lib/utils";
import { FC } from "react";

interface Props {
  className?: string;
  crackTextColor: string;
  crackedBy: string;
}

export const GameCracker: FC<Props> = ({
  className,
  crackTextColor,
  crackedBy,
}) => {
  return (
    <div className={cn("flex gap-1", className)}>
      <p>Cracked by:</p>
      <span className={cn("font-bold uppercase", crackTextColor)}>
        {crackedBy}
      </span>
    </div>
  );
};
