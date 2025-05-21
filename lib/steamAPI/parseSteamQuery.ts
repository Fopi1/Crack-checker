import { getSteamLastAppId } from "../steam";

export const parseSteamQuery = async (query: Record<string, unknown>) => {
  if (query.max_results && Number(query.max_results) > 50000)
    throw new Error("Max result cant be higher than 50K");
  const lastAppId = query.lastAppId ? 0 : await getSteamLastAppId();
  let queryParams = "";
  for (const [key, value] of Object.entries(query)) {
    if (value !== null || value !== undefined) {
      queryParams = `${queryParams}&${key}=${value}`;
    }
  }
  if (lastAppId) {
    queryParams = `${queryParams}&last_appid=${lastAppId}`;
  }
  return queryParams;
};
