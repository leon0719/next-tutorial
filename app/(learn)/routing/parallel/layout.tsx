import { getTranslations } from "next-intl/server";
import { CodeBlock, DemoPage, FileTree, Section } from "@/components/demo-page";

export default async function ParallelLayout({
	children,
	analytics,
	dashboard,
}: {
	children: React.ReactNode;
	analytics: React.ReactNode;
	dashboard: React.ReactNode;
}) {
	const t = await getTranslations("routing.parallel");

	return (
		<DemoPage title={t("title")} description={t("description")}>
			<Section title={t("fileStructure")}>
				<FileTree>{`app/(learn)/routing/parallel/
├── layout.tsx            ← This layout! Receives slots as props
├── page.tsx              ← children slot (main content)
├── default.tsx           ← Fallback for children on hard nav
│
├── @analytics/           ← Named slot
│   ├── page.tsx          ← Analytics content
│   └── default.tsx       ← Fallback on hard nav
│
└── @dashboard/           ← Named slot
    ├── page.tsx          ← Dashboard content
    └── default.tsx       ← Fallback on hard nav`}</FileTree>
			</Section>

			<Section title={t("liveDemo")}>
				<div className="grid gap-4 md:grid-cols-2">
					<div className="rounded-lg border-2 border-dashed border-blue-500/30 p-1">
						<div className="mb-1 px-2 text-xs font-medium text-blue-500">
							{t("dashboardSlot")}
						</div>
						{dashboard}
					</div>
					<div className="rounded-lg border-2 border-dashed border-green-500/30 p-1">
						<div className="mb-1 px-2 text-xs font-medium text-green-500">
							{t("analyticsSlot")}
						</div>
						{analytics}
					</div>
				</div>
				<div className="mt-4 rounded-lg border-2 border-dashed border-purple-500/30 p-1">
					<div className="mb-1 px-2 text-xs font-medium text-purple-500">
						{t("childrenSlot")}
					</div>
					{children}
				</div>
			</Section>

			<Section title={t("howItWorks")}>
				<CodeBlock
					filename="app/dashboard/layout.tsx"
					language="tsx"
				>{`// Slots are passed as props to the layout
export default function DashboardLayout({
  children,        // page.tsx content
  analytics,       // @analytics/page.tsx content
  notifications,   // @notifications/page.tsx content
}: {
  children: React.ReactNode;
  analytics: React.ReactNode;
  notifications: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-3">
      <main>{children}</main>
      <aside>{analytics}</aside>
      <aside>{notifications}</aside>
    </div>
  );
}`}</CodeBlock>
			</Section>

			<Section title={t("keyPoints")}>
				<div className="grid gap-3 sm:grid-cols-2">
					<div className="rounded-lg border p-4">
						<h3 className="font-medium text-sm">{t("defaultRequired")}</h3>
						<p className="text-sm text-muted-foreground mt-1">
							{t("defaultRequiredDesc")}
						</p>
					</div>
					<div className="rounded-lg border p-4">
						<h3 className="font-medium text-sm">{t("independentLoading")}</h3>
						<p className="text-sm text-muted-foreground mt-1">
							{t("independentLoadingDesc")}
						</p>
					</div>
					<div className="rounded-lg border p-4">
						<h3 className="font-medium text-sm">{t("conditionalRender")}</h3>
						<p className="text-sm text-muted-foreground mt-1">
							{t("conditionalRenderDesc")}
						</p>
					</div>
					<div className="rounded-lg border p-4">
						<h3 className="font-medium text-sm">{t("softHardNav")}</h3>
						<p className="text-sm text-muted-foreground mt-1">
							{t("softHardNavDesc")}
						</p>
					</div>
				</div>
			</Section>
		</DemoPage>
	);
}
