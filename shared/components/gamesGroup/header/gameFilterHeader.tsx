import React, { FC, memo } from 'react';

import { cn } from '@/shadcn';

import { colors, iconMap } from './constants';
import { SortOptions } from './sortOptions';

interface Props {
  className?: string;
  title: string;
  icon: string;
}
const GameFilterHeaderComponent: FC<Props> = ({ className, title, icon }) => {
  const categoryIconProps = {
    size: 24,
    strokeWidth: 3,
    className: colors[icon],
  };

  const IconWIthProps = iconMap[icon];
  return (
    <div
      className={cn(
        "w-full flex py-10 flex-wrap gap-3 justify-center lg:justify-between",
        {
          className,
        }
      )}
    >
      <div className="flex items-center gap-3">
        <h2 className="text-[40px] font-medium">{title}</h2>
        <IconWIthProps {...categoryIconProps} />
      </div>
      <div className="flex items-center">
        <SortOptions category={title} />
      </div>
    </div>
  );
};

const GameFilterHeader = memo(GameFilterHeaderComponent);
GameFilterHeader.displayName = "GameFilterHeader";
export { GameFilterHeader };
