import { CodeBlock, DemoBox, DemoPage, Section } from "@/components/demo-page";
import { Badge } from "@/components/ui/badge";

export default function AuthPage() {
	return (
		<DemoPage
			title="Authentication"
			description="Authentication patterns in Next.js cover session management, route protection, and integration with popular auth libraries."
		>
			<Section title="Session Management">
				<div className="grid gap-3 sm:grid-cols-2">
					<DemoBox title="JWT Sessions">
						<p className="text-sm text-muted-foreground">
							Stateless tokens stored in cookies. No database lookup needed on
							each request. Fast but harder to revoke. Good for simple apps and
							edge deployments.
						</p>
					</DemoBox>
					<DemoBox title="Database Sessions">
						<p className="text-sm text-muted-foreground">
							Session ID stored in a cookie, session data in a database. Easy to
							revoke and manage. Requires a database query per request. Better
							for apps needing strict session control.
						</p>
					</DemoBox>
				</div>
			</Section>

			<Section
				title="Protecting Routes"
				description="There are two main approaches to protect routes from unauthenticated users."
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

			<Section title="authInterrupts (Next.js 16)">
				<p className="text-sm text-muted-foreground mb-3">
					Next.js 16 introduces authInterrupts, a built-in way to handle
					authorization errors with dedicated error boundaries. Enable it in
					your config, then create forbidden.tsx and unauthorized.tsx files.
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

			<Section title="Popular Libraries">
				<div className="grid gap-3 sm:grid-cols-3">
					<DemoBox title="Auth.js (NextAuth)">
						<div className="space-y-1">
							<Badge variant="secondary" className="text-xs">
								Most Popular
							</Badge>
							<p className="text-sm text-muted-foreground">
								Full-featured auth with OAuth providers, credentials, JWT and
								database sessions. Deep Next.js integration.
							</p>
						</div>
					</DemoBox>
					<DemoBox title="Clerk">
						<div className="space-y-1">
							<Badge variant="outline" className="text-xs">
								Managed
							</Badge>
							<p className="text-sm text-muted-foreground">
								Hosted auth service with drop-in UI components, user management
								dashboard, and webhook support.
							</p>
						</div>
					</DemoBox>
					<DemoBox title="Lucia">
						<div className="space-y-1">
							<Badge variant="outline" className="text-xs">
								Lightweight
							</Badge>
							<p className="text-sm text-muted-foreground">
								Minimal, session-based auth library. You own the database
								schema. Good for learning and custom setups.
							</p>
						</div>
					</DemoBox>
				</div>
			</Section>

			<Section title="Key Points">
				<div className="grid gap-3 sm:grid-cols-2">
					<DemoBox title="Middleware vs Server Component">
						<p className="text-sm text-muted-foreground">
							Middleware is fast (edge) but limited — good for redirects. Server
							Component checks are more flexible — you can query databases and
							render different UI.
						</p>
					</DemoBox>
					<DemoBox title="Never Trust the Client">
						<p className="text-sm text-muted-foreground">
							Always verify auth on the server. Client-side checks (hiding UI)
							are for UX only. Server Components and Server Actions must
							independently verify permissions.
						</p>
					</DemoBox>
				</div>
			</Section>
		</DemoPage>
	);
}
