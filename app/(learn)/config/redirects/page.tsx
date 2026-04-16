import { CodeBlock, DemoBox, DemoPage, Section } from "@/components/demo-page";

export default async function RedirectsRewritesPage() {
	return (
		<DemoPage
			title="Redirects & Rewrites"
			description="Configure URL redirects and rewrites in next.config.ts to control routing without writing application code."
		>
			<Section
				title="Redirects"
				description="Redirects send the user to a different URL. They return a 307 (temporary) or 308 (permanent) status code."
			>
				<CodeBlock
					filename="next.config.ts"
					language="typescript"
				>{`import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Permanent redirect (308) — old URL to new URL
      {
        source: "/old-blog/:slug",
        destination: "/blog/:slug",
        permanent: true,
      },
      // Temporary redirect (307) — e.g. during maintenance
      {
        source: "/maintenance",
        destination: "/coming-soon",
        permanent: false,
      },
      // Wildcard — redirect entire subtree
      {
        source: "/docs/:path*",
        destination: "https://docs.example.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;`}</CodeBlock>
				<div className="grid gap-3 sm:grid-cols-2">
					<DemoBox title="Permanent (308)">
						<p className="text-sm text-muted-foreground">
							Use <code>permanent: true</code> when a URL has moved forever.
							Browsers and search engines cache this redirect. The old URL
							transfers its SEO value to the new one.
						</p>
					</DemoBox>
					<DemoBox title="Temporary (307)">
						<p className="text-sm text-muted-foreground">
							Use <code>permanent: false</code> for temporary redirects.
							Browsers do not cache this, so the original URL remains the
							canonical source.
						</p>
					</DemoBox>
				</div>
			</Section>

			<Section
				title="Rewrites"
				description="Rewrites map a URL to a different destination without changing the browser's address bar. The user sees the original URL."
			>
				<CodeBlock
					filename="next.config.ts"
					language="typescript"
				>{`import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      // Checked before files in /public and pages
      beforeFiles: [
        {
          source: "/api/:path*",
          destination: "https://api.example.com/:path*",
        },
      ],
      // Checked after pages but before /public files
      afterFiles: [
        {
          source: "/dashboard",
          destination: "/app/dashboard",
        },
      ],
      // Checked after both pages and /public files
      fallback: [
        {
          source: "/:path*",
          destination: "https://legacy-app.example.com/:path*",
        },
      ],
    };
  },
};

export default nextConfig;`}</CodeBlock>
				<DemoBox title="Rewrite Phases">
					<div className="space-y-2 text-sm text-muted-foreground">
						<p>
							<strong>beforeFiles</strong> — Runs before any page or static file
							is matched. Useful for proxying API calls to an external backend.
						</p>
						<p>
							<strong>afterFiles</strong> — Runs after pages are checked but
							before public files. Useful for internal URL aliases.
						</p>
						<p>
							<strong>fallback</strong> — Runs last, only if no page or file
							matched. Useful for proxying to a legacy app.
						</p>
					</div>
				</DemoBox>
			</Section>

			<Section
				title="Pattern Matching"
				description="Both redirects and rewrites support dynamic segments and wildcards."
			>
				<CodeBlock
					filename="patterns.ts"
					language="typescript"
				>{`// Named parameter — matches one segment
{ source: "/blog/:slug", destination: "/posts/:slug" }
// /blog/hello → /posts/hello

// Wildcard — matches zero or more segments
{ source: "/docs/:path*", destination: "/documentation/:path*" }
// /docs/a/b/c → /documentation/a/b/c

// Regex — constrain parameter format
{ source: "/post/:id(\\\\d+)", destination: "/blog/:id" }
// /post/123 → /blog/123  (matches)
// /post/abc → 404         (no match)

// Has query parameter
{
  source: "/search",
  destination: "/results",
  has: [{ type: "query", key: "q" }],
}
// /search?q=nextjs → /results?q=nextjs`}</CodeBlock>
			</Section>

			<Section title="Common Use Cases">
				<div className="grid gap-3 sm:grid-cols-2">
					<DemoBox title="Domain Migration">
						<p className="text-sm text-muted-foreground">
							Redirect all old URLs to new ones with{" "}
							<code>permanent: true</code> to preserve SEO when restructuring
							your site.
						</p>
					</DemoBox>
					<DemoBox title="API Proxy">
						<p className="text-sm text-muted-foreground">
							Use <code>beforeFiles</code> rewrites to proxy <code>/api/*</code>{" "}
							to an external API server, avoiding CORS issues entirely.
						</p>
					</DemoBox>
					<DemoBox title="Vanity URLs">
						<p className="text-sm text-muted-foreground">
							Rewrite <code>/pricing</code> to{" "}
							<code>/marketing/pricing-page</code> for clean public URLs while
							keeping your internal structure organized.
						</p>
					</DemoBox>
					<DemoBox title="Incremental Migration">
						<p className="text-sm text-muted-foreground">
							Use <code>fallback</code> rewrites to send unmatched routes to a
							legacy application while migrating pages one by one.
						</p>
					</DemoBox>
				</div>
			</Section>
		</DemoPage>
	);
}
