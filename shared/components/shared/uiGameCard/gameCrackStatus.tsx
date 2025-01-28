import { cn } from "@/lib/utils";
import { FC } from "react";

interface Props {
  className?: string;
  crackBackgroundColor: string;
  crackStatus: string;
}

export const GameCrackStatus: FC<Props> = ({
  className,
  crackBackgroundColor,
  crackStatus,
}) => {
  return (
    <div
      className={cn(
        `w-fit px-3 py-[2px] rounded-2xl text-sm font-semibold drop-shadow-status`,
        className,
        crackBackgroundColor
      )}
    >
      <p>{crackStatus}</p>
    </div>
  );
};
