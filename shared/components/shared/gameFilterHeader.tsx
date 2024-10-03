import { cn } from "@/lib/utils";
import React, { FC } from "react";
import { SortOptions } from "./sortOptions";
import { Users, Flame, Clock, AlarmClockCheck } from "lucide-react";
import { useIcon } from "@/shared/hooks";

interface Props {
  className?: string;
  title: string;
  icon: string;
}

export const GameFilterHeader: FC<Props> = ({ className, title, icon }) => {
  const iconMap: Record<string, React.ReactElement> = {
    Users: <Users />,
    Flame: <Flame />,
    Clock: <Clock />,
    AlarmClockCheck: <AlarmClockCheck />,
  };

  const colors: Record<string, string> = {
    Users: "text-blue-500",
    Flame: "text-yellow-500",
    Clock: "text-green-500",
    AlarmClockCheck: "text-red-500",
  };

  const categoryIconProps = {
    size: 16,
    strokeWidth: 3,
    className: colors[icon],
  };

  const iconWithProps = useIcon(iconMap[icon], categoryIconProps);
  return (
    <div
      className={cn(
        "flex py-10 flex-wrap gap-3 justify-center lg:justify-between",
        {
          className,
        }
      )}
    >
      <div className="flex items-center gap-3">
        <h2 className="text-[40px] font-medium">{title}</h2>
        {iconWithProps}
      </div>
      <div className="flex items-center">
        <SortOptions />
      </div>
    </div>
  );
};