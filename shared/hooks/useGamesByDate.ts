import { SiteApi } from "@/services/apiClient";
import { useQuery } from "@tanstack/react-query";

export const useGamesByDate = (year: number, monthNumber: number) => {
  return useQuery({
    queryKey: ["calendar", year, monthNumber],
    queryFn: () => SiteApi.game.getGamesByDate({ year, monthNumber }),
  });
};
