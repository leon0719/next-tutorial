import dynamic from "next/dynamic";
import { getTranslations } from "next-intl/server";
import { CodeBlock, DemoBox, DemoPage, Section } from "@/components/demo-page";

const DynamicHeavyComponent = dynamic(
	() => import("./heavy-component").then((mod) => mod.HeavyComponent),
	{
		loading: () => (
			<div className="rounded-lg border p-8 animate-pulse bg-muted/30">
				<div className="h-4 bg-muted rounded w-1/3 mb-4" />
				<div className="h-40 bg-muted rounded" />
			</div>
		),
	},
);

export default async function LazyLoadingPage() {
	const t = await getTranslations("rendering.lazyLoading");

	return (
		<DemoPage title={t("title")} description={t("description")}>
			<Section
				title={t("sectionLiveDemo")}
				description={t("sectionLiveDemoDesc")}
			>
				<DynamicHeavyComponent />
			</Section>

			<Section
				title={t("sectionBasicUsage")}
				description={t("sectionBasicUsageDesc")}
			>
				<CodeBlock
					filename="app/page.tsx"
					language="tsx"
				>{`import dynamic from "next/dynamic";

// Dynamic import — creates a separate chunk
const Chart = dynamic(() => import("@/components/chart"));

export default function Page() {
  return (
    <div>
      <h1>Dashboard</h1>
      {/* Chart JS is only loaded when this renders */}
      <Chart data={data} />
    </div>
  );
}`}</CodeBlock>
			</Section>

			<Section title={t("sectionNoSSR")} description={t("sectionNoSSRDesc")}>
				<CodeBlock
					filename="components/map.tsx"
					language="tsx"
				>{`import dynamic from "next/dynamic";

// This component uses window/document — cannot run on server
const Map = dynamic(() => import("@/components/leaflet-map"), {
  ssr: false,
});

// The Map component will only render on the client.
// On the server, nothing is rendered (or the loading fallback).
export default function MapPage() {
  return <Map center={[51.505, -0.09]} zoom={13} />;
}`}</CodeBlock>
			</Section>

			<Section
				title={t("sectionCustomLoading")}
				description={t("sectionCustomLoadingDesc")}
			>
				<CodeBlock
					filename="app/dashboard/page.tsx"
					language="tsx"
				>{`import dynamic from "next/dynamic";

const Chart = dynamic(() => import("@/components/chart"), {
  loading: () => (
    <div className="h-64 animate-pulse bg-muted rounded-lg">
      <p className="text-center pt-24 text-muted-foreground">
        Loading chart...
      </p>
    </div>
  ),
});

// The loading component shows immediately,
// then swaps to the real chart once loaded.`}</CodeBlock>
			</Section>

			<Section
				title={t("sectionImportPattern")}
				description={t("sectionImportPatternDesc")}
			>
				<CodeBlock
					filename="dynamic-patterns.tsx"
					language="tsx"
				>{`import dynamic from "next/dynamic";

// Default export
const Chart = dynamic(() => import("./chart"));

// Named export — use .then() to select it
const LineChart = dynamic(() =>
  import("./charts").then((mod) => mod.LineChart)
);

// With all options
const Editor = dynamic(
  () => import("@/components/rich-editor"),
  {
    ssr: false,
    loading: () => <EditorSkeleton />,
  }
);

// Under the hood, this is equivalent to:
// const Chart = React.lazy(() => import("./chart"));
// Wrapped in <Suspense fallback={loading}>`}</CodeBlock>
			</Section>

			<Section title={t("sectionKeyPoints")}>
				<div className="grid gap-3 sm:grid-cols-2">
					<DemoBox title={t("keyCodeSplitting")}>
						<p className="text-sm text-muted-foreground">
							{t("keyCodeSplittingDesc")}
						</p>
					</DemoBox>
					<DemoBox title={t("keySSRControl")}>
						<p className="text-sm text-muted-foreground">
							{t("keySSRControlDesc")}
						</p>
					</DemoBox>
					<DemoBox title={t("keyLoadingState")}>
						<p className="text-sm text-muted-foreground">
							{t("keyLoadingStateDesc")}
						</p>
					</DemoBox>
					<DemoBox title={t("keyNamedExports")}>
						<p className="text-sm text-muted-foreground">
							{t("keyNamedExportsDesc")}
						</p>
					</DemoBox>
				</div>
			</Section>
		</DemoPage>
	);
}
