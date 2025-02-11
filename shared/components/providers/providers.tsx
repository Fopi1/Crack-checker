"use client";

import { FC, PropsWithChildren, useRef } from "react";

import { authStore } from "@/shared/store/authStore";
import { UserData } from "@/types/store";

import { AuthProvider } from "./authProvider";
import { QueryProvider } from "./queryProvider";

interface Props extends PropsWithChildren {
  userData: UserData;
}

export const Providers: FC<Props> = ({ children, userData }) => {
  const isInitialized = useRef(false);
  if (!isInitialized.current) {
    authStore.userData = userData;
    isInitialized.current = true;
  }

  return (
    <QueryProvider>
      <AuthProvider>{children}</AuthProvider>
    </QueryProvider>
  );
};
