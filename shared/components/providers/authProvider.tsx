"use client";

import { PropsWithChildren } from "react";

import { usePathnames } from "@/shared/hooks/usePathnames";
import { authStore } from "@/shared/store/authStore";
import { useAsyncEffect } from "@reactuses/core";

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const { newPathname, oldPathname } = usePathnames();
  const isNewPath = oldPathname !== newPathname;
  useAsyncEffect(
    async () => {
      if (isNewPath) {
        authStore.checkAuth();
      }
    },
    () => {},
    [newPathname]
  );
  return children;
};
