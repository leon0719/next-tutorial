import { CodeBlock, DemoBox, DemoPage, Section } from "@/components/demo-page";

export default async function BundleAnalyzerPage() {
	return (
		<DemoPage
			title="Bundle Analyzer"
			description="Visualize your JavaScript bundle to find and eliminate bloat. The bundle analyzer generates an interactive treemap of every module in your build."
		>
			<Section
				title="Setup"
				description="Install @next/bundle-analyzer and configure next.config.ts to enable it with an environment variable."
			>
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

			<Section
				title="Running the Analyzer"
				description="Set the ANALYZE environment variable before building to generate the report."
			>
				<CodeBlock
					filename="terminal"
					language="bash"
				>{`# Generate bundle analysis report
ANALYZE=true bun run build

# This opens two HTML files in your browser:
#   - client.html  (what ships to the browser)
#   - nodejs.html  (server-side bundles)`}</CodeBlock>
				<DemoBox title="What to Look For">
					<div className="space-y-2 text-sm text-muted-foreground">
						<p>
							<strong>Large rectangles</strong> — Bigger boxes mean bigger
							modules. Look for unexpectedly large dependencies.
						</p>
						<p>
							<strong>Duplicate modules</strong> — The same library appearing
							multiple times may indicate version conflicts.
						</p>
						<p>
							<strong>Unused libraries</strong> — Libraries you imported but
							barely use still contribute their full size to the bundle.
						</p>
					</div>
				</DemoBox>
			</Section>

			<Section
				title="Tree Shaking"
				description="Tree shaking removes unused exports from your bundle. It works automatically with ES modules but can fail silently."
			>
				<div className="grid gap-4 md:grid-cols-2">
					<div>
						<h3 className="text-sm font-semibold mb-2 text-red-600 dark:text-red-400">
							Bad — Imports Everything
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
							Good — Imports Only What You Need
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
				title="Dynamic Imports"
				description="Load heavy components only when they are needed using next/dynamic or React.lazy."
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

			<Section title="Tips for Reducing Bundle Size">
				<div className="grid gap-3 sm:grid-cols-2">
					<DemoBox title="Audit Dependencies">
						<p className="text-sm text-muted-foreground">
							Run the analyzer regularly. Remove unused packages and replace
							heavy ones with lighter alternatives (e.g., <code>date-fns</code>{" "}
							instead of <code>moment</code>).
						</p>
					</DemoBox>
					<DemoBox title="Use Server Components">
						<p className="text-sm text-muted-foreground">
							Server Components send zero JavaScript to the client. Keep data
							fetching and heavy logic in Server Components and only use{" "}
							<code>&quot;use client&quot;</code> for interactivity.
						</p>
					</DemoBox>
					<DemoBox title="Lazy Load Below the Fold">
						<p className="text-sm text-muted-foreground">
							Use <code>next/dynamic</code> for components not visible on
							initial load: modals, tabs, charts, and anything behind user
							interaction.
						</p>
					</DemoBox>
					<DemoBox title="Check Package Size Before Installing">
						<p className="text-sm text-muted-foreground">
							Use{" "}
							<a
								href="https://bundlephobia.com"
								className="underline"
								target="_blank"
								rel="noopener noreferrer"
							>
								bundlephobia.com
							</a>{" "}
							to check the size cost of any npm package before adding it to your
							project.
						</p>
					</DemoBox>
				</div>
			</Section>
		</DemoPage>
	);
}
