import { NextRequest, NextResponse } from "next/server";

import createMiddleware from "next-intl/middleware";

import { routing } from "./i18n/routing";
import { isAuthenticated } from "./lib/auth";

const protectedRoutes = [
  "/home",
  "/change-password",
  "/profile-update",
  "/profile",
];

const publicRootPages = ["/", ...routing.locales.map((loc) => `/${loc}`)];

export default async function middleware(request: NextRequest) {
  const withI18nMiddleware = createMiddleware(routing);

  const pathname = request.nextUrl.pathname;

  const loggedIn = await isAuthenticated();

  const isOnPublicRoot = publicRootPages.includes(pathname);
  if (loggedIn && isOnPublicRoot) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  let pathnameWithoutLocale = pathname;
  for (const locale of routing.locales) {
    if (pathname.startsWith(`/${locale}/`)) {
      pathnameWithoutLocale = pathname.substring(`/${locale}`.length);
      break;
    } else if (pathname === `/${locale}`) {
      pathnameWithoutLocale = "/";
      break;
    }
  }

  const isProtected = protectedRoutes.some((path) =>
    pathnameWithoutLocale.startsWith(path),
  );

  if (!loggedIn && isProtected) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return withI18nMiddleware(request);
}

// Your matcher remains the same
export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
