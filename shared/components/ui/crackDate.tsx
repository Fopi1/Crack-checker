import { Calendar } from "lucide-react";

import { cn } from "@/shadcn/lib";

interface Props {
  className?: string;
  crackDate: string | null;
}

export const CrackDate = ({ className, crackDate }: Props) => {
  return (
    <div className={cn("flex gap-1 text-lg md:text-xl", className)}>
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
