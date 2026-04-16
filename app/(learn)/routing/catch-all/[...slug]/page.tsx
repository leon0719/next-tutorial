import Link from "next/link";
import {
	CodeBlock,
	DemoBox,
	DemoPage,
	FileTree,
	Section,
} from "@/components/demo-page";
import { Badge } from "@/components/ui/badge";

export default async function CatchAllPage({
	params,
}: {
	params: Promise<{ slug: string[] }>;
}) {
	const { slug } = await params;

	return (
		<DemoPage
			title="Catch-all Segments"
			description="[...slug] matches any number of URL segments. The parameter becomes a string array."
		>
			<Section title="File Structure">
				<FileTree>{`app/(learn)/routing/catch-all/
└── [...slug]/
    └── page.tsx    ← This file!

URL examples:
  /routing/catch-all/a         → slug = ["a"]
  /routing/catch-all/a/b       → slug = ["a", "b"]
  /routing/catch-all/a/b/c     → slug = ["a", "b", "c"]
  /routing/catch-all/x/y/z/w   → slug = ["x", "y", "z", "w"]`}</FileTree>
			</Section>

			<Section title="Current Route Segments">
				<DemoBox title="Live Demo">
					<div className="space-y-4">
						<div className="flex items-center gap-2 flex-wrap">
							<span className="text-sm text-muted-foreground">Segments:</span>
							{slug.map((segment, i) => (
								<Badge key={i} variant="secondary" className="font-mono">
									[{i}] {segment}
								</Badge>
							))}
						</div>
						<div className="flex items-center gap-2">
							<span className="text-sm text-muted-foreground">
								Total segments:
							</span>
							<Badge variant="outline">{slug.length}</Badge>
						</div>
						<div className="flex items-center gap-2">
							<span className="text-sm text-muted-foreground">
								Joined path:
							</span>
							<code className="text-sm bg-muted px-2 py-1 rounded">
								/{slug.join("/")}
							</code>
						</div>

						<div className="border-t pt-3">
							<p className="text-sm text-muted-foreground mb-2">
								Try different paths:
							</p>
							<div className="flex flex-wrap gap-2">
								<Link
									href="/routing/catch-all/docs"
									className="text-sm underline underline-offset-4 hover:text-foreground text-muted-foreground"
								>
									/catch-all/docs
								</Link>
								<Link
									href="/routing/catch-all/docs/getting-started"
									className="text-sm underline underline-offset-4 hover:text-foreground text-muted-foreground"
								>
									/catch-all/docs/getting-started
								</Link>
								<Link
									href="/routing/catch-all/2024/04/16/my-post"
									className="text-sm underline underline-offset-4 hover:text-foreground text-muted-foreground"
								>
									/catch-all/2024/04/16/my-post
								</Link>
							</div>
						</div>
					</div>
				</DemoBox>
			</Section>

			<Section title="Catch-all vs Optional Catch-all">
				<CodeBlock
					filename="comparison"
					language="tsx"
				>{`// [...slug] — Catch-all (REQUIRED, at least 1 segment)
// /shop/a        ✅ slug = ["a"]
// /shop/a/b      ✅ slug = ["a", "b"]
// /shop          ❌ 404!

// [[...slug]] — Optional Catch-all (0 or more segments)
// /shop/a        ✅ slug = ["a"]
// /shop/a/b      ✅ slug = ["a", "b"]
// /shop          ✅ slug = undefined`}</CodeBlock>
			</Section>

			<Section title="Code Example">
				<CodeBlock
					filename="app/docs/[...slug]/page.tsx"
					language="tsx"
				>{`export default async function DocsPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;

  // Build breadcrumb from segments
  const breadcrumb = slug.map((segment, i) => ({
    label: segment.replace(/-/g, " "),
    href: "/docs/" + slug.slice(0, i + 1).join("/"),
  }));

  return (
    <nav>
      {breadcrumb.map((item) => (
        <Link key={item.href} href={item.href}>
          {item.label}
        </Link>
      ))}
    </nav>
  );
}`}</CodeBlock>
			</Section>

			<Section title="Use Cases">
				<div className="grid gap-3 sm:grid-cols-2">
					<DemoBox title="Documentation Sites">
						<p className="text-sm text-muted-foreground">
							/docs/getting-started/installation — nested doc pages with dynamic
							depth.
						</p>
					</DemoBox>
					<DemoBox title="Blog with Dates">
						<p className="text-sm text-muted-foreground">
							/blog/2024/04/16/my-post — date-based URL structure parsed from
							segments.
						</p>
					</DemoBox>
				</div>
			</Section>
		</DemoPage>
	);
}
