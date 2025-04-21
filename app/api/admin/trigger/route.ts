"use server";

import { NextRequest } from "next/server";

import { ApiHeaders } from "@/constants";
import { checkIsAdmin } from "@/lib/auth";
import { jsonError, jsonResponse } from "@/lib/utils";

export async function POST(req: NextRequest) {
  const apiKey = process.env.API_KEY;
  const siteUrl = process.env.BASE_URL;
  const isAdmin = await checkIsAdmin();
  if (!isAdmin) {
    return jsonError({ message: "Not enough rights", status: 403 });
  }
  if (!apiKey || !siteUrl) {
    return jsonError({ message: "Missing config" });
  }
  const { path, method, data } = await req.json();
  const queryParams = data
    ? "?" +
      Object.entries(data)
        .map(
          ([key, value]) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
        )
        .join("&")
    : "";

  const fullUrl = `${siteUrl}${process.env.NEXT_PUBLIC_SITE_API_URL}${path}${queryParams}`;
  if (!path) return jsonError({ message: "Missing path" });
  try {
    await fetch(fullUrl, {
      method,
      headers: {
        [ApiHeaders.API_KEY]: apiKey,
      },
    });
    return jsonResponse({ data: "Triggered" });
  } catch (error) {
    console.error("Trigger failed", error);
    return jsonError({ message: `Trigger failed: ${error}` });
  }
}
