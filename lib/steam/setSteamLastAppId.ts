"use server";
import { RedisPrefixes } from "@/constants";
import { redis } from "../redis";

export const setSteamLastAppId = async ({ value }: { value: number }) => {
  await redis.set(RedisPrefixes.LAST_APP_ID, value);
};
