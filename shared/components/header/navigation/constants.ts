import { CalendarDays, Home, LogIn, ReceiptText, UserLock } from "lucide-react";

import { AppRoutes } from "@/constants/routes";
import { Session } from "next-auth";

export const navLinksIconProps = {
  size: 20,
  strokeWidth: 2.7,
  className: "text-[color:--text-secondary]",
};

export const links = [
  {
    name: "panel",
    href: AppRoutes.ADMIN_PANEL,
    icon: UserLock,
    visible: (session: Session | null) => session?.user.role === "admin",
  },
  {
    name: "home",
    href: AppRoutes.MAIN,
    icon: Home,
  },
  {
    name: "release calendar",
    href: AppRoutes.RELEASE_CALENDAR,
    icon: CalendarDays,
  },
  // { name: "articles", href: AppRoutes.ARTICLES, icon: ReceiptText },
  {
    name: "log in",
    href: AppRoutes.LOGIN,
    icon: LogIn,
    visible: (session: Session | null) => !session,
  },
];
