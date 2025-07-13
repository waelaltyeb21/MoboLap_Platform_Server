import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const middleware = async (request) => {
  const getCookies = await cookies();
  const token = getCookies.get("token");

  if (!token) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }
  return NextResponse.next();
};

export const config = {
  matcher: ["/", "/dashboard/:path*"],
};
