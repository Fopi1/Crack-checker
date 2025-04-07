"use server";

import { NextResponse } from "next/server";

import { AnyRequest } from "@/types/lib";
import { Redis } from "@upstash/redis";

import { getUserAgent, getUserIP } from "./utils";

const REDIS_UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

if (!REDIS_UPSTASH_TOKEN || !REDIS_UPSTASH_URL) {
  throw new Error("UPSTASH_REDIS_REST is not defined in environment variables");
}

const redis = new Redis({
  url: REDIS_UPSTASH_URL,
  token: REDIS_UPSTASH_TOKEN,
});

export const rateLimit = async (
  req: AnyRequest,
  keyPrefix: string,
  limit = 10,
  timeWindow = 60
) => {
  const ip = await getUserIP(req);
  const userAgent = await getUserAgent(req);
  const key = ip
    ? `rate_limit:${keyPrefix}:${ip}`
    : `rate_limit:${keyPrefix}:ua:${userAgent}`;

  const current = (await redis.get<number>(key)) ?? 0;

  if (current >= limit) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  await redis.set(key, current + 1, { ex: timeWindow });
  return null;
};
