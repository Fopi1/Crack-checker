"use client";

import { PropsWithChildren } from "react";

import { AuthProvider } from "./authProvider";
import { QueryProvider } from "./queryProvider";

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <QueryProvider>
      <AuthProvider>{children}</AuthProvider>
    </QueryProvider>
  );
};
