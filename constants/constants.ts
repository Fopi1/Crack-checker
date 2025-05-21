import { SteamQuerySchema } from "@/schemas/steam";
import { AdminApiRoutes } from "./routes";
import { z } from "zod";

export const SEARCH_QUERY_LENGTH = 2;
export const STALE_TIME = 1000 * 60 * 5;

export const CookieToken = {
  AUTH_TOKEN: "crack_token",
} as const;

export const FormFieldsLength = {
  name: {
    minLength: 2,
    maxLength: 20,
  },
  password: {
    minLength: 8,
  },
} as const;

export const RedisPrefixes = {
  LAST_APP_ID: "lastAppId",
  HAVE_MORE_RESULTS: "haveMoreResults",
} as const;

export const RateLimiterPrefixes = {
  LOGIN: "login",
  REGISTER: "register",
  INFO: "info",
  PASSWORD: "password",
} as const;

export const ApiHeaders = {
  API_KEY: "x-api-key",
} as const;

export const TriggerSchemaByPath = {
  [AdminApiRoutes.SYNC]: z.object({}),
  [AdminApiRoutes.NOTIFY_CRACKED_GAMES]: z.object({}),
  [AdminApiRoutes.STEAM_GAMES]: SteamQuerySchema,
};
