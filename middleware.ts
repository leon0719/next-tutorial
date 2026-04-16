import { type NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const start = Date.now();
  const response = NextResponse.next();

  // Security headers
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-DNS-Prefetch-Control", "on");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  // Request timing
  const duration = Date.now() - start;
  response.headers.set("X-Response-Time", `${duration}ms`);

  // Log for demo
  console.log(`[middleware] ${request.method} ${request.nextUrl.pathname} (${duration}ms)`);

  return response;
}

export const config = {
  matcher: [
    // Match all paths except static files, _next, and api
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
