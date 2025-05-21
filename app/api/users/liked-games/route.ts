"use server";
import { getLikedGames, jsonError, jsonResponse } from "@/lib/utils";

export async function GET() {
  try {
    const likedGames = await getLikedGames();
    return jsonResponse({ data: likedGames });
  } catch (error) {
    console.error("Failed to fetch liked games:", error);
    return jsonError();
  }
}
