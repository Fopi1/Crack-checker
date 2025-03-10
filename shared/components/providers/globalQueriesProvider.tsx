"use client";

import { observer } from 'mobx-react-lite';
import { PropsWithChildren } from 'react';

import { STALE_TIME } from '@/constants';
import { SiteApi } from '@/services/siteApi/apiClient';
import { authStore } from '@/shared/store/authStore';
import { useAsyncEffect } from '@reactuses/core';
import { useQueryClient } from '@tanstack/react-query';

export const GlobalQueriesProvider = observer(
  ({ children }: PropsWithChildren) => {
    const queryClient = useQueryClient();
    const userData = authStore.userData;
    useAsyncEffect(
      async () => {
        const cachedLikedGames = queryClient.getQueryData<string[]>([
          "likedGames",
        ])!;
        const queryState = queryClient.getQueryState(["likedGames"]);
        const isStale = queryState?.dataUpdatedAt
          ? Date.now() - queryState.dataUpdatedAt > STALE_TIME
          : true;
        if (userData && (!cachedLikedGames.length || isStale)) {
          try {
            const freshLikedGames = await SiteApi.users.getLikedGames();
            queryClient.setQueryData(["likedGames"], freshLikedGames);
          } catch (error) {
            console.error("Failed to fetch likedGames:", error);
          }
        } else if (!userData) {
          queryClient.setQueryData(["likedGames"], []);
        }
      },
      () => {},
      [userData, queryClient]
    );
    return children;
  }
);
