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

export const rateLimiterPrefixes = {
  LOGIN: "login",
  REGISTER: "register",
  INFO: "info",
  PASSWORD: "password",
} as const;
