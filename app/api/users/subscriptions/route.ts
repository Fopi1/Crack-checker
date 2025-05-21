"use server";

import { getSubscriptions, jsonError, jsonResponse } from "@/lib/utils";

export async function GET() {
  try {
    const subscriptions = await getSubscriptions();
    return jsonResponse({ data: subscriptions });
  } catch (error) {
    console.error("Failed to fetch liked games:", error);
    return jsonError();
  }
}
