import { jwtVerify } from "jose";
import jwt from "jsonwebtoken";

import { JWTToken } from "@/types/jwt";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

export const generateAccessToken = (userId: number, userName: string) => {
  const expirationDate = new Date(Date.now() + 15 * 60 * 1000);
  const token = jwt.sign({ id: userId, name: userName }, JWT_SECRET, {
    expiresIn: "15m",
  });
  return { token, expirationDate };
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
