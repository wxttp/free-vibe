import { NextResponse } from "next/server";
import { getSession } from "next-auth/react";
import type { NextFetchEvent, NextRequest } from "next/server";

export async function middleware(req: NextRequest, event: NextFetchEvent) {
  const requestForNextAuth = {
    headers: {
      cookie: req.headers.get("cookie"),
    },
  };
  const session = await getSession({ req: requestForNextAuth });
  if (session) {
    console.log(session);
    return NextResponse.next();
  } else {
    return NextResponse.redirect(new URL("/auth", req.url));
  }
}
export const config = {
  // matcher: ['/api/:path*', '/song/:path*', '/playlist/:path*'],
  matcher: ["/Test/:path*"],
};
