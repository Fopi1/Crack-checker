import { SiteApi } from "@/services/siteApi/apiClient";
import { useQuery } from "@tanstack/react-query";

import { sortStore } from "../store/sortStore";

export const useGamesByCategory = (category: string) => {
  const { takeGames, sortBy, sortOrder, isAAA } =
    sortStore.categoriesSortOptions[category];
  return useQuery({
    queryKey: ["games", category, { takeGames, sortBy, sortOrder, isAAA }],
    queryFn: () =>
      SiteApi.games.getByParams(category, takeGames, sortBy, sortOrder, isAAA),
  });
};
