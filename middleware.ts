import { NextRequest, NextResponse } from "next/server";

import { baseURLHeader } from "./models/headers";

export function middleware(request: NextRequest) {
  const headers = new Headers(request.headers);
  headers.set(baseURLHeader, request.nextUrl.origin);

  return NextResponse.next({ headers });
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
