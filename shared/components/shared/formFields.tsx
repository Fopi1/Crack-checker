import { FC, PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

interface Props extends PropsWithChildren {
  className?: string;
}

export const FormFields: FC<Props> = ({ className, children }) => {
  return (
    <div className={cn("flex flex-col gap-7 z-[2]", className)}>{children}</div>
  );
};
