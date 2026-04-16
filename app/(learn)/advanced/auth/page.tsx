import { getTranslations } from "next-intl/server";
import { CodeBlock, DemoBox, DemoPage, Section } from "@/components/demo-page";
import { Badge } from "@/components/ui/badge";

export default async function AuthPage() {
	const t = await getTranslations("advanced.auth");
	return (
		<DemoPage title={t("title")} description={t("description")}>
			<Section title={t("sessionManagementTitle")}>
				<div className="grid gap-3 sm:grid-cols-2">
					<DemoBox title={t("jwtSessionsTitle")}>
						<p className="text-sm text-muted-foreground">
							{t("jwtSessionsDesc")}
						</p>
					</DemoBox>
					<DemoBox title={t("dbSessionsTitle")}>
						<p className="text-sm text-muted-foreground">
							{t("dbSessionsDesc")}
						</p>
					</DemoBox>
				</div>
			</Section>

			<Section
				title={t("protectingRoutesTitle")}
				description={t("protectingRoutesDescription")}
			>
				<CodeBlock
					filename="app/dashboard/page.tsx"
					language="tsx"
				>{`// Approach 1: Server Component check
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { verifySession } from '@/lib/auth'

export default async function DashboardPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get('session-token')?.value

  if (!token) {
    redirect('/login')
  }

  const session = await verifySession(token)
  if (!session) {
    redirect('/login')
  }

  return <div>Welcome, {session.user.name}</div>
}`}</CodeBlock>

				<CodeBlock
					filename="middleware.ts"
					language="tsx"
				>{`// Approach 2: Middleware check (runs before the page)
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('session-token')

  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*'],
}`}</CodeBlock>
			</Section>

			<Section title={t("authInterruptsTitle")}>
				<p className="text-sm text-muted-foreground mb-3">
					{t("authInterruptsDesc")}
				</p>
				<CodeBlock
					filename="next.config.ts"
					language="tsx"
				>{`const nextConfig = {
  experimental: {
    authInterrupts: true,
  },
}`}</CodeBlock>
				<CodeBlock
					filename="app/dashboard/forbidden.tsx"
					language="tsx"
				>{`// Shown when forbidden() is called — user is authenticated but lacks permission
export default function Forbidden() {
  return (
    <div>
      <h2>Access Denied</h2>
      <p>You do not have permission to view this page.</p>
    </div>
  )
}`}</CodeBlock>
				<CodeBlock
					filename="app/dashboard/unauthorized.tsx"
					language="tsx"
				>{`// Shown when unauthorized() is called — user is not authenticated
export default function Unauthorized() {
  return (
    <div>
      <h2>Sign In Required</h2>
      <p>Please sign in to access this page.</p>
      <a href="/login">Go to Login</a>
    </div>
  )
}`}</CodeBlock>
			</Section>

			<Section title={t("popularLibrariesTitle")}>
				<div className="grid gap-3 sm:grid-cols-3">
					<DemoBox title={t("authJsTitle")}>
						<div className="space-y-1">
							<Badge variant="secondary" className="text-xs">
								{t("authJsBadge")}
							</Badge>
							<p className="text-sm text-muted-foreground">{t("authJsDesc")}</p>
						</div>
					</DemoBox>
					<DemoBox title={t("clerkTitle")}>
						<div className="space-y-1">
							<Badge variant="outline" className="text-xs">
								{t("clerkBadge")}
							</Badge>
							<p className="text-sm text-muted-foreground">{t("clerkDesc")}</p>
						</div>
					</DemoBox>
					<DemoBox title={t("luciaTitle")}>
						<div className="space-y-1">
							<Badge variant="outline" className="text-xs">
								{t("luciaBadge")}
							</Badge>
							<p className="text-sm text-muted-foreground">{t("luciaDesc")}</p>
						</div>
					</DemoBox>
				</div>
			</Section>

			<Section title={t("keyPointsTitle")}>
				<div className="grid gap-3 sm:grid-cols-2">
					<DemoBox title={t("middlewareVsServerTitle")}>
						<p className="text-sm text-muted-foreground">
							{t("middlewareVsServerDesc")}
						</p>
					</DemoBox>
					<DemoBox title={t("neverTrustClientTitle")}>
						<p className="text-sm text-muted-foreground">
							{t("neverTrustClientDesc")}
						</p>
					</DemoBox>
				</div>
			</Section>
		</DemoPage>
	);
}
