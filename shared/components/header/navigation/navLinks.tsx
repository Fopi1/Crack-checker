"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useMemo } from "react";

import { links, navLinksIconProps } from "./constants";
import { LoginedActionsButton } from "./loginedActionsButton";

interface Props {
  className?: string;
}

export const NavLinks = ({ className }: Props) => {
  const { data: session } = useSession();
  const visibleLinks = useMemo(() => {
    return links.filter((link) => link.visible?.(session) ?? true);
  }, [session]);
  return (
    <>
      {visibleLinks.map((link) => {
        const IconComponent = link.icon;
        return (
          <div className={className} key={link.name}>
            <Link
              href={link.href}
              className="uppercase flex items-center gap-2 font-bold text-sm"
            >
              {IconComponent && <IconComponent {...navLinksIconProps} />}
              {link.name}
            </Link>
          </div>
        );
      })}
      {session && (
        <div className={className}>
          <LoginedActionsButton user={session.user} />
        </div>
      )}
    </>
  );
};
