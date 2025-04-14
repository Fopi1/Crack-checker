"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { MouseEvent, useEffect, useState } from "react";

import { AppRoutes } from "@/constants";
import { SiteApi } from "@/services/siteApi/apiClient";
import { FullGame } from "@/types/api";
import { useQueryClient } from "@tanstack/react-query";

import { processingActionsStore } from "../store/processingActionsStore";
import { searchStore } from "../store/searchStore";
import { subscriptionStore } from "../store/subscriptionsStore";

export const useGameBell = (game: FullGame) => {
  const queryClient = useQueryClient();
  const { push } = useRouter();
  const { data } = useSession();
  const [isSubscribed, setIsSubscribed] = useState(
    subscriptionStore.subscriptions.includes(game.id)
  );
  useEffect(() => {
    setIsSubscribed(subscriptionStore.subscriptions.includes(game.id));
  }, [game.id, game.subscriptions.length]);
  const toggleSubscription = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (processingActionsStore.hasAction(game.id, "subscription")) return;
    if (!data?.user) {
      push(AppRoutes.LOGIN);
      return;
    }

    processingActionsStore.addAction(game.id, "subscription");
    try {
      if (isSubscribed) {
        subscriptionStore.removeSubscription(game.id);
      } else {
        subscriptionStore.addSubscription(game.id);
      }
      setIsSubscribed((prevIsSubscribed) => !prevIsSubscribed);
      await SiteApi.game.performActionOnGame(game.id, "subscription");
      queryClient.refetchQueries({
        queryKey: ["search", searchStore.debouncedUserInput],
      });
      await Promise.all([
        ...game.categories.map((category) =>
          queryClient.refetchQueries({ queryKey: ["games", category.title] })
        ),
        queryClient.refetchQueries({ queryKey: ["game", game.id] }),
      ]);
    } catch (error) {
      console.error(error);
    } finally {
      processingActionsStore.removeAction(game.id, "subscription");
    }
  };
  return { toggleSubscription, isSubscribed };
};
