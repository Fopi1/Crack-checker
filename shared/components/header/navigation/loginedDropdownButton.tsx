"use client";

import { useRouter } from "next/navigation";

import { authStore } from "@/shared/store/authStore";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/shadcn";

export const LoginedDropdownButton = () => {
  const router = useRouter();

  const handlePushRoute = () => {
    console.log("da");
    router.replace("/profile");
  };

  const user = authStore.userData;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{user?.name}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="font-bold" onClick={handlePushRoute}>
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
