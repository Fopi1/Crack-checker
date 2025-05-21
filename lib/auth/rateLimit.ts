"use server";
import { AnyRequest } from "@/types/lib";
import { getUserAgent, getUserIP } from "../utils";
import { NextResponse } from "next/server";

export const rateLimit = async (
  req: AnyRequest,
  keyPrefix: string,
  limit = 10,
  timeWindow = 60,
) => {
  const { redis } = await import("../redis");
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
