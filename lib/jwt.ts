"use server";

import { jwtVerify, SignJWT } from "jose";

import { JWTToken } from "@/types/jwt";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

export const generateAccessToken = async (
  userId: number,
  userName: string,
  userEmail: string
) => {
  try {
    const secret = new TextEncoder().encode(JWT_SECRET);
    const expirationDate = 15 * 60 * 1500;

    const token = await new SignJWT({
      id: userId,
      name: userName,
      email: userEmail,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("15m")
      .sign(secret);

    return { token, expirationDate };
  } catch (error) {
    console.error("Token generation error:", error);
    throw error;
  }
};

export const verifyAccessToken = async (token: string) => {
  try {
    const secret = new TextEncoder().encode(JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    return payload as JWTToken;
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
};
