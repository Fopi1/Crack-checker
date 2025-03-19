"use server";

import { cookies } from "next/headers";

export const removeCookie = async (cookie: string) => {
  const cookieStore = await cookies();
  cookieStore.delete(cookie);
};

export const setLaxCookie = async (name: string, token: string) => {
  const cookieStore = await cookies();
  cookieStore.set(name, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 15 * 60,
  });
};
