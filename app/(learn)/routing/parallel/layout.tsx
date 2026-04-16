import { CodeBlock, DemoPage, FileTree, Section } from "@/components/demo-page";

export default function ParallelLayout({
	children,
	analytics,
	dashboard,
}: {
	children: React.ReactNode;
	analytics: React.ReactNode;
	dashboard: React.ReactNode;
}) {
	return (
		<DemoPage
			title="Parallel Routes"
			description="Parallel routes render multiple pages simultaneously in the same layout using @named slots. Each slot can have independent loading and error states."
		>
			<Section title="File Structure">
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

			<Section title="Live Demo — Slots Rendered Simultaneously">
				<div className="grid gap-4 md:grid-cols-2">
					<div className="rounded-lg border-2 border-dashed border-blue-500/30 p-1">
						<div className="mb-1 px-2 text-xs font-medium text-blue-500">
							@dashboard slot
						</div>
						{dashboard}
					</div>
					<div className="rounded-lg border-2 border-dashed border-green-500/30 p-1">
						<div className="mb-1 px-2 text-xs font-medium text-green-500">
							@analytics slot
						</div>
						{analytics}
					</div>
				</div>
				<div className="mt-4 rounded-lg border-2 border-dashed border-purple-500/30 p-1">
					<div className="mb-1 px-2 text-xs font-medium text-purple-500">
						children (page.tsx)
					</div>
					{children}
				</div>
			</Section>

			<Section title="How It Works">
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

			<Section title="Key Points">
				<div className="grid gap-3 sm:grid-cols-2">
					<div className="rounded-lg border p-4">
						<h3 className="font-medium text-sm">default.tsx is Required</h3>
						<p className="text-sm text-muted-foreground mt-1">
							On hard navigation (page refresh), Next.js needs a default for
							unmatched slots. Without it, you get a 404.
						</p>
					</div>
					<div className="rounded-lg border p-4">
						<h3 className="font-medium text-sm">Independent Loading</h3>
						<p className="text-sm text-muted-foreground mt-1">
							Each slot can have its own loading.tsx and error.tsx, so one slow
							slot won't block the others.
						</p>
					</div>
					<div className="rounded-lg border p-4">
						<h3 className="font-medium text-sm">Conditional Rendering</h3>
						<p className="text-sm text-muted-foreground mt-1">
							You can conditionally render slots based on auth state, user
							roles, or any server-side condition.
						</p>
					</div>
					<div className="rounded-lg border p-4">
						<h3 className="font-medium text-sm">Soft vs Hard Navigation</h3>
						<p className="text-sm text-muted-foreground mt-1">
							Soft navigation preserves slot state. Hard navigation (refresh)
							resets to default.tsx content.
						</p>
					</div>
				</div>
			</Section>
		</DemoPage>
	);
}
