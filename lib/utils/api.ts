import { NextResponse } from "next/server";

import { StatusCodeType } from "@/types/api";
import { ApiFormError } from "@/types/form";

export const responseApiFormError = <T extends Record<string, unknown>>({
  field,
  error,
  status,
}: ApiFormError<T>) => NextResponse.json({ field, error }, { status });

export const getApiParams = <
  T extends Record<string, string> = Record<string, string>,
>(
  searchParams: URLSearchParams,
): T => {
  const result: Record<string, string> = {};
  for (const [key, value] of searchParams.entries()) {
    result[key] = value;
  }

  return result as T;
};

export const jsonResponse = <T>({
  data,
  status = 200,
}: {
  data?: T;
  status?: StatusCodeType;
} = {}) => {
  return NextResponse.json({ success: true, data }, { status });
};

export const jsonError = ({
  message = "Internal server error",
  status = 500,
}: {
  message?: string;
  status?: StatusCodeType;
} = {}) => {
  return NextResponse.json({ success: false, error: message }, { status });
};
