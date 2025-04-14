import axios from "axios";

import { ApiHeaders, SiteApiRoutes } from "@/constants";
import { jsonError, jsonResponse } from "@/lib/utils";

export async function POST() {
  const apiKey = process.env.SYNC_API_KEY;
  const siteUrl = process.env.BASE_URL;
  if (!apiKey || !siteUrl) {
    return jsonError({ message: "Missing config" });
  }
  try {
    await axios.post(
      `${siteUrl}${process.env.NEXT_PUBLIC_SITE_API_URL}${SiteApiRoutes.SYNC}`,
      null,
      {
        headers: {
          [ApiHeaders.API_KEY]: apiKey,
        },
        withCredentials: true,
      }
    );
    return jsonResponse({ data: "Sync triggered" });
  } catch (error) {
    console.error("Sync failed", error);
    return jsonError({ message: `Sync failed: ${error}` });
  }
}
