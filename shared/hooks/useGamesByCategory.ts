import { SiteApi } from "@/services/apiClient";
import { useQuery } from "@tanstack/react-query";

import { sortStore } from "@/shared/store";

export const useGamesByCategory = (category: string) => {
  const { takeGames, sortBy, sortOrder, isAAA } =
    sortStore.categoriesSortOptions[category];
  return useQuery({
    queryKey: ["games", category, { takeGames, sortBy, sortOrder, isAAA }],
    queryFn: () =>
      SiteApi.game.getByParams(category, takeGames, sortBy, sortOrder, isAAA),
  });
};
