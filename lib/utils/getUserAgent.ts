import { NextRequest } from "next/server";

export const getUserAgent = (req: NextRequest) => {
  const userAgent = req.headers.get("user-agent") || "unknown-user-agent";
  return userAgent;
};
