import { getTranslations } from "next-intl/server";
import {
	CodeBlock,
	DemoBox,
	DemoPage,
	FileTree,
	Section,
} from "@/components/demo-page";
import { Badge } from "@/components/ui/badge";

export default async function RouteGroupsPage() {
	const t = await getTranslations("routing.groups");

	return (
		<DemoPage title={t("title")} description={t("description")}>
			<Section title={t("fileStructure")}>
				<FileTree>{`app/
├── (marketing)/          ← Group: not in URL
│   ├── layout.tsx        ← Marketing-specific layout
│   ├── page.tsx          ← / (home)
│   └── about/
│       └── page.tsx      ← /about
│
├── (shop)/               ← Group: not in URL
│   ├── layout.tsx        ← Shop-specific layout (with cart sidebar)
│   ├── products/
│   │   └── page.tsx      ← /products
│   └── cart/
│       └── page.tsx      ← /cart
│
└── (api-demo)/           ← Group: not in URL
    └── api/
        └── [...route]/
            └── route.ts  ← /api/*`}</FileTree>
			</Section>

			<Section title={t("liveExample")}>
				<DemoBox title="Live Example">
					<div className="space-y-3">
						<p className="text-sm text-muted-foreground">
							{t("liveExampleDesc")}
						</p>
						<div className="space-y-2">
							<div className="flex items-center gap-2">
								<Badge variant="secondary" className="font-mono">
									(learn)
								</Badge>
								<span className="text-sm text-muted-foreground">
									{t("learnGroup")}
								</span>
							</div>
							<div className="flex items-center gap-2">
								<Badge variant="secondary" className="font-mono">
									(api-demo)
								</Badge>
								<span className="text-sm text-muted-foreground">
									{t("apiGroup")}
								</span>
							</div>
						</div>
						<p className="text-sm text-muted-foreground">
							{t("urlNote")}{" "}
							<code className="bg-muted px-1.5 py-0.5 rounded text-xs">
								/routing/groups
							</code>{" "}
							{t("urlNoteEnd")}
						</p>
					</div>
				</DemoBox>
			</Section>

			<Section title={t("multipleLayouts")}>
				<p className="text-sm text-muted-foreground mb-3">
					{t("multipleLayoutsDesc")}
				</p>
				<CodeBlock
					filename="app/(marketing)/layout.tsx"
					language="tsx"
				>{`// Marketing pages: full-width, no sidebar
export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-7xl mx-auto">
      <MarketingNav />
      {children}
      <Footer />
    </div>
  );
}`}</CodeBlock>
				<div className="mt-3" />
				<CodeBlock
					filename="app/(shop)/layout.tsx"
					language="tsx"
				>{`// Shop pages: sidebar with cart, narrower content
export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <CartSidebar />
      <main className="flex-1">{children}</main>
    </div>
  );
}`}</CodeBlock>
			</Section>

			<Section title={t("keyPoints")}>
				<div className="grid gap-3 sm:grid-cols-2">
					<DemoBox title={t("urlNotAffected")}>
						<p className="text-sm text-muted-foreground">
							{t("urlNotAffectedDesc")}
						</p>
					</DemoBox>
					<DemoBox title={t("separateLayouts")}>
						<p className="text-sm text-muted-foreground">
							{t("separateLayoutsDesc")}
						</p>
					</DemoBox>
					<DemoBox title={t("noDuplicates")}>
						<p className="text-sm text-muted-foreground">
							{t("noDuplicatesDesc")}
						</p>
					</DemoBox>
					<DemoBox title={t("fullReload")}>
						<p className="text-sm text-muted-foreground">
							{t("fullReloadDesc")}
						</p>
					</DemoBox>
				</div>
			</Section>
		</DemoPage>
	);
}
