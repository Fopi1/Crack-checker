import { NextAuthConfig } from "next-auth";

export const authCookies: Partial<NextAuthConfig["cookies"]> = {
  sessionToken: {
    name: "auth_token",
    options: {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      secure: process.env.NODE_ENV === "production",
    },
  },
  csrfToken: {
    name: "csrf_token",
    options: {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      secure: process.env.NODE_ENV === "production",
    },
  },
  callbackUrl: {
    name: "callback_token",
    options: {
      sameSite: "lax",
      path: "/",
      secure: process.env.NODE_ENV === "production",
    },
  },
};
