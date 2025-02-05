import { FC, ReactElement } from 'react';

import { cn } from '@/lib/utils';

interface Props {
  className?: string;
  image: ReactElement;
  score: number | null;
}

export const CrackScore: FC<Props> = ({ className, image, score }) => {
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
