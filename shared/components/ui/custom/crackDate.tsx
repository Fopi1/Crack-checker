import { Calendar } from "lucide-react";
import { FC } from "react";

import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  crackDate: string | null;
}

export const CrackDate: FC<Props> = ({ className, crackDate }) => {
  return (
    <div className={cn("flex gap-1", className)}>
      <p>Crack Date:</p>
      <time className="flex gap-1 items-center text-orange-300 font-bold">
        {crackDate ? (
          <>
            <Calendar size={16} strokeWidth={2.7} />
            <p>{crackDate}</p>
          </>
        ) : (
          <p className="text-[--text-information]">ANYTIME</p>
        )}
      </time>
    </div>
  );
};
