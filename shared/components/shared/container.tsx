import { PropsWithChildren } from "react";

import { cn } from "@/shadcn";

interface Props extends PropsWithChildren {
  className?: string;
}

export const Container = ({ className, children }: Props) => {
  return (
    <div className={cn("mx-auto relative responsive", className)}>
      {children}
    </div>
  );
};
