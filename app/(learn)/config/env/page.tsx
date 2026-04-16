import {
	CodeBlock,
	DemoBox,
	DemoPage,
	FileTree,
	Section,
} from "@/components/demo-page";

export default async function EnvVariablesPage() {
	return (
		<DemoPage
			title="Environment Variables"
			description="Next.js has built-in support for environment variables via .env files. Learn how to safely use them on the server and client."
		>
			<Section
				title="The .env File Hierarchy"
				description="Next.js loads environment variables from multiple files in a specific order. Later files override earlier ones."
			>
				<FileTree>{`.env                  # Loaded in all environments
.env.local            # Loaded in all environments (git-ignored)
.env.development      # Loaded in dev only
.env.development.local# Loaded in dev only (git-ignored)
.env.production       # Loaded in production only
.env.production.local # Loaded in production only (git-ignored)`}</FileTree>
				<DemoBox title="Loading Priority (highest to lowest)">
					<ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
						<li>
							<code>.env.development.local</code> or{" "}
							<code>.env.production.local</code>
						</li>
						<li>
							<code>.env.local</code> (not loaded in test environment)
						</li>
						<li>
							<code>.env.development</code> or <code>.env.production</code>
						</li>
						<li>
							<code>.env</code>
						</li>
					</ol>
				</DemoBox>
			</Section>

			<Section
				title="Server-Only Variables"
				description="By default, environment variables are only available on the server. They are never sent to the browser."
			>
				<CodeBlock
					filename=".env.local"
					language="bash"
				>{`# Server-only secrets — NEVER exposed to the browser
DATABASE_URL="postgresql://user:pass@localhost:5432/mydb"
API_SECRET_KEY="sk-super-secret-key-12345"
STRIPE_SECRET_KEY="sk_live_abc123"`}</CodeBlock>
				<CodeBlock
					filename="app/api/data/route.ts"
					language="typescript"
				>{`// Server-only: process.env is fully available
export async function GET() {
  const dbUrl = process.env.DATABASE_URL;
  const apiKey = process.env.API_SECRET_KEY;

  // These values are available because API routes run on the server
  return Response.json({ status: "connected" });
}`}</CodeBlock>
			</Section>

			<Section
				title="Client-Side Variables with NEXT_PUBLIC_"
				description="To expose a variable to the browser, prefix it with NEXT_PUBLIC_. Next.js inlines these values at build time."
			>
				<CodeBlock
					filename=".env.local"
					language="bash"
				>{`# Exposed to the browser — safe for public values only
NEXT_PUBLIC_API_URL="https://api.example.com"
NEXT_PUBLIC_SITE_NAME="My App"

# Still server-only (no prefix)
SECRET_KEY="do-not-expose-this"`}</CodeBlock>
				<CodeBlock
					filename="components/api-client.tsx"
					language="tsx"
				>{`"use client";

// NEXT_PUBLIC_ variables are inlined at build time
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function ApiClient() {
  // This works in the browser because of the NEXT_PUBLIC_ prefix
  return <p>API: {API_URL}</p>;
}`}</CodeBlock>
			</Section>

			<Section title="Live Example">
				<DemoBox title="Current NODE_ENV Value">
					<div className="space-y-2">
						<p className="text-sm text-muted-foreground">
							This value is read from <code>process.env.NODE_ENV</code> at
							render time on the server:
						</p>
						<p className="font-mono text-lg font-semibold">
							{process.env.NODE_ENV}
						</p>
						<p className="text-xs text-muted-foreground">
							NODE_ENV is automatically set by Next.js: &quot;development&quot;
							when running <code>next dev</code>, &quot;production&quot; when
							running <code>next build &amp;&amp; next start</code>.
						</p>
					</div>
				</DemoBox>
			</Section>

			<Section title="Security Rules">
				<div className="grid gap-3 sm:grid-cols-2">
					<DemoBox title="Never Expose Secrets">
						<p className="text-sm text-muted-foreground">
							Never prefix sensitive values like API keys, database URLs, or
							tokens with <code>NEXT_PUBLIC_</code>. They will be embedded in
							your JavaScript bundle and visible to anyone.
						</p>
					</DemoBox>
					<DemoBox title="Git-Ignore .env.local">
						<p className="text-sm text-muted-foreground">
							Always add <code>.env.local</code> to your <code>.gitignore</code>
							. Commit <code>.env</code> with safe defaults and use{" "}
							<code>.env.local</code> for real secrets during development.
						</p>
					</DemoBox>
					<DemoBox title="Build-Time Inlining">
						<p className="text-sm text-muted-foreground">
							<code>NEXT_PUBLIC_</code> values are replaced at build time, not
							runtime. Changing them requires a rebuild to take effect.
						</p>
					</DemoBox>
					<DemoBox title="Use Server Components">
						<p className="text-sm text-muted-foreground">
							Prefer reading secrets in Server Components or API routes. This
							keeps them entirely off the client and out of the JavaScript
							bundle.
						</p>
					</DemoBox>
				</div>
			</Section>
		</DemoPage>
	);
}
