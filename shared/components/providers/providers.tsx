"use client";

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { PropsWithChildren, useRef, useState } from "react";

import { likedGamesStore } from "@/shared/store/likedGamesStore";
import { subscriptionsStore } from "@/shared/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { LikedGamesProvider } from "./likedGamesProvider";

interface Props extends PropsWithChildren {
  session: Session | null | undefined;
  likedGames: string[];
  subscriptions: string[];
}

export const Providers = ({
  children,
  session,
  likedGames,
  subscriptions,
}: Props) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5,
            refetchOnWindowFocus: false,
            gcTime: 1000 * 60 * 10,
          },
        },
      }),
  );
  const isInitialized = useRef(false);
  if (!isInitialized.current) {
    likedGamesStore.setLikedGames(likedGames);
    subscriptionsStore.setSubscriptions(subscriptions);
    isInitialized.current = true;
  }

  return (
    <QueryClientProvider client={queryClient}>
      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
      <SessionProvider session={session}>
        <LikedGamesProvider>{children}</LikedGamesProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
};
