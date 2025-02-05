import { CalendarDays, Home, ReceiptText } from "lucide-react";

export const navLinksIconProps = {
  size: 20,
  strokeWidth: 2.7,
  className: "text-[color:--text-secondary]",
};

export const links = [
  {
    name: "home",
    href: "/",
    icon: Home,
  },
  {
    name: "release calendar",
    href: "/release-calendar",
    icon: CalendarDays,
  },
  { name: "articles", href: "/articles", icon: ReceiptText },
];
