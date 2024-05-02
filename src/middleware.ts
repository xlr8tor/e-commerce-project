import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(request) {
    const path = request.nextUrl.pathname;
    const isOnLoginPage = request.nextUrl?.pathname.startsWith("/signin");
    const isOnSignUpPage = request.nextUrl?.pathname.startsWith("/signup");
    const isPublicPath =
      path === "/signin" || path === "/signup" || path === "/verifyemail";

    const user = request.nextauth.token;

    if (isPublicPath && user) {
      return NextResponse.redirect(new URL("/", request.nextUrl));
    }

    if ((isOnLoginPage || isOnSignUpPage) && user) {
      return NextResponse.redirect(new URL("/", request.nextUrl));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => true,
    },
    // pages: {
    //   signIn: "/signin",
    // },
  }
);

export const config = {
  matcher: ["/((?!api|static|.*\\..*|_next).*)"],
};
