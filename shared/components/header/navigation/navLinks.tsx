"use client";

import { observer } from "mobx-react-lite";
import Link from "next/link";
import { FC } from "react";

import { AppRoutes } from "@/constants/routes";
import { cn } from "@/shadcn";
import { authStore } from "@/shared/store/authStore";

import { links, navLinksIconProps } from "./constants";

interface Props {
  className?: string;
}

export const NavLinks: FC<Props> = observer(({ className }) => {
  return (
    <>
      {links.map((link) => {
        if (link.href === AppRoutes.LOGIN && authStore.userData) return;
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
});
