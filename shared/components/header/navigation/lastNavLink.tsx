import { LogIn } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

import { navLinksIconProps } from "../../shared/constants";

interface Props {
  href: string;
  text: string;
}

export const LastNavLink: FC<Props> = ({ href, text }) => {
  return (
    <Link href={href} className="flex items-center gap-2 font-bold text-sm">
      <LogIn {...navLinksIconProps} />
      {text}
    </Link>
  );
};
