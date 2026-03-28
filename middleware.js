import { NextResponse } from "next/server";

export function middleware(request) {
  const host = request.headers.get("host") || "";

  if (host.includes("workers.dev")) {
    const url = new URL(request.url);
    url.host = "scviking2021.com";
    url.protocol = "https:";
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}