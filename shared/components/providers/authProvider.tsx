"use client";

import { usePathname } from "next/navigation";
import { PropsWithChildren, useRef } from "react";

import { authStore } from "@/shared/store/authStore";
import { useAsyncEffect } from "@reactuses/core";

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();
  const isChecking = useRef(false);
  useAsyncEffect(
    async () => {
      if (isChecking.current) return;
      isChecking.current = true;
      await authStore.checkAuth();
      console.log("Auth check completed");
      isChecking.current = false;
    },
    () => {},
    [pathname]
  );
  return children;
};
