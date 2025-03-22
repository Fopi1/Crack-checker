"use client";

import { User } from "next-auth";
import { signOut } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

import { AppRoutes } from "@/constants/routes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shadcn/components/ui";
import { ChevronDownIcon } from "@radix-ui/react-icons";

interface Props {
  user: { id: string } & User;
}

export const LoginedActionsButton = ({ user }: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const routeProfile = () => {
    router.push("/profile");
  };

  const logOut = async () => {
    await signOut({ redirect: false });
    if (pathname !== AppRoutes.MAIN) {
      router.replace(AppRoutes.MAIN);
    }
  };
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
};
