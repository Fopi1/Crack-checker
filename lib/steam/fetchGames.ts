import axios from "axios";

import { SteamQueryProps, SteamResponse } from "@/types/lib";

import { getAccessToken } from "./getAccessToken";

export const fetchSteamGames = async (query?: Partial<SteamQueryProps>) => {
  query = query || {};
  if (query.max_results && Number(query.max_results) > 50000)
    throw new Error("Max result cant be higher than 50K");

  let queryParams = "";
  for (const [key, value] of Object.entries(query)) {
    if (value !== null || value !== undefined) {
      queryParams = `${queryParams}&${key}=${value}`;
    }
  }
  try {
    const accessToken = await getAccessToken();
    if (!accessToken) {
      console.error("Failed get access token");
      return [];
    }
    const { data } = await axios.get<SteamResponse>(
      `https://api.steampowered.com/IStoreService/GetAppList/v1/?access_token=${accessToken}${queryParams}`
    );
    return data;
  } catch (error) {
    console.error("Failed fetch games", error);
    throw error;
  }
};
