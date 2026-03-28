import { NextResponse } from "next/server";

const locales = ["ua", "en", "ro", "ru"];
const defaultLocale = "ua";

export function middleware(request) {
  const host = request.headers.get("host") || "";

  if (host.includes("workers.dev")) {
    const url = new URL(request.url);
    url.host = "scviking2021.com";
    url.protocol = "https:";
    return NextResponse.redirect(url, 301);
  }

  const { pathname } = request.nextUrl;

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (!pathnameHasLocale) {
    return NextResponse.redirect(
      new URL(`/${defaultLocale}${pathname}`, request.url),
      301
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|icons|images|Viking|.*\\..*).*)"],
};