"use client";

import { PropsWithChildren, useRef } from "react";

import { authStore } from "@/shared/store/authStore";
import { UserData } from "@/types/store";

import { AuthProvider } from "./authProvider";
import { QueryProvider } from "./queryProvider";

interface Props extends PropsWithChildren {
  userData: UserData | null;
}

export const Providers = ({ children, userData }: Props) => {
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
