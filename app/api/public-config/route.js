import { NextResponse } from "next/server";
import { getPublicRuntimeConfig } from "@/lib/runtime-config";

export async function GET() {
  return NextResponse.json(getPublicRuntimeConfig());
}
