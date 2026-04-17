import { getTranslations } from "next-intl/server";
import { CodeBlock, DemoBox, DemoPage, Section } from "@/components/demo-page";

export default async function ProxyPage() {
	const t = await getTranslations("advanced.proxy");
	return (
		<DemoPage title={t("title")} description={t("description")}>
			<Section
				title={t("renamedFromMiddlewareTitle")}
				description={t("renamedFromMiddlewareDescription")}
			>
				<CodeBlock filename="migration" language="bash">{`# Official codemod
npx @next/codemod@canary middleware-to-proxy .

# Renames middleware.ts → proxy.ts and the exported function from
#   export function middleware(...)
# to
#   export function proxy(...)`}</CodeBlock>
			</Section>

			<Section
				title={t("howItWorksTitle")}
				description={t("howItWorksDescription")}
			>
				<CodeBlock
					filename="proxy.ts"
					language="tsx"
				>{`import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const response = NextResponse.next()

  // Add a custom header
  response.headers.set('x-proxy-ran', 'true')

  // Example: redirect unauthenticated users
  const token = request.cookies.get('session-token')
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return response
}

// Only run proxy on specific paths
export const config = {
  matcher: ['/dashboard/:path*', '/api/:path*'],
}`}</CodeBlock>
			</Section>

			<Section
				title={t("matcherConfigTitle")}
				description={t("matcherConfigDescription")}
			>
				<CodeBlock filename="proxy.ts" language="tsx">{`export const config = {
  matcher: [
    // Match specific paths
    '/dashboard/:path*',
    '/api/:path*',

    // Match all except static files and images
    '/((?!_next/static|_next/image|favicon.ico).*)',

    // Match with has/missing conditions
    {
      source: '/api/:path*',
      has: [{ type: 'header', key: 'authorization' }],
    },
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
					filename="proxy.ts"
					language="tsx"
				>{`import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
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
