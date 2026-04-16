import { getTranslations } from "next-intl/server";
import {
	CodeBlock,
	DemoBox,
	DemoPage,
	FileTree,
	Section,
} from "@/components/demo-page";

const richComponents = {
	code: (chunks: React.ReactNode) => <code>{chunks}</code>,
};

export default async function EnvVariablesPage() {
	const t = await getTranslations("config.env");
	return (
		<DemoPage title={t("title")} description={t("description")}>
			<Section
				title={t("envHierarchyTitle")}
				description={t("envHierarchyDesc")}
			>
				<FileTree>{`.env                  # Loaded in all environments
.env.local            # Loaded in all environments (git-ignored)
.env.development      # Loaded in dev only
.env.development.local# Loaded in dev only (git-ignored)
.env.production       # Loaded in production only
.env.production.local # Loaded in production only (git-ignored)`}</FileTree>
				<DemoBox title={t("loadingPriorityTitle")}>
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

			<Section title={t("serverOnlyTitle")} description={t("serverOnlyDesc")}>
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

			<Section title={t("clientSideTitle")} description={t("clientSideDesc")}>
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

			<Section title={t("liveExampleTitle")}>
				<DemoBox title={t("nodeEnvTitle")}>
					<div className="space-y-2">
						<p className="text-sm text-muted-foreground">
							{t.rich("nodeEnvText", richComponents)}
						</p>
						<p className="font-mono text-lg font-semibold">
							{process.env.NODE_ENV}
						</p>
						<p className="text-xs text-muted-foreground">
							{t.rich("nodeEnvNote", richComponents)}
						</p>
					</div>
				</DemoBox>
			</Section>

			<Section title={t("securityRulesTitle")}>
				<div className="grid gap-3 sm:grid-cols-2">
					<DemoBox title={t("neverExposeTitle")}>
						<p className="text-sm text-muted-foreground">
							{t.rich("neverExposeText", richComponents)}
						</p>
					</DemoBox>
					<DemoBox title={t("gitIgnoreTitle")}>
						<p className="text-sm text-muted-foreground">
							{t.rich("gitIgnoreText", richComponents)}
						</p>
					</DemoBox>
					<DemoBox title={t("buildTimeTitle")}>
						<p className="text-sm text-muted-foreground">
							{t.rich("buildTimeText", richComponents)}
						</p>
					</DemoBox>
					<DemoBox title={t("useServerComponentsTitle")}>
						<p className="text-sm text-muted-foreground">
							{t("useServerComponentsText")}
						</p>
					</DemoBox>
				</div>
			</Section>
		</DemoPage>
	);
}
