import Link from "next/link";
import { FC, MouseEvent, PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

interface Props extends PropsWithChildren {
  className?: string;
  sameSite?: boolean;
  href: string;
  backgroundColor: string;
  hoverColor: string;
  icon: () => JSX.Element;
  iconProps?: object;
}

export const TransitionLink: FC<Props> = ({
  className,
  href,
  backgroundColor,
  hoverColor,
  icon,
  children,
  iconProps,
  sameSite = false,
}) => {
  const IconComponent = icon;
  const commonProps = {
    style: { backgroundColor },
    className: cn(
      "transition-colors duration-300 flex items-center justify-center gap-3 font-bold py-3 rounded-[15px] text-white z-[1]",
      className
    ),
    onMouseOver: (e: MouseEvent<HTMLElement>) => (
      (e.currentTarget.style.backgroundColor = hoverColor),
      (e.currentTarget.style.color = backgroundColor)
    ),
    onMouseOut: (e: MouseEvent<HTMLElement>) => (
      (e.currentTarget.style.backgroundColor = backgroundColor),
      (e.currentTarget.style.color = hoverColor)
    ),
  };
  return (
    <>
      {sameSite ? (
        <Link {...commonProps} href={href}>
          <IconComponent {...iconProps} />
          {children}
        </Link>
      ) : (
        <a
          {...commonProps}
          href={href}
          rel="noopener noreferrer"
          target="_blank"
        >
          <IconComponent {...iconProps} />
          {children}
        </a>
      )}
    </>
  );
};
