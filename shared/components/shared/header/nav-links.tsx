import { cn } from "@/lib/utils";
import { useElementWithProps } from "@/shared/hooks/use-element-with-props";
import {
  CalendarDays,
  Home,
  LockKeyhole,
  LogIn,
  ReceiptText,
  Search,
} from "lucide-react";
import Link from "next/link";
import { FC } from "react";

interface Props {
  className?: string;
}

export const NavLinks: FC<Props> = ({ className }) => {
  const iconProps = {
    size: 20,
    strokeWidth: 2.7,
    className: "text-[color:--text-secondary]",
  };

  const links = [
    {
      name: "home",
      href: "/",
      icon: <Home />,
    },
    {
      name: "release calendar",
      href: "/release-calendar",
      icon: <CalendarDays />,
    },
    { name: "search", href: "/search", icon: <Search /> },
    { name: "articles", href: "/articles", icon: <ReceiptText /> },
    { name: "log in", href: "/login", icon: <LogIn /> },
    { name: "register", href: "/register", icon: <LockKeyhole /> },
  ];

  const linksWithProps = useElementWithProps(links, iconProps);
  return (
    <>
      {linksWithProps.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          className={cn("flex items-center gap-2", className)}
        >
          {link.icon}
          {link.name}
        </Link>
      ))}
    </>
  );
};
