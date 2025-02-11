import { CalendarDays, Home, LogIn, ReceiptText } from "lucide-react";

import { LucideComponent } from "@/types/components";
import { Routes } from "@/types/routes";

export const navLinksIconProps = {
  size: 20,
  strokeWidth: 2.7,
  className: "text-[color:--text-secondary]",
};

export const links: { name: string; href: Routes; icon: LucideComponent }[] = [
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
  { name: "log in", href: "/login", icon: LogIn },
];
