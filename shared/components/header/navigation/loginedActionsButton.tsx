"use client";

import { observer } from "mobx-react-lite";
import { usePathname, useRouter } from "next/navigation";

import { AppRoutes, SiteApiRoutes } from "@/constants/routes";
import { axiosSiteInstance } from "@/services/instance";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shadcn/components/ui";
import { authStore } from "@/shared/store/authStore";
import { ChevronDownIcon } from "@radix-ui/react-icons";

export const LoginedActionsButton = observer(() => {
  const router = useRouter();
  const pathname = usePathname();

  const routeProfile = () => {
    router.push("/profile");
  };

  const logOut = async () => {
    await axiosSiteInstance.post(SiteApiRoutes.LOGOUT);
    authStore.userData = null;
    if (pathname === AppRoutes.MAIN) {
      await authStore.checkAuth();
    } else {
      router.replace(AppRoutes.MAIN);
    }
  };

  const user = authStore.userData;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex gap-2 h-9 w-fit items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm font-medium shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1">
        {user?.name}
        <ChevronDownIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          className="font-bold uppercase"
          onClick={routeProfile}
        >
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={logOut}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
});
