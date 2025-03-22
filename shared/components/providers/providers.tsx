"use client";

import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { PropsWithChildren, useRef, useState } from 'react';

import { likedGamesStore } from '@/shared/store/likedGamesStore';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { LikedGamesProvider } from './likedGamesProvider';

interface Props extends PropsWithChildren {
  session: Session | null | undefined;
  likedGames: string[] | null;
}

export const Providers = ({ children, session, likedGames }: Props) => {
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
    likedGamesStore.setLikedGames(likedGames || []);
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
