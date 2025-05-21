import axios from "axios";

import { SteamResponse } from "@/types/lib";

import { getAccessToken } from "./getAccessToken";
import { parseSteamQuery } from "./parseSteamQuery";
import { SteamQueryProps } from "@/schemas/steam";

export const fetchSteamAPIData = async (
  query?: Partial<SteamQueryProps>,
): Promise<SteamResponse> => {
  query = query || {};
  const queryParams = await parseSteamQuery(query);
  try {
    const accessToken = await getAccessToken();
    if (!accessToken) {
      console.error("Failed get access token");
      throw new Error("Failed to get access token");
    }
    const { data } = await axios.get<SteamResponse>(
      `https://api.steampowered.com/IStoreService/GetAppList/v1/?access_token=${accessToken}${queryParams}`,
    );
    return data;
  } catch (error) {
    console.error("Failed fetch games", error);
    throw error;
  }
};
