import { FC } from "react";

import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  crackBackgroundColor: string;
  crackStatus: string;
}

export const CrackStatus: FC<Props> = ({
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
