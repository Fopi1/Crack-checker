"use server";
import { RedisPrefixes } from "@/constants";
import { redis } from "../redis";

export const getSteamLastAppId = async () => {
  return (await redis.get(RedisPrefixes.LAST_APP_ID)) || null;
};
