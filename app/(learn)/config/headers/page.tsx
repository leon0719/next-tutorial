import { CodeBlock, DemoBox, DemoPage, Section } from "@/components/demo-page";

export default async function HeadersCSPPage() {
	return (
		<DemoPage
			title="Headers & CSP"
			description="Add custom HTTP headers in next.config.ts to improve security, caching, and compliance. Content Security Policy (CSP) helps prevent XSS attacks."
		>
			<Section
				title="Custom Headers in next.config.ts"
				description="Define headers that Next.js will add to responses matching specific paths."
			>
				<CodeBlock
					filename="next.config.ts"
					language="typescript"
				>{`import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Apply to all routes
        source: "/:path*",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
      {
        // Apply only to API routes
        source: "/api/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, max-age=0",
          },
        ],
      },
    ];
  },
};

export default nextConfig;`}</CodeBlock>
			</Section>

			<Section
				title="Essential Security Headers"
				description="These headers protect against common web vulnerabilities. Add them to every production site."
			>
				<div className="overflow-x-auto">
					<table className="w-full text-sm">
						<thead>
							<tr className="border-b">
								<th className="text-left py-2 pr-4 font-medium">Header</th>
								<th className="text-left py-2 pr-4 font-medium">Value</th>
								<th className="text-left py-2 font-medium">Purpose</th>
							</tr>
						</thead>
						<tbody className="text-muted-foreground">
							<tr className="border-b">
								<td className="py-2 pr-4 font-mono text-xs">X-Frame-Options</td>
								<td className="py-2 pr-4 font-mono text-xs">DENY</td>
								<td className="py-2">
									Prevents clickjacking by blocking iframes
								</td>
							</tr>
							<tr className="border-b">
								<td className="py-2 pr-4 font-mono text-xs">
									X-Content-Type-Options
								</td>
								<td className="py-2 pr-4 font-mono text-xs">nosniff</td>
								<td className="py-2">Prevents MIME-type sniffing attacks</td>
							</tr>
							<tr className="border-b">
								<td className="py-2 pr-4 font-mono text-xs">Referrer-Policy</td>
								<td className="py-2 pr-4 font-mono text-xs">
									strict-origin-when-cross-origin
								</td>
								<td className="py-2">
									Controls referrer info sent with requests
								</td>
							</tr>
							<tr className="border-b">
								<td className="py-2 pr-4 font-mono text-xs">
									Permissions-Policy
								</td>
								<td className="py-2 pr-4 font-mono text-xs">
									camera=(), microphone=()
								</td>
								<td className="py-2">Restricts browser feature access</td>
							</tr>
							<tr>
								<td className="py-2 pr-4 font-mono text-xs">
									Strict-Transport-Security
								</td>
								<td className="py-2 pr-4 font-mono text-xs">
									max-age=63072000; includeSubDomains
								</td>
								<td className="py-2">Forces HTTPS for all future visits</td>
							</tr>
						</tbody>
					</table>
				</div>
			</Section>

			<Section
				title="Content Security Policy (CSP)"
				description="CSP tells the browser which sources of content are allowed. It is the most effective defense against XSS attacks."
			>
				<CodeBlock
					filename="next.config.ts"
					language="typescript"
				>{`import type { NextConfig } from "next";

const cspHeader = \`
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  img-src 'self' blob: data:;
  font-src 'self';
  connect-src 'self';
  frame-ancestors 'none';
  form-action 'self';
  base-uri 'self';
\`;

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            // Remove newlines and extra spaces
            value: cspHeader.replace(/\\n/g, ""),
          },
        ],
      },
    ];
  },
};

export default nextConfig;`}</CodeBlock>
			</Section>

			<Section title="CSP Directives Explained">
				<div className="grid gap-3 sm:grid-cols-2">
					<DemoBox title="default-src">
						<p className="text-sm text-muted-foreground">
							Fallback for all resource types not explicitly listed. Setting it
							to <code>&apos;self&apos;</code> restricts loading to your own
							domain only.
						</p>
					</DemoBox>
					<DemoBox title="script-src">
						<p className="text-sm text-muted-foreground">
							Controls which scripts can execute. Use nonces or hashes instead
							of <code>&apos;unsafe-inline&apos;</code> in production for
							maximum security.
						</p>
					</DemoBox>
					<DemoBox title="style-src">
						<p className="text-sm text-muted-foreground">
							Controls which stylesheets are allowed. Many CSS-in-JS libraries
							require <code>&apos;unsafe-inline&apos;</code>, which weakens this
							directive.
						</p>
					</DemoBox>
					<DemoBox title="frame-ancestors">
						<p className="text-sm text-muted-foreground">
							Modern replacement for X-Frame-Options. Setting it to{" "}
							<code>&apos;none&apos;</code> prevents your site from being loaded
							in any iframe.
						</p>
					</DemoBox>
				</div>
			</Section>

			<Section title="Nonce-Based CSP (Recommended)">
				<CodeBlock
					filename="middleware.ts"
					language="typescript"
				>{`import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const csp = \`
    default-src 'self';
    script-src 'self' 'nonce-\${nonce}';
    style-src 'self' 'nonce-\${nonce}';
  \`;

  const response = NextResponse.next();
  response.headers.set(
    "Content-Security-Policy",
    csp.replace(/\\n/g, "")
  );
  // Pass nonce to components via a custom header
  response.headers.set("x-nonce", nonce);
  return response;
}`}</CodeBlock>
				<DemoBox title="Why Nonces?">
					<p className="text-sm text-muted-foreground">
						A nonce is a random value generated per request. Only scripts with a
						matching <code>nonce</code> attribute will execute. This eliminates
						the need for <code>&apos;unsafe-inline&apos;</code> and provides
						strong XSS protection, since attackers cannot guess the nonce.
					</p>
				</DemoBox>
			</Section>
		</DemoPage>
	);
}
