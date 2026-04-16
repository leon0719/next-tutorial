import {
	CodeBlock,
	DemoBox,
	DemoPage,
	FileTree,
	Section,
} from "@/components/demo-page";
import { Badge } from "@/components/ui/badge";

export default function RouteGroupsPage() {
	return (
		<DemoPage
			title="Route Groups"
			description="Route groups organize routes without affecting the URL structure. Wrap a folder name in parentheses (folderName) to create a group."
		>
			<Section title="File Structure">
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

			<Section title="This Project Uses Route Groups!">
				<DemoBox title="Live Example">
					<div className="space-y-3">
						<p className="text-sm text-muted-foreground">
							This learning hub uses two route groups:
						</p>
						<div className="space-y-2">
							<div className="flex items-center gap-2">
								<Badge variant="secondary" className="font-mono">
									(learn)
								</Badge>
								<span className="text-sm text-muted-foreground">
									→ All demo pages with sidebar layout (this page!)
								</span>
							</div>
							<div className="flex items-center gap-2">
								<Badge variant="secondary" className="font-mono">
									(api-demo)
								</Badge>
								<span className="text-sm text-muted-foreground">
									→ API routes handled by Hono
								</span>
							</div>
						</div>
						<p className="text-sm text-muted-foreground">
							The URL for this page is{" "}
							<code className="bg-muted px-1.5 py-0.5 rounded text-xs">
								/routing/groups
							</code>{" "}
							— notice{" "}
							<code className="bg-muted px-1.5 py-0.5 rounded text-xs">
								(learn)
							</code>{" "}
							is NOT in the URL!
						</p>
					</div>
				</DemoBox>
			</Section>

			<Section title="Multiple Layouts">
				<p className="text-sm text-muted-foreground mb-3">
					Each route group can have its own layout. This is perfect for sections
					with different UI shells.
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

			<Section title="Key Points">
				<div className="grid gap-3 sm:grid-cols-2">
					<DemoBox title="URL Not Affected">
						<p className="text-sm text-muted-foreground">
							(marketing)/about/page.tsx renders at /about, not
							/(marketing)/about. The group folder is purely organizational.
						</p>
					</DemoBox>
					<DemoBox title="Separate Layouts">
						<p className="text-sm text-muted-foreground">
							Each group can have its own layout.tsx. Great for sections with
							different UI shells (e.g., marketing site vs dashboard).
						</p>
					</DemoBox>
					<DemoBox title="No Duplicate Routes">
						<p className="text-sm text-muted-foreground">
							Routes across groups cannot resolve to the same URL.
							(marketing)/about and (shop)/about would cause a build error.
						</p>
					</DemoBox>
					<DemoBox title="Full Page Reload">
						<p className="text-sm text-muted-foreground">
							Navigating between groups with different root layouts triggers a
							full page reload (not a soft navigation).
						</p>
					</DemoBox>
				</div>
			</Section>
		</DemoPage>
	);
}
