"use client";

import { reaction } from "mobx";
import { PropsWithChildren, useEffect } from "react";

import { SiteApi } from "@/services/siteApi/apiClient";
import { authStore } from "@/shared/store/authStore";
import { likedGamesStore } from "@/shared/store/likedGamesStore";

export const LikedGamesProvider = ({ children }: PropsWithChildren) => {
  useEffect(() => {
    const dispose = reaction(
      () => authStore.userData?.id,
      async (id) => {
        console.log("Reaction triggered with id:", id);
        if (id) {
          const likedGames = await SiteApi.users.getLikedGames();
          likedGamesStore.setLikedGames(likedGames || []);
        } else {
          likedGamesStore.setLikedGames([]);
        }
      },
      { fireImmediately: true }
    );
    return () => dispose();
  }, []);
  return children;
};
