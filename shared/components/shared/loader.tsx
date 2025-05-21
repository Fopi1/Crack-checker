import { cn } from "@/shadcn";
import { CSSProperties } from "react";

interface Props {
  style?: CSSProperties;
  className?: string;
}
export const Loader = ({ style, className }: Props) => {
  return (
    <div
      className={cn(
        "w-fit mx-auto flex justify-center items-center p-10",
        className,
      )}
      style={style}
    >
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-crack-violet"></div>
    </div>
  );
};
