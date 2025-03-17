import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AnchorHTMLAttributes,
  forwardRef,
  MouseEvent,
  PropsWithChildren,
} from "react";

import { useToast } from "@/shadcn";
import { likedGamesStore } from "@/shared/store/likedGamesStore";

interface Props
  extends PropsWithChildren<AnchorHTMLAttributes<HTMLAnchorElement>> {
  href: string;
}

export const ProtectedLink = forwardRef<HTMLAnchorElement, Props>(
  ({ href, children, onClick, ...props }, ref) => {
    const router = useRouter();
    const { toast } = useToast();

    const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      console.log(
        "ProtectedLink clicked, isPending:",
        likedGamesStore.isPending
      );
      if (likedGamesStore.isPending) {
        toast({
          description: "Wait until we sync your likes.",
        });
      } else {
        if (onClick) onClick(e);
        router.push(href);
      }
    };
    return (
      <Link href={href} ref={ref} onClick={handleClick} {...props}>
        {children}
      </Link>
    );
  }
);

ProtectedLink.displayName = "ProtectedLink";
