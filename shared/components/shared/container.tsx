import { cn } from "@/lib/utils";
import { FC, PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  className?: string;
}

export const Container: FC<Props> = ({ className, children }) => {
  return (
    <div className={cn("mx-auto relative responsive", className)}>
      {children}
    </div>
  );
};
