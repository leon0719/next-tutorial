import { getTranslations } from "next-intl/server";
import { CodeBlock, DemoBox, DemoPage, Section } from "@/components/demo-page";

const richComponents = {
	code: (chunks: React.ReactNode) => <code>{chunks}</code>,
	strong: (chunks: React.ReactNode) => <strong>{chunks}</strong>,
};

export default async function BundleAnalyzerPage() {
	const t = await getTranslations("config.bundle");
	return (
		<DemoPage title={t("title")} description={t("description")}>
			<Section title={t("setupTitle")} description={t("setupDesc")}>
				<CodeBlock
					filename="terminal"
					language="bash"
				>{`bun add -d @next/bundle-analyzer`}</CodeBlock>
				<CodeBlock
					filename="next.config.ts"
					language="typescript"
				>{`import type { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";

const nextConfig: NextConfig = {
  // ...your existing config
};

// Wrap config — only activates when ANALYZE=true
export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
})(nextConfig);`}</CodeBlock>
			</Section>

			<Section title={t("runningTitle")} description={t("runningDesc")}>
				<CodeBlock
					filename="terminal"
					language="bash"
				>{`# Generate bundle analysis report
ANALYZE=true bun run build

# This opens two HTML files in your browser:
#   - client.html  (what ships to the browser)
#   - nodejs.html  (server-side bundles)`}</CodeBlock>
				<DemoBox title={t("whatToLookForTitle")}>
					<div className="space-y-2 text-sm text-muted-foreground">
						<p>{t.rich("largeRectanglesText", richComponents)}</p>
						<p>{t.rich("duplicateModulesText", richComponents)}</p>
						<p>{t.rich("unusedLibrariesText", richComponents)}</p>
					</div>
				</DemoBox>
			</Section>

			<Section title={t("treeShakingTitle")} description={t("treeShakingDesc")}>
				<div className="grid gap-4 md:grid-cols-2">
					<div>
						<h3 className="text-sm font-semibold mb-2 text-red-600 dark:text-red-400">
							{t("badImportLabel")}
						</h3>
						<CodeBlock
							filename="bad-import.ts"
							language="typescript"
						>{`// Pulls in the ENTIRE lodash library (~70KB)
import _ from "lodash";

const result = _.groupBy(items, "category");`}</CodeBlock>
					</div>
					<div>
						<h3 className="text-sm font-semibold mb-2 text-green-600 dark:text-green-400">
							{t("goodImportLabel")}
						</h3>
						<CodeBlock
							filename="good-import.ts"
							language="typescript"
						>{`// Pulls in only groupBy (~1KB)
import groupBy from "lodash/groupBy";

const result = groupBy(items, "category");`}</CodeBlock>
					</div>
				</div>
			</Section>

			<Section
				title={t("dynamicImportsTitle")}
				description={t("dynamicImportsDesc")}
			>
				<CodeBlock
					filename="app/page.tsx"
					language="tsx"
				>{`import dynamic from "next/dynamic";

// This component is loaded only when rendered
// It gets its own chunk, not included in the main bundle
const HeavyChart = dynamic(() => import("@/components/chart"), {
  loading: () => <p>Loading chart...</p>,
  ssr: false, // Skip server rendering if not needed
});

export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      {/* HeavyChart JS is fetched only when this renders */}
      <HeavyChart />
    </div>
  );
}`}</CodeBlock>
			</Section>

			<Section title={t("tipsTitle")}>
				<div className="grid gap-3 sm:grid-cols-2">
					<DemoBox title={t("auditDepsTitle")}>
						<p className="text-sm text-muted-foreground">
							{t.rich("auditDepsText", richComponents)}
						</p>
					</DemoBox>
					<DemoBox title={t("useServerComponentsTitle")}>
						<p className="text-sm text-muted-foreground">
							{t.rich("useServerComponentsText", richComponents)}
						</p>
					</DemoBox>
					<DemoBox title={t("lazyLoadTitle")}>
						<p className="text-sm text-muted-foreground">
							{t.rich("lazyLoadText", richComponents)}
						</p>
					</DemoBox>
					<DemoBox title={t("checkPackageSizeTitle")}>
						<p className="text-sm text-muted-foreground">
							{t("checkPackageSizeText")}
						</p>
					</DemoBox>
				</div>
			</Section>
		</DemoPage>
	);
}
