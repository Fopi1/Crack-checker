import Link from 'next/link';
import { FC, PropsWithChildren, ReactElement } from 'react';

import { cn } from '@/lib/utils';
import { useIcon } from '@/shared/hooks';

interface Props extends PropsWithChildren {
  className?: string;
  sameSite?: boolean;
  href: string;
  backgroundColor: string;
  hoverColor: string;
  icon: ReactElement;
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
  return (
    <>
      {sameSite ? (
        <Link
          style={{ backgroundColor: backgroundColor }}
          className={cn(
            "transition-colors duration-300 flex items-center justify-center gap-3 font-bold py-3 rounded-[15px] text-white z-[1]",
            className
          )}
          href={href}
          onMouseOver={(e) => (
            (e.currentTarget.style.backgroundColor = hoverColor),
            (e.currentTarget.style.color = backgroundColor)
          )}
          onMouseOut={(e) => (
            (e.currentTarget.style.backgroundColor = backgroundColor),
            (e.currentTarget.style.color = hoverColor)
          )}
        >
          {/* eslint-disable-next-line react-hooks/rules-of-hooks */}
          {useIcon(icon, iconProps)}
          {children}
        </Link>
      ) : (
        <a
          style={{ backgroundColor: backgroundColor }}
          className={cn(
            "transition-colors duration-300 flex items-center justify-center gap-3 font-bold py-3 rounded-[15px] text-white z-[1]",
            className
          )}
          href={href}
          onMouseOver={(e) => (
            (e.currentTarget.style.backgroundColor = hoverColor),
            (e.currentTarget.style.color = backgroundColor)
          )}
          onMouseOut={(e) => (
            (e.currentTarget.style.backgroundColor = backgroundColor),
            (e.currentTarget.style.color = hoverColor)
          )}
          rel="noopener noreferrer"
          target="_blank"
        >
          {/* eslint-disable-next-line react-hooks/rules-of-hooks */}
          {useIcon(icon, iconProps)}
          {children}
        </a>
      )}
    </>
  );
};
