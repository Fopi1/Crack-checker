import Link from "next/link";
import { FC, PropsWithChildren } from "react";

import { cn } from "@/shadcn";

interface Props extends PropsWithChildren {
  className?: string;
  href: string;
}

export const FormTextLink: FC<Props> = ({ className, href, children }) => {
  return (
    <Link
      className={cn("text-sm font-bold first-letter:capitalize", className)}
      href={href}
    >
      {children}
    </Link>
  );
};
