"use server";

import { checkIsAdmin } from "@/lib/auth";
import { notifyAboutCrackedGames } from "@/lib/mailer";
import { jsonError, jsonResponse } from "@/lib/utils";

export async function POST() {
  const isAdmin = await checkIsAdmin();
  if (!isAdmin) {
    return jsonError({ message: "Not enough rights", status: 403 });
  }
  try {
    await notifyAboutCrackedGames();
    return jsonResponse({ data: "Nice notify" });
  } catch (error) {
    console.error("error when notified", error);
    return jsonError();
  }
}
