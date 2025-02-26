import { NextRequest } from "next/server";

export const getUserIP = (req: NextRequest) => {
  const forwardedFor = req.headers.get("x-forwarded-for");
  const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "unknown";
  return ip;
};
