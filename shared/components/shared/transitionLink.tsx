import Link from "next/link";
import { ComponentType, MouseEvent, PropsWithChildren } from "react";

import { cn } from "@/shadcn";
import { IconProps } from "@/types/components";

interface Props extends PropsWithChildren {
  className?: string;
  sameSite?: boolean;
  onClick?: () => void;
  href?: string;
  backgroundColor: string;
  hoverColor: string;
  icon: ComponentType<Partial<IconProps>>;
  iconProps?: Partial<IconProps>;
}

export const TransitionLink = ({
  className,
  onClick,
  href,
  backgroundColor,
  hoverColor,
  icon,
  children,
  iconProps = {},
  sameSite = false,
}: Props) => {
  const IconComponent = icon;
  const commonProps = {
    style: { backgroundColor },
    className: cn(
      "transition-colors duration-300 flex items-center justify-center gap-3 font-bold py-3 rounded-[15px] text-white z-[1] text-sm sm:text-base",
      className,
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
        <Link {...commonProps} onClick={onClick} href={"#"}>
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
