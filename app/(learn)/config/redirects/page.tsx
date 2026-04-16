import { getTranslations } from "next-intl/server";
import { CodeBlock, DemoBox, DemoPage, Section } from "@/components/demo-page";

const richComponents = {
	code: (chunks: React.ReactNode) => <code>{chunks}</code>,
	strong: (chunks: React.ReactNode) => <strong>{chunks}</strong>,
};

export default async function RedirectsRewritesPage() {
	const t = await getTranslations("config.redirects");
	return (
		<DemoPage title={t("title")} description={t("description")}>
			<Section title={t("redirectsTitle")} description={t("redirectsDesc")}>
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
					<DemoBox title={t("permanentTitle")}>
						<p className="text-sm text-muted-foreground">
							{t.rich("permanentText", richComponents)}
						</p>
					</DemoBox>
					<DemoBox title={t("temporaryTitle")}>
						<p className="text-sm text-muted-foreground">
							{t.rich("temporaryText", richComponents)}
						</p>
					</DemoBox>
				</div>
			</Section>

			<Section title={t("rewritesTitle")} description={t("rewritesDesc")}>
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
				<DemoBox title={t("rewritePhasesTitle")}>
					<div className="space-y-2 text-sm text-muted-foreground">
						<p>{t.rich("beforeFilesText", richComponents)}</p>
						<p>{t.rich("afterFilesText", richComponents)}</p>
						<p>{t.rich("fallbackText", richComponents)}</p>
					</div>
				</DemoBox>
			</Section>

			<Section
				title={t("patternMatchingTitle")}
				description={t("patternMatchingDesc")}
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

			<Section title={t("commonUseCasesTitle")}>
				<div className="grid gap-3 sm:grid-cols-2">
					<DemoBox title={t("domainMigrationTitle")}>
						<p className="text-sm text-muted-foreground">
							{t.rich("domainMigrationText", richComponents)}
						</p>
					</DemoBox>
					<DemoBox title={t("apiProxyTitle")}>
						<p className="text-sm text-muted-foreground">
							{t.rich("apiProxyText", richComponents)}
						</p>
					</DemoBox>
					<DemoBox title={t("vanityUrlsTitle")}>
						<p className="text-sm text-muted-foreground">
							{t.rich("vanityUrlsText", richComponents)}
						</p>
					</DemoBox>
					<DemoBox title={t("incrementalMigrationTitle")}>
						<p className="text-sm text-muted-foreground">
							{t.rich("incrementalMigrationText", richComponents)}
						</p>
					</DemoBox>
				</div>
			</Section>
		</DemoPage>
	);
}
