"use client";

import { PropsWithChildren, useRef, useState } from "react";

import { authStore } from "@/shared/store/authStore";
import { UserData } from "@/types/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { AuthProvider } from "./authProvider";
import { GlobalQueriesProvider } from "./globalQueriesProvider";

interface Props extends PropsWithChildren {
  userData: UserData | null;
  likedGames: string[];
}

export const Providers = ({ children, userData, likedGames }: Props) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5,
            refetchOnWindowFocus: false,
          },
        },
      })
  );
  const isInitialized = useRef(false);
  if (!isInitialized.current) {
    authStore.setUserData(userData);
    queryClient.setQueryData(["likedGames"], likedGames);
    isInitialized.current = true;
  }

  return (
    <QueryClientProvider client={queryClient}>
      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
      <AuthProvider>
        <GlobalQueriesProvider>{children}</GlobalQueriesProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};
