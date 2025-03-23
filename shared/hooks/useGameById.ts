import { SiteApi } from "@/services/siteApi/apiClient";
import { FullGame } from "@/types/api";
import { useQuery } from "@tanstack/react-query";

export const useGameById = (initialData: FullGame) => {
  const id = initialData.id;
  return useQuery({
    queryKey: ["game", id],
    queryFn: () => SiteApi.games.getGameById(id),
    initialData: initialData,
  });
};
