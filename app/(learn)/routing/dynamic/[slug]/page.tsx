import Link from "next/link";
import { getTranslations } from "next-intl/server";
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
	const t = await getTranslations("routing.dynamic");

	return (
		<DemoPage title={t("title")} description={t("description")}>
			<Section title={t("fileStructure")}>
				<FileTree>{`app/(learn)/routing/dynamic/
└── [slug]/
    └── page.tsx    ← This file!

URL examples:
  /routing/dynamic/hello-world  → slug = "hello-world"
  /routing/dynamic/my-post      → slug = "my-post"
  /routing/dynamic/123          → slug = "123"`}</FileTree>
			</Section>

			<Section title={t("currentParam")}>
				<DemoBox title="Live Demo">
					<div className="space-y-3">
						<div className="flex items-center gap-2">
							<span className="text-sm text-muted-foreground">
								{t("currentSlug")}
							</span>
							<Badge
								variant="secondary"
								className="font-mono text-base px-3 py-1"
							>
								{slug}
							</Badge>
						</div>
						<p className="text-sm text-muted-foreground">{t("tryChanging")}</p>
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

			<Section title={t("howItWorks")}>
				<p className="text-sm text-muted-foreground mb-3">
					{t("howItWorksDesc")}
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

			<Section title={t("multipleSegments")}>
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

			<Section title={t("keyPoints")}>
				<div className="grid gap-3 sm:grid-cols-2">
					<DemoBox title={t("paramsPromise")}>
						<p className="text-sm text-muted-foreground">
							{t("paramsPromiseDesc")}
						</p>
					</DemoBox>
					<DemoBox title={t("generateStatic")}>
						<p className="text-sm text-muted-foreground">
							{t("generateStaticDesc")}
						</p>
					</DemoBox>
				</div>
			</Section>
		</DemoPage>
	);
}
