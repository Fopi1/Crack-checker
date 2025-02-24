"use server";

import { cookies } from "next/headers";

export const setLaxCookie = (name: string, token: string) => {
  cookies().set(name, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 15 * 60,
  });
};
