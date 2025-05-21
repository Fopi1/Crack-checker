import { Calendar } from "lucide-react";

import { cn } from "@/shadcn/lib";

interface Props {
  className?: string;
  releaseDate: string;
}

export const CrackReleaseDate = ({ className, releaseDate }: Props) => {
  return (
    <div className={cn("flex gap-1 text-lg md:text-xl", className)}>
      <p>Release Date:</p>
      <time className="flex gap-1 items-center text-orange-300 font-bold">
        <Calendar size={16} strokeWidth={2.7} />
        {releaseDate}
      </time>
    </div>
  );
};
