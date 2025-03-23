"use client";

import { useSession } from "next-auth/react";
import { PropsWithChildren } from "react";

import { SiteApi } from "@/services/siteApi/apiClient";
import { likedGamesStore } from "@/shared/store/likedGamesStore";
import { useAsyncEffect } from "@reactuses/core";

export const LikedGamesProvider = ({ children }: PropsWithChildren) => {
  const { data } = useSession();
  const id = data?.user.id;
  useAsyncEffect(
    async () => {
      if (id) {
        const likedGames = await SiteApi.users.getLikedGames();
        likedGamesStore.setLikedGames(likedGames || []);
      } else {
        likedGamesStore.setLikedGames([]);
      }
    },
    () => {},
    [data]
  );
  return children;
};
