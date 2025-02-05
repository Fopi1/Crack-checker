"use client";

import Link from "next/link";
import { FC } from "react";

import { cn } from "@/lib/utils";

import { links, navLinksIconProps } from "./constants";

interface Props {
  className?: string;
}

export const NavLinks: FC<Props> = ({ className }) => {
  return (
    <>
      {links.map((link) => {
        const IconComponent = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={cn(
              "flex items-center gap-2 font-bold text-sm",
              className
            )}
          >
            {IconComponent && <IconComponent {...navLinksIconProps} />}
            {link.name}
          </Link>
        );
      })}
    </>
  );
};
