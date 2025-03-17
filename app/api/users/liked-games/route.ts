"use server";

import { NextResponse } from 'next/server';

import { getLikedGames } from '@/lib/utils';

export async function GET() {
  try {
    const likedGames = await getLikedGames();
    if (!likedGames) {
      return NextResponse.json(
        { error: "User not authenticated or not found" },
        { status: 401 }
      );
    }
    return NextResponse.json(likedGames);
  } catch (error) {
    console.error("Failed to fetch liked games:", error);
    return NextResponse.json(
      { error: "Failed to fetch liked games" },
      { status: 500 }
    );
  }
}
