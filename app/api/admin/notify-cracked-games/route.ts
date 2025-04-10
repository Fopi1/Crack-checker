"use server";

import { notifyAboutCrackedGames } from "@/lib/mailer";
import { jsonError, jsonResponse } from "@/lib/utils";

export async function POST() {
  try {
    await notifyAboutCrackedGames();
    return jsonResponse({ data: "Nice notify" });
  } catch (error) {
    console.error("error when notified", error);
    return jsonError();
  }
}
