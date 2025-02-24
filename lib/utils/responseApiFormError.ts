import { NextResponse } from "next/server";

import { ApiFormError } from "@/types/form";

export const responseApiFormError = <T extends Record<string, unknown>>({
  field,
  error,
  status,
}: ApiFormError<T>) => NextResponse.json({ field, error }, { status });
