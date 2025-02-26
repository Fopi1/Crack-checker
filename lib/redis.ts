import { NextRequest, NextResponse } from "next/server";

import { Redis } from "@upstash/redis";

import { getUserAgent, getUserIP } from "./utils";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export async function rateLimit(req: NextRequest, limit = 5, timeWindow = 60) {
  const ip = getUserIP(req);
  const userAgent = getUserAgent(req);
  const key = ip ? `rate_limit:${ip}` : `rate_limit:ua:${userAgent}`;

  const current = (await redis.get<number>(key)) ?? 0;

  if (current >= limit) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  await redis.set(key, current + 1, { ex: timeWindow });
  return null;
}
