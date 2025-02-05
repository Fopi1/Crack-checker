"use client";

import { usePathname } from "next/navigation";
import { PropsWithChildren, useEffect, useRef } from "react";

import { authStore } from "@/shared/store/authStore";

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const isChecking = useRef(false);
  const pathname = usePathname();

  useEffect(() => {
    if (isChecking.current) return;
    isChecking.current = true;
    authStore.checkAuth();
    isChecking.current = false;
  }, [pathname]);
  return children;
};
