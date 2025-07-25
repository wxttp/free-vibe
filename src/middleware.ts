import { NextResponse } from "next/server";
import { getSession } from "next-auth/react";
import type { NextFetchEvent, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

console.log("middleware Hit!");
export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  if (token && req.nextUrl.pathname.startsWith("/auth")) {
    console.log("Already login cannot go to Auth Page");
    return NextResponse.redirect(new URL("/home/libraly", req.url));
  }
  if (token) {
    return NextResponse.next();
  }
  return NextResponse.redirect(new URL("/auth", req.url));
}

// export async function middleware(req: NextRequest, event: NextFetchEvent) {
//   const requestForNextAuth = {
//     headers: {
//       cookie: req.headers.get("cookie"),
//     },
//   };

//   const session = await getSession({ req: requestForNextAuth });
//   if (session && req.nextUrl.pathname.startsWith("/auth")) {
//     console.log("Already login cannot go to Auth Page");
//     return NextResponse.redirect(new URL("/home/libraly", req.url));
//   }
//   if (session) {
//     return NextResponse.next();
//   }
//   return NextResponse.redirect(new URL("/auth", req.url));
// }
export const config = {
  matcher: ["/home/:path*"],
};
