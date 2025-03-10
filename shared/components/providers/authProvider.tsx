"use client";

import { usePathname } from "next/navigation";
import { PropsWithChildren, useRef } from "react";

import { authStore } from "@/shared/store/authStore";
import { useAsyncEffect } from "@reactuses/core";

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const newPathname = usePathname();
  const oldPathname = useRef(newPathname);
  const isNewPath = oldPathname.current !== newPathname;
  useAsyncEffect(
    async () => {
      if (isNewPath) {
        authStore.checkAuth();
      }
      oldPathname.current = newPathname;
    },
    () => {},
    [newPathname]
  );
  return children;
};
