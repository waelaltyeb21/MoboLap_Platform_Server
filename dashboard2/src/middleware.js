import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const middleware = async (request) => {
  const AppCookies = await cookies();
  const token = AppCookies.get("token");

  console.log("Token From Middleware: ", token);
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
};

export const config = {
  matcher: ["/", "/dashboard/:path*"],
};
