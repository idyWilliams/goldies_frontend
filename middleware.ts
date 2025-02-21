import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_TOKEN_NAME, USER_TOKEN_NAME } from "./utils/constants";

const userAuthRoutes = [
  "/sign-in",
  "/sign-up",
  "/reset_password",
  "/forgot-password",
];
const userProtectedRoutes = [
  "/billing",
  "/saved-items",
  "/my-orders",
  "/my-account",
];

const adminAuthRoutes = [
  "/admin-signup",
  "/admin-signin",
  "/admin-reset-password",
  "/admin-forget-password",
];

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const userToken = cookies().get(USER_TOKEN_NAME)?.value;
  const adminToken = cookies().get(ADMIN_TOKEN_NAME)?.value;

  console.log("from middleware>>", {
    userToken,
    adminToken,
  });

  const isAdminAuthRoute = adminAuthRoutes.includes(pathname);
  const isAdminProtectedRoute = pathname.startsWith("/admin/");

  const isUserAuthRoute = userAuthRoutes.includes(pathname);
  const isUserProtectedRoute = userProtectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  // Admin route handling
  if (isAdminProtectedRoute) {
    if (!adminToken) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin-signin";
      return NextResponse.redirect(url);
    }
  } else if (isAdminAuthRoute) {
    if (adminToken) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin";
      return NextResponse.redirect(url);
    }
  }

  // User route handling
  if (isUserProtectedRoute) {
    if (!userToken) {
      const url = request.nextUrl.clone();
      url.pathname = "/sign-in";
      return NextResponse.redirect(url);
    }
  } else if (isUserAuthRoute) {
    if (userToken) {
      const url = request.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
