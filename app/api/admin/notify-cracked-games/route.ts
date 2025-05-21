"use server";
import { NextRequest } from "next/server";

import { ApiHeaders } from "@/constants";
import { notifyAboutCrackedGames } from "@/lib/mailer";
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
    await notifyAboutCrackedGames();
    return jsonResponse({ data: "Nice notify" });
  } catch (error) {
    console.error("error when notified", error);
    return jsonError();
  }
}
