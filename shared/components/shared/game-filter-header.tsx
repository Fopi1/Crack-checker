import { cn } from "@/lib/utils";
import { FC } from "react";
import { SortOptions } from "./sort-options";
import { useElementWithProps } from "@/shared/hooks";

interface Props {
  className?: string;
  title: string;
  icon?: React.ReactElement;
}

export const GameFilterHeader: FC<Props> = ({ className, title, icon }) => {
  const iconProps = {
    size: 16,
    strokeWidth: 3,
  };
  const iconWithProps = useElementWithProps(icon, iconProps);

  return (
    <div className={cn("flex justify-between py-10", { className })}>
      <div className="flex items-center gap-3">
        <h2 className="text-[40px] font-medium">{title}</h2>
        {iconWithProps}
      </div>
      <SortOptions />
    </div>
  );
};
