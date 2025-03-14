export enum CookieToken {
  AUTH_TOKEN = "crack_token",
}

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
