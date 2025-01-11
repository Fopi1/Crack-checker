import { cn } from "@/lib/utils";
import { FC } from "react";

interface Props {
  className?: string;
  protections: string;
}

export const GameProtections: FC<Props> = ({ className, protections }) => {
  return (
    <div className={cn("flex gap-1", className)}>
      <p>Protection</p>
      <span className=" text-blue-500 font-bold uppercase">{protections}</span>
    </div>
  );
};
