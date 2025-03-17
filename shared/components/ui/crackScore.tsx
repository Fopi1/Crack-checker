import { ReactElement } from "react";

import { cn } from "@/shadcn/lib";

interface Props {
  className?: string;
  image: ReactElement;
  score: number | null;
}

export const CrackScore = ({ className, image, score }: Props) => {
  return (
    <div className={cn("flex items-center gap-1 font-bold", className)}>
      {image}
      {score ? (
        <p className="text-blue-500">{score}</p>
      ) : (
        <p className="text-[--text-information]">NO SCORE</p>
      )}
    </div>
  );
};
