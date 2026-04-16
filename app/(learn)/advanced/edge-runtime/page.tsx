import { CodeBlock, DemoBox, DemoPage, Section } from "@/components/demo-page";
import { Badge } from "@/components/ui/badge";

export default function EdgeRuntimePage() {
	return (
		<DemoPage
			title="Edge Runtime"
			description="The Edge Runtime is a lightweight subset of Node.js APIs designed for low-latency responses. Routes and middleware can opt into it for faster cold starts and global distribution."
		>
			<Section title="Opting Into Edge Runtime">
				<p className="text-sm text-muted-foreground mb-3">
					Export a runtime config from any route segment to switch from the
					default Node.js runtime to Edge.
				</p>
				<CodeBlock
					filename="app/api/hello/route.ts"
					language="tsx"
				>{`// This API route runs at the edge
export const runtime = 'edge'

export async function GET() {
  return Response.json({
    message: 'Hello from the edge!',
    region: process.env.VERCEL_REGION || 'unknown',
  })
}`}</CodeBlock>
				<CodeBlock
					filename="app/fast/page.tsx"
					language="tsx"
				>{`// Pages can also run at the edge
export const runtime = 'edge'

export default function FastPage() {
  return <div>This page is rendered at the nearest edge location.</div>
}`}</CodeBlock>
			</Section>

			<Section title="Edge vs Node.js Runtime">
				<div className="grid gap-3 sm:grid-cols-2">
					<DemoBox title="Edge Runtime">
						<div className="space-y-2">
							<Badge variant="secondary" className="text-xs">
								Lightweight
							</Badge>
							<ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
								<li>Sub-millisecond cold starts</li>
								<li>Globally distributed (runs near the user)</li>
								<li>Web standard APIs (fetch, Response, URL, crypto)</li>
								<li>Limited to ~4MB code size</li>
								<li>No native Node.js modules</li>
							</ul>
						</div>
					</DemoBox>
					<DemoBox title="Node.js Runtime (Default)">
						<div className="space-y-2">
							<Badge variant="outline" className="text-xs">
								Full-Featured
							</Badge>
							<ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
								<li>Full Node.js API access (fs, path, etc.)</li>
								<li>All npm packages work</li>
								<li>No code size limit</li>
								<li>Runs in a single region by default</li>
								<li>Slower cold starts</li>
							</ul>
						</div>
					</DemoBox>
				</div>
			</Section>

			<Section title="What You Can Use at the Edge">
				<CodeBlock
					filename="app/api/edge-example/route.ts"
					language="tsx"
				>{`export const runtime = 'edge'

export async function GET(request: Request) {
  // Web standard APIs work fine
  const url = new URL(request.url)
  const param = url.searchParams.get('name') || 'World'

  // fetch works (call external APIs)
  const data = await fetch('https://api.example.com/data')

  // crypto is available
  const id = crypto.randomUUID()

  // TextEncoder/TextDecoder
  const encoder = new TextEncoder()
  const bytes = encoder.encode('hello')

  // Headers, Request, Response
  return new Response(JSON.stringify({ id, param, bytes: bytes.length }), {
    headers: { 'Content-Type': 'application/json' },
  })
}`}</CodeBlock>
			</Section>

			<Section title="Limitations">
				<DemoBox title="What You Cannot Use">
					<ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
						<li>
							<code className="text-xs bg-muted px-1 py-0.5 rounded">fs</code> —
							no filesystem access
						</li>
						<li>
							<code className="text-xs bg-muted px-1 py-0.5 rounded">
								child_process
							</code>{" "}
							— cannot spawn processes
						</li>
						<li>
							Native Node.js modules (e.g., bcrypt) — use Web Crypto or
							edge-compatible alternatives
						</li>
						<li>Some npm packages that depend on Node.js internals</li>
						<li>
							Long-running computations — edge functions have execution time
							limits
						</li>
					</ul>
				</DemoBox>
			</Section>

			<Section title="Use Cases">
				<div className="grid gap-3 sm:grid-cols-2">
					<DemoBox title="Low-Latency APIs">
						<p className="text-sm text-muted-foreground">
							API routes that need fast global responses — feature flags, A/B
							test assignments, simple data lookups from edge-compatible stores
							like KV or D1.
						</p>
					</DemoBox>
					<DemoBox title="Geo-Routing">
						<p className="text-sm text-muted-foreground">
							Read the user&apos;s location from request headers and serve
							region-specific content or redirect to the nearest data center.
						</p>
					</DemoBox>
					<DemoBox title="Auth Token Verification">
						<p className="text-sm text-muted-foreground">
							Validate JWTs at the edge using Web Crypto before the request
							reaches your origin server. Reject invalid tokens early.
						</p>
					</DemoBox>
					<DemoBox title="Personalization">
						<p className="text-sm text-muted-foreground">
							Read cookies or headers to personalize responses without a
							round-trip to the origin. Combine with edge-compatible databases
							for dynamic content.
						</p>
					</DemoBox>
				</div>
			</Section>

			<Section title="Key Points">
				<div className="grid gap-3 sm:grid-cols-2">
					<DemoBox title="Middleware Is Always Edge">
						<p className="text-sm text-muted-foreground">
							middleware.ts always runs on the Edge Runtime. You do not need to
							export a runtime config — it is edge by default.
						</p>
					</DemoBox>
					<DemoBox title="Choose Wisely">
						<p className="text-sm text-muted-foreground">
							Only use Edge Runtime when latency matters and your code stays
							within the API constraints. For most pages and APIs, the Node.js
							runtime is simpler and more capable.
						</p>
					</DemoBox>
				</div>
			</Section>
		</DemoPage>
	);
}
