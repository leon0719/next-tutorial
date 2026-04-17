import { type NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
	const response = NextResponse.next();

	// Security headers
	response.headers.set("X-Frame-Options", "DENY");
	response.headers.set("X-Content-Type-Options", "nosniff");
	response.headers.set("X-DNS-Prefetch-Control", "on");
	response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

	// Log for demo (dev only). Proxy runs before the handler, so it cannot
	// measure total request duration from here.
	if (process.env.NODE_ENV !== "production") {
		console.log(`[proxy] ${request.method} ${request.nextUrl.pathname}`);
	}

	return response;
}

export const config = {
	matcher: [
		// Match all paths except static files, _next, and api
		"/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
	],
};
