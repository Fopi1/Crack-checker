import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

export async function GET() {
  const cards = prisma.card.findMany();

  return NextResponse.json(cards);
}
