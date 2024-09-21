import { FC } from "react";
import { NavLinks } from "./nav-links";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

export const DesktopWrapper: FC<Props> = ({ className }) => {
  return (
    <div className={cn("font-semibold text-sm flex gap-10", className)}>
      <NavLinks />
    </div>
  );
};
