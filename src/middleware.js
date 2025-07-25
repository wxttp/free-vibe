import { NextResponse } from "next/server";
import { getSession } from "next-auth/react";
import { NextFetchEvent, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  if (!token && request.nextUrl.pathname.startsWith("/home")) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }
  if (token && request.nextUrl.pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/home/library", request.url));
  }
  return NextResponse.next();
}
export const config = {
  matcher: ["/home/:path*", "/auth"],
};
