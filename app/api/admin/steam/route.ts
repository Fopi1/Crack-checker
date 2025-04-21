import { NextRequest } from "next/server";

import { fetchSteamGames } from "@/lib/steam/fetchGames";
import { getApiParams, jsonError, jsonResponse } from "@/lib/utils";

export async function GET(req: NextRequest) {
  const query = getApiParams(req.nextUrl.searchParams);
  try {
    const response = await fetchSteamGames(query);
    return jsonResponse();
  } catch (error) {
    console.error("Steam error", error);
    return jsonError();
  }
}
