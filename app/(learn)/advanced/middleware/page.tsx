import { CodeBlock, DemoBox, DemoPage, Section } from "@/components/demo-page";

export default function MiddlewarePage() {
	return (
		<DemoPage
			title="Middleware"
			description="Middleware runs before a request is completed, letting you modify the response by rewriting, redirecting, or adding headers. It executes on every matched route at the edge."
		>
			<Section
				title="How It Works"
				description="Create a middleware.ts (or .js) file at the root of your project (or inside src/). It runs before every matched request."
			>
				<CodeBlock
					filename="middleware.ts"
					language="tsx"
				>{`import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Clone the response so we can modify headers
  const response = NextResponse.next()

  // Add a custom header
  response.headers.set('x-middleware-ran', 'true')

  // Example: redirect unauthenticated users
  const token = request.cookies.get('session-token')
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return response
}

// Only run middleware on specific paths
export const config = {
  matcher: ['/dashboard/:path*', '/api/:path*'],
}`}</CodeBlock>
			</Section>

			<Section
				title="Matcher Config"
				description="The matcher determines which routes trigger your middleware. Without it, middleware runs on every request."
			>
				<CodeBlock
					filename="middleware.ts"
					language="tsx"
				>{`export const config = {
  matcher: [
    // Match specific paths
    '/dashboard/:path*',
    '/api/:path*',

    // Match all except static files and images
    '/((?!_next/static|_next/image|favicon.ico).*)',

    // Match only specific HTTP methods (Next.js 16+)
    { source: '/api/:path*', methods: ['POST', 'PUT'] },
  ],
}`}</CodeBlock>
			</Section>

			<Section title="Common Use Cases">
				<div className="grid gap-3 sm:grid-cols-2">
					<DemoBox title="Authentication Checks">
						<p className="text-sm text-muted-foreground">
							Verify tokens or session cookies before allowing access to
							protected routes. Redirect to login if unauthenticated.
						</p>
					</DemoBox>
					<DemoBox title="Geo-Routing">
						<p className="text-sm text-muted-foreground">
							Read request.geo to detect the user&apos;s country and rewrite to
							region-specific content or redirect to localized domains.
						</p>
					</DemoBox>
					<DemoBox title="A/B Testing">
						<p className="text-sm text-muted-foreground">
							Assign users to experiment groups via cookies, then rewrite to
							different page variants without the user seeing a different URL.
						</p>
					</DemoBox>
					<DemoBox title="Rate Limiting">
						<p className="text-sm text-muted-foreground">
							Track request counts per IP using edge-compatible stores and
							return 429 responses when limits are exceeded.
						</p>
					</DemoBox>
				</div>
			</Section>

			<Section title="Rewrites and Redirects">
				<CodeBlock
					filename="middleware.ts"
					language="tsx"
				>{`import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Rewrite: user sees /blog but gets /news content
  if (pathname.startsWith('/blog')) {
    return NextResponse.rewrite(new URL('/news' + pathname.slice(5), request.url))
  }

  // Redirect: 301 permanent redirect
  if (pathname === '/old-page') {
    return NextResponse.redirect(new URL('/new-page', request.url), 301)
  }

  return NextResponse.next()
}`}</CodeBlock>
			</Section>

			<Section title="Next.js 16: proxy.ts">
				<DemoBox title="New in Next.js 16">
					<p className="text-sm text-muted-foreground">
						Next.js 16 introduces{" "}
						<code className="text-xs bg-muted px-1 py-0.5 rounded">
							proxy.ts
						</code>{" "}
						as a complementary approach for certain use cases that were
						previously handled by middleware, such as proxying API requests or
						rewriting to external services. Middleware still works and is the
						right choice for auth checks, header modifications, and redirects.
						Check the Next.js docs for guidance on when to use each.
					</p>
				</DemoBox>
			</Section>

			<Section title="Key Points">
				<div className="grid gap-3 sm:grid-cols-2">
					<DemoBox title="Runs at the Edge">
						<p className="text-sm text-muted-foreground">
							Middleware uses the Edge Runtime by default. You cannot use
							Node.js-only APIs like fs or native modules.
						</p>
					</DemoBox>
					<DemoBox title="One Middleware File">
						<p className="text-sm text-muted-foreground">
							There is only one middleware.ts per project. Use the matcher
							config or conditional logic inside the function to handle
							different routes.
						</p>
					</DemoBox>
				</div>
			</Section>
		</DemoPage>
	);
}
