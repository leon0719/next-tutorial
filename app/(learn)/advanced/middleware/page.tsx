import { getTranslations } from "next-intl/server";
import { CodeBlock, DemoBox, DemoPage, Section } from "@/components/demo-page";

export default async function MiddlewarePage() {
	const t = await getTranslations("advanced.middleware");
	return (
		<DemoPage title={t("title")} description={t("description")}>
			<Section
				title={t("howItWorksTitle")}
				description={t("howItWorksDescription")}
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
				title={t("matcherConfigTitle")}
				description={t("matcherConfigDescription")}
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

			<Section title={t("commonUseCasesTitle")}>
				<div className="grid gap-3 sm:grid-cols-2">
					<DemoBox title={t("authChecksTitle")}>
						<p className="text-sm text-muted-foreground">
							{t("authChecksDesc")}
						</p>
					</DemoBox>
					<DemoBox title={t("geoRoutingTitle")}>
						<p className="text-sm text-muted-foreground">
							{t("geoRoutingDesc")}
						</p>
					</DemoBox>
					<DemoBox title={t("abTestingTitle")}>
						<p className="text-sm text-muted-foreground">
							{t("abTestingDesc")}
						</p>
					</DemoBox>
					<DemoBox title={t("rateLimitingTitle")}>
						<p className="text-sm text-muted-foreground">
							{t("rateLimitingDesc")}
						</p>
					</DemoBox>
				</div>
			</Section>

			<Section title={t("rewritesRedirectsTitle")}>
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

			<Section title={t("proxyTitle")}>
				<DemoBox title={t("proxyBoxTitle")}>
					<p className="text-sm text-muted-foreground">{t("proxyBoxDesc")}</p>
				</DemoBox>
			</Section>

			<Section title={t("keyPointsTitle")}>
				<div className="grid gap-3 sm:grid-cols-2">
					<DemoBox title={t("runsAtEdgeTitle")}>
						<p className="text-sm text-muted-foreground">
							{t("runsAtEdgeDesc")}
						</p>
					</DemoBox>
					<DemoBox title={t("oneFileTitle")}>
						<p className="text-sm text-muted-foreground">{t("oneFileDesc")}</p>
					</DemoBox>
				</div>
			</Section>
		</DemoPage>
	);
}
