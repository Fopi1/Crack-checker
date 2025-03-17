import React, { memo } from 'react';

import { colors, iconMap } from './constants';
import { SortOptions } from './sortOptions';

interface Props {
  title: string;
}
const GameFilterComponent = ({ title }: Props) => {
  const categoryIconProps = {
    size: 24,
    strokeWidth: 3,
    className: colors[title],
  };

  const IconWIthProps = iconMap[title];
  return (
    <div className="w-full flex py-10 flex-wrap gap-3 justify-center lg:justify-between">
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

const GameFilter = memo(GameFilterComponent);
GameFilter.displayName = "GameFilterHeader";
export { GameFilter };
