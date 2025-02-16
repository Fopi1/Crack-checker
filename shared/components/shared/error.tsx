import { PropsWithChildren } from "react";

export const Error = ({ children }: PropsWithChildren) => {
  return <p className="text-red-500 text-sm">{children}</p>;
};
