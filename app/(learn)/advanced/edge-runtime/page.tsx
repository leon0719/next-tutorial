import { getTranslations } from "next-intl/server";
import { CodeBlock, DemoBox, DemoPage, Section } from "@/components/demo-page";
import { Badge } from "@/components/ui/badge";

export default async function EdgeRuntimePage() {
	const t = await getTranslations("advanced.edgeRuntime");
	return (
		<DemoPage title={t("title")} description={t("description")}>
			<Section title={t("optingInTitle")}>
				<p className="text-sm text-muted-foreground mb-3">
					{t("optingInDesc")}
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

			<Section title={t("edgeVsNodeTitle")}>
				<div className="grid gap-3 sm:grid-cols-2">
					<DemoBox title={t("edgeRuntimeTitle")}>
						<div className="space-y-2">
							<Badge variant="secondary" className="text-xs">
								{t("edgeBadge")}
							</Badge>
							<ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
								<li>{t("edgeItem1")}</li>
								<li>{t("edgeItem2")}</li>
								<li>{t("edgeItem3")}</li>
								<li>{t("edgeItem4")}</li>
								<li>{t("edgeItem5")}</li>
							</ul>
						</div>
					</DemoBox>
					<DemoBox title={t("nodeRuntimeTitle")}>
						<div className="space-y-2">
							<Badge variant="outline" className="text-xs">
								{t("nodeBadge")}
							</Badge>
							<ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
								<li>{t("nodeItem1")}</li>
								<li>{t("nodeItem2")}</li>
								<li>{t("nodeItem3")}</li>
								<li>{t("nodeItem4")}</li>
								<li>{t("nodeItem5")}</li>
							</ul>
						</div>
					</DemoBox>
				</div>
			</Section>

			<Section title={t("whatYouCanUseTitle")}>
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

			<Section title={t("limitationsTitle")}>
				<DemoBox title={t("limitationsBoxTitle")}>
					<ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
						<li>{t("limitItem1")}</li>
						<li>{t("limitItem2")}</li>
						<li>{t("limitItem3")}</li>
						<li>{t("limitItem4")}</li>
						<li>{t("limitItem5")}</li>
					</ul>
				</DemoBox>
			</Section>

			<Section title={t("useCasesTitle")}>
				<div className="grid gap-3 sm:grid-cols-2">
					<DemoBox title={t("lowLatencyTitle")}>
						<p className="text-sm text-muted-foreground">
							{t("lowLatencyDesc")}
						</p>
					</DemoBox>
					<DemoBox title={t("geoRoutingTitle")}>
						<p className="text-sm text-muted-foreground">
							{t("geoRoutingDesc")}
						</p>
					</DemoBox>
					<DemoBox title={t("authTokenTitle")}>
						<p className="text-sm text-muted-foreground">
							{t("authTokenDesc")}
						</p>
					</DemoBox>
					<DemoBox title={t("personalizationTitle")}>
						<p className="text-sm text-muted-foreground">
							{t("personalizationDesc")}
						</p>
					</DemoBox>
				</div>
			</Section>

			<Section title={t("keyPointsTitle")}>
				<div className="grid gap-3 sm:grid-cols-2">
					<DemoBox title={t("proxyAlwaysEdgeTitle")}>
						<p className="text-sm text-muted-foreground">
							{t("proxyAlwaysEdgeDesc")}
						</p>
					</DemoBox>
					<DemoBox title={t("chooseWiselyTitle")}>
						<p className="text-sm text-muted-foreground">
							{t("chooseWiselyDesc")}
						</p>
					</DemoBox>
				</div>
			</Section>
		</DemoPage>
	);
}
