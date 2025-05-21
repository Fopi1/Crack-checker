"use server"
import { NextRequest } from "next/server";

import { jsonError, jsonResponse } from "@/lib/utils";
import { fetchSteamAPIData } from "@/lib/steamAPI";
import { saveGamesToDatabase } from "@/lib/steam/saveGamesToDatabase";
import { setSteamLastAppId } from "@/lib/steam";

export async function POST(req: NextRequest) {
  console.log("Getting data from trigger");
  const { data } = await req.json();
  console.log("Data: ", data);
  try {
    console.log("Fetching steam API data");
    const response = await fetchSteamAPIData(data);
    const games = response.response.apps;
    console.log("Games: ", games);
    const lastAppId = response.response.last_appid;
    console.log("Last app id: ", lastAppId);
    console.log("Saving games to database");
    await saveGamesToDatabase(games);
    await setSteamLastAppId({ value: lastAppId });
    return jsonResponse();
  } catch (error) {
    console.error("Steam error", error);
    return jsonError();
  }
}
