import Link from "next/link";
import {
	CodeBlock,
	DemoBox,
	DemoPage,
	FileTree,
	Section,
} from "@/components/demo-page";
import { Badge } from "@/components/ui/badge";

export default async function DynamicRoutePage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;

	return (
		<DemoPage
			title="Dynamic Routes"
			description="Dynamic segments let you create pages from dynamic data. The [slug] folder name becomes a route parameter."
		>
			<Section title="File Structure">
				<FileTree>{`app/(learn)/routing/dynamic/
└── [slug]/
    └── page.tsx    ← This file!

URL examples:
  /routing/dynamic/hello-world  → slug = "hello-world"
  /routing/dynamic/my-post      → slug = "my-post"
  /routing/dynamic/123          → slug = "123"`}</FileTree>
			</Section>

			<Section title="Current Route Parameter">
				<DemoBox title="Live Demo">
					<div className="space-y-3">
						<div className="flex items-center gap-2">
							<span className="text-sm text-muted-foreground">
								Current slug:
							</span>
							<Badge
								variant="secondary"
								className="font-mono text-base px-3 py-1"
							>
								{slug}
							</Badge>
						</div>
						<p className="text-sm text-muted-foreground">
							Try changing the URL! Replace the last segment with anything.
						</p>
						<div className="flex flex-wrap gap-2">
							<Link
								href="/routing/dynamic/hello-world"
								className="text-sm underline underline-offset-4 hover:text-foreground text-muted-foreground"
							>
								/dynamic/hello-world
							</Link>
							<Link
								href="/routing/dynamic/next-js-16"
								className="text-sm underline underline-offset-4 hover:text-foreground text-muted-foreground"
							>
								/dynamic/next-js-16
							</Link>
							<Link
								href="/routing/dynamic/42"
								className="text-sm underline underline-offset-4 hover:text-foreground text-muted-foreground"
							>
								/dynamic/42
							</Link>
						</div>
					</div>
				</DemoBox>
			</Section>

			<Section title="How It Works">
				<p className="text-sm text-muted-foreground mb-3">
					In Next.js 16, params is a Promise and must be awaited. This is a
					breaking change from earlier versions.
				</p>
				<CodeBlock
					filename="app/blog/[slug]/page.tsx"
					language="tsx"
				>{`// Next.js 16: params is a Promise!
export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return <h1>Post: {slug}</h1>;
}

// Generate static pages at build time
export function generateStaticParams() {
  return [
    { slug: "hello-world" },
    { slug: "getting-started" },
    { slug: "advanced-patterns" },
  ];
}`}</CodeBlock>
			</Section>

			<Section title="Multiple Dynamic Segments">
				<CodeBlock
					filename="app/shop/[category]/[product]/page.tsx"
					language="tsx"
				>{`export default async function ProductPage({
  params,
}: {
  params: Promise<{ category: string; product: string }>;
}) {
  const { category, product } = await params;

  return (
    <div>
      <p>Category: {category}</p>
      <p>Product: {product}</p>
    </div>
  );
}

// /shop/electronics/iphone → category="electronics", product="iphone"`}</CodeBlock>
			</Section>

			<Section title="Key Points">
				<div className="grid gap-3 sm:grid-cols-2">
					<DemoBox title="params is a Promise">
						<p className="text-sm text-muted-foreground">
							In Next.js 16, params must be awaited in Server Components. In
							Client Components, use React.use(params) instead.
						</p>
					</DemoBox>
					<DemoBox title="generateStaticParams">
						<p className="text-sm text-muted-foreground">
							Use generateStaticParams() to pre-render dynamic routes at build
							time (SSG). Unknown slugs are rendered on-demand (SSR) by default.
						</p>
					</DemoBox>
				</div>
			</Section>
		</DemoPage>
	);
}
