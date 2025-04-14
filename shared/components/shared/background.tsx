import { PropsWithChildren } from "react";

export const Background = ({ children }: PropsWithChildren) => {
  return <div className="bg-image bg-repeat z-[1]">{children}</div>;
};
