"use client";

import { PropsWithChildren, useState } from "react";

export const Blurred = ({ children }: PropsWithChildren) => {
  const [isBlurred, setIsBlurred] = useState(true);
  const handleIsBlurred = () => {
    setIsBlurred(false);
  };
  return (
    <div
      className={isBlurred ? "select-none blur-sm cursor-pointer" : ""}
      onClick={handleIsBlurred}
    >
      {children}
    </div>
  );
};
