"use server";

import { NextRequest } from "next/server";

import { ApiHeaders } from "@/constants";
import { syncGames } from "@/lib";
import { jsonError, jsonResponse } from "@/lib/utils";

export async function POST(req: NextRequest) {
  const validKey = process.env.API_KEY;
  if (!validKey) {
    return jsonError({ message: "API key is not set", status: 500 });
  }
  const authHeader = req.headers.get(ApiHeaders.API_KEY);

  if (authHeader !== validKey) {
    return jsonError({ message: "Unathorized access to API", status: 401 });
  }

  try {
    await syncGames();
    return jsonResponse();
  } catch (error) {
    console.error("Failed sync games", error);
    return jsonError({ message: "Failed sync games" });
  }
}
