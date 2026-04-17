import { getTranslations } from "next-intl/server";
import { CodeBlock, DemoBox, DemoPage, Section } from "@/components/demo-page";

const richComponents = {
	code: (chunks: React.ReactNode) => <code>{chunks}</code>,
};

export default async function HeadersCSPPage() {
	const t = await getTranslations("config.headers");
	return (
		<DemoPage title={t("title")} description={t("description")}>
			<Section
				title={t("customHeadersTitle")}
				description={t("customHeadersDesc")}
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
				title={t("securityHeadersTitle")}
				description={t("securityHeadersDesc")}
			>
				<div className="overflow-x-auto">
					<table className="w-full text-sm">
						<thead>
							<tr className="border-b">
								<th className="text-left py-2 pr-4 font-medium">
									{t("headerCol")}
								</th>
								<th className="text-left py-2 pr-4 font-medium">
									{t("valueCol")}
								</th>
								<th className="text-left py-2 font-medium">
									{t("purposeCol")}
								</th>
							</tr>
						</thead>
						<tbody className="text-muted-foreground">
							<tr className="border-b">
								<td className="py-2 pr-4 font-mono text-xs">X-Frame-Options</td>
								<td className="py-2 pr-4 font-mono text-xs">DENY</td>
								<td className="py-2">{t("xFramePurpose")}</td>
							</tr>
							<tr className="border-b">
								<td className="py-2 pr-4 font-mono text-xs">
									X-Content-Type-Options
								</td>
								<td className="py-2 pr-4 font-mono text-xs">nosniff</td>
								<td className="py-2">{t("xContentPurpose")}</td>
							</tr>
							<tr className="border-b">
								<td className="py-2 pr-4 font-mono text-xs">Referrer-Policy</td>
								<td className="py-2 pr-4 font-mono text-xs">
									strict-origin-when-cross-origin
								</td>
								<td className="py-2">{t("referrerPurpose")}</td>
							</tr>
							<tr className="border-b">
								<td className="py-2 pr-4 font-mono text-xs">
									Permissions-Policy
								</td>
								<td className="py-2 pr-4 font-mono text-xs">
									camera=(), microphone=()
								</td>
								<td className="py-2">{t("permissionsPurpose")}</td>
							</tr>
							<tr>
								<td className="py-2 pr-4 font-mono text-xs">
									Strict-Transport-Security
								</td>
								<td className="py-2 pr-4 font-mono text-xs">
									max-age=63072000; includeSubDomains
								</td>
								<td className="py-2">{t("hstsPurpose")}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</Section>

			<Section title={t("cspTitle")} description={t("cspDesc")}>
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

			<Section title={t("cspDirectivesTitle")}>
				<div className="grid gap-3 sm:grid-cols-2">
					<DemoBox title={t("defaultSrcTitle")}>
						<p className="text-sm text-muted-foreground">
							{t.rich("defaultSrcText", richComponents)}
						</p>
					</DemoBox>
					<DemoBox title={t("scriptSrcTitle")}>
						<p className="text-sm text-muted-foreground">
							{t.rich("scriptSrcText", richComponents)}
						</p>
					</DemoBox>
					<DemoBox title={t("styleSrcTitle")}>
						<p className="text-sm text-muted-foreground">
							{t.rich("styleSrcText", richComponents)}
						</p>
					</DemoBox>
					<DemoBox title={t("frameAncestorsTitle")}>
						<p className="text-sm text-muted-foreground">
							{t.rich("frameAncestorsText", richComponents)}
						</p>
					</DemoBox>
				</div>
			</Section>

			<Section title={t("nonceBasedTitle")}>
				<CodeBlock
					filename="proxy.ts"
					language="typescript"
				>{`import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
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
				<DemoBox title={t("whyNoncesTitle")}>
					<p className="text-sm text-muted-foreground">
						{t.rich("whyNoncesText", richComponents)}
					</p>
				</DemoBox>
			</Section>
		</DemoPage>
	);
}
