import { FC, PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

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
