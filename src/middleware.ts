import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { Role } from "@prisma/client";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAuth = !!token;
    const isPending = token?.role === Role.PENDING;
    const isPendingPage = req.nextUrl.pathname.startsWith("/pending");

    // Redirect PENDING users to pending page
    if (isAuth && isPending && !isPendingPage) {
      return NextResponse.redirect(new URL("/pending", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow access to public pages without authentication
        if (
          req.nextUrl.pathname.startsWith("/login") ||
          req.nextUrl.pathname.startsWith("/signup") ||
          req.nextUrl.pathname === "/"
        ) {
          return true;
        }
        // Require authentication for all other pages
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    // Only protect specific paths that need authentication
    "/pending",
    "/dashboard/:path*",
    "/bulletins/:path*",
    "/settings/:path*",
    "/profile/:path*",
  ],
};
