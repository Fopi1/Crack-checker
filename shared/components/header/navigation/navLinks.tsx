"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { FC } from "react";

import { AppRoutes } from "@/constants/routes";
import { cn } from "@/shadcn";

import { links, navLinksIconProps } from "./constants";

interface Props {
  className?: string;
}

export const NavLinks: FC<Props> = ({ className }) => {
  const { data } = useSession();
  return (
    <>
      {links.map((link) => {
        if (link.href === AppRoutes.LOGIN && data) return;
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
