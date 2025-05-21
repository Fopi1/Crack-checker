import { cn } from "@/shadcn";
import { CSSProperties, PropsWithChildren } from "react";
interface Props extends PropsWithChildren {
  style: CSSProperties;
  className: string;
}
export const Error = ({ children, style, className }: Partial<Props>) => {
  return (
    <p
      className={cn("text-red-500 text-md md:text-lg text-center", className)}
      style={style}
    >
      {children || "Something happend... Try again later"}
    </p>
  );
};
