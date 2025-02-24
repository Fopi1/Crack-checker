import { Calendar } from 'lucide-react';
import { FC } from 'react';

import { cn } from '@/shadcn/lib';

interface Props {
  className?: string;
  releaseDate: string;
}

export const CrackReleaseDate: FC<Props> = ({ className, releaseDate }) => {
  return (
    <div className={cn("flex gap-1", className)}>
      <p>Release Date:</p>
      <time className="flex gap-1 items-center text-orange-300 font-bold">
        <Calendar size={16} strokeWidth={2.7} />
        {releaseDate}
      </time>
    </div>
  );
};
