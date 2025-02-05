import { FC } from 'react';

import { cn } from '@/lib/utils';

interface Props {
  className?: string;
  crackTextColor: string;
  crackedBy: string;
}

export const CrackCracker: FC<Props> = ({
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
