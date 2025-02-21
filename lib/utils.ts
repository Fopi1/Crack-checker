import axios from "axios";
import { ClassValue, clsx } from "clsx";
import { NextResponse } from "next/server";
import { twMerge } from "tailwind-merge";

import { ApiFormError } from "@/types/form";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const setLaxCookie = (
  response: NextResponse,
  name: string,
  token: string
) => {
  response.cookies.set(name, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 15 * 60,
  });
};

export const getApiError = (error: unknown) => {
  const errorResponse = axios.isAxiosError(error) ? error.response?.data : null;
  return {
    errorField: errorResponse.field || "root",
    errorMessage: errorResponse.error || "Unexpected error. Try again later.",
  };
};

export const responseApiFormError = <T extends Record<string, unknown>>({
  field,
  error,
  status,
}: ApiFormError<T>) => NextResponse.json({ field, error }, { status });

export const getParams = (searchParams: URLSearchParams) => {
  const result: Record<string, string> = {};
  for (const [key, value] of searchParams.entries()) {
    result[key] = value;
  }

  return result;
};
