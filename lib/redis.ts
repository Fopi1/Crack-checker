import { Redis } from "@upstash/redis";

const REDIS_UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

export const redis = new Redis({
  url: REDIS_UPSTASH_URL,
  token: REDIS_UPSTASH_TOKEN,
});
