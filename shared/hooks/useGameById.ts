import { SiteApi } from "@/services/apiClient";
import { FullGame } from "@/types/api";
import { useQuery } from "@tanstack/react-query";

export const useGameById = (initialData: FullGame) => {
  const id = initialData.id;
  return useQuery({
    queryKey: ["game", id],
    queryFn: () => SiteApi.game.getGameById(id),
    initialData: initialData,
  });
};
