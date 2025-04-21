import { SEARCH_QUERY_LENGTH } from "@/constants";
import { SiteApi } from "@/services/apiClient";
import { useQuery } from "@tanstack/react-query";

export const useSearchGames = (query: string) => {
  return useQuery({
    queryKey: ["search", query],
    queryFn: () => SiteApi.game.searchGame(query),
    enabled: query.length > SEARCH_QUERY_LENGTH,
    staleTime: 1000 * 30,
    gcTime: 1000 * 60 * 1,
  });
};
