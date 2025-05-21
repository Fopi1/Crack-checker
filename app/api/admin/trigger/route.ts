"use server";
import { NextRequest } from "next/server";

import { ApiHeaders, TriggerSchemaByPath } from "@/constants";
import { checkIsAdmin } from "@/lib/auth";
import { jsonError, jsonResponse } from "@/lib/utils";
import axios from "axios";

export async function POST(req: NextRequest) {
  console.log("Triggered");
  const apiKey = process.env.API_KEY;
  const siteUrl = process.env.BASE_URL;
  const isAdmin = await checkIsAdmin();
  if (!isAdmin) {
    console.error("Not enough rights");
    return jsonError({ message: "Not enough rights", status: 403 });
  }
  if (!apiKey || !siteUrl) {
    console.error("Missing config");
    return jsonError({ message: "Missing config" });
  }
  const { path, data } = await req.json();
  const schema = TriggerSchemaByPath[path];
  if (!schema) return jsonError({ message: "Unknown path", status: 400 });
  const result = schema.safeParse(data);
  if (!result.success) {
    return jsonError({ message: "Validation failed", status: 422 });
  }
  console.log("Data from client: ", result.data);
  const fullUrl = `${siteUrl}${process.env.NEXT_PUBLIC_SITE_API_URL}${path}`;
  if (!path) return jsonError({ message: "Missing path" });
  console.log("Triggering path: ", fullUrl);
  try {
    await axios.post(
      fullUrl,
      { data: result.data },
      {
        headers: {
          [ApiHeaders.API_KEY]: apiKey,
        },
      },
    );
    return jsonResponse({ data: "Triggered" });
  } catch (error) {
    console.error("Trigger failed", error);
    return jsonError({ message: `Trigger failed: ${error}` });
  }
}
