"use client";

import { cn } from "@/lib/utils";
import { FC, PropsWithChildren, useState } from "react";

interface Props extends PropsWithChildren {
  className?: string;
}

export const Blurred: FC<Props> = ({ className, children }) => {
  const [isBlurred, setIsBlurred] = useState(true);
  const handleIsBlurred = () => {
    setIsBlurred(false);
  };
  return (
    <div
      className={cn(
        isBlurred ? "select-none blur-sm cursor-pointer" : "",
        className
      )}
      onClick={handleIsBlurred}
    >
      {children}
    </div>
  );
};
