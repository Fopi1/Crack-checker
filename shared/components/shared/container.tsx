import { CSSProperties, PropsWithChildren } from "react";

import { cn } from "@/shadcn";

interface Props extends PropsWithChildren {
  className?: string;
  style?: CSSProperties;
}

export const Container = ({ className, children, style }: Props) => {
  return (
    <div className={cn("mx-auto relative responsive", className)} style={style}>
      {children}
    </div>
  );
};
