import { CodeBlock, DemoBox, DemoPage, Section } from "@/components/demo-page";

export default function MetadataPage() {
	return (
		<DemoPage
			title="Metadata & SEO"
			description="Next.js provides a Metadata API to define page metadata for improved SEO and social sharing."
		>
			<Section
				title="Static Metadata"
				description="Export a metadata object from any layout.tsx or page.tsx."
			>
				<CodeBlock
					filename="app/layout.tsx"
					language="tsx"
				>{`import type { Metadata } from "next";

// This project's actual metadata:
export const metadata: Metadata = {
  title: "Next.js Learning Hub",
  description:
    "Interactive Next.js feature showcase — learn every feature with live demos",
};`}</CodeBlock>
			</Section>

			<Section title="Dynamic Metadata">
				<p className="text-sm text-muted-foreground mb-3">
					Use generateMetadata for dynamic pages that need data fetching.
				</p>
				<CodeBlock
					filename="app/blog/[slug]/page.tsx"
					language="tsx"
				>{`import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.coverImage }],
    },
  };
}`}</CodeBlock>
			</Section>

			<Section title="Template & Default Titles">
				<CodeBlock
					filename="app/layout.tsx"
					language="tsx"
				>{`export const metadata: Metadata = {
  title: {
    default: "My App",
    template: "%s | My App", // child pages: "About | My App"
  },
};`}</CodeBlock>
				<CodeBlock
					filename="app/about/page.tsx"
					language="tsx"
				>{`export const metadata: Metadata = {
  title: "About", // renders as "About | My App"
};`}</CodeBlock>
			</Section>

			<Section title="Special Files">
				<CodeBlock language="text">{`app/
├── favicon.ico          ← auto-detected favicon
├── icon.png             ← app icon (also icon.svg)
├── apple-icon.png       ← Apple touch icon
├── opengraph-image.png  ← default OG image
├── robots.ts            ← generates robots.txt
└── sitemap.ts           ← generates sitemap.xml`}</CodeBlock>
				<CodeBlock
					filename="app/robots.ts"
					language="typescript"
				>{`import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/private/" },
    sitemap: "https://example.com/sitemap.xml",
  };
}`}</CodeBlock>
			</Section>

			<Section title="Key Points">
				<div className="grid gap-3 sm:grid-cols-2">
					<DemoBox title="Automatic Merging">
						<p className="text-sm text-muted-foreground">
							Metadata is merged from layout to page. Child metadata overrides
							parent fields, so you can set defaults in layouts.
						</p>
					</DemoBox>
					<DemoBox title="Deduplication">
						<p className="text-sm text-muted-foreground">
							Next.js automatically deduplicates meta tags. Only the deepest
							metadata for each field is rendered in the HTML head.
						</p>
					</DemoBox>
					<DemoBox title="Open Graph">
						<p className="text-sm text-muted-foreground">
							Set openGraph in metadata for rich social media previews. Place
							opengraph-image.png in any route for auto OG images.
						</p>
					</DemoBox>
					<DemoBox title="JSON-LD">
						<p className="text-sm text-muted-foreground">
							For structured data, render a script tag with
							type=&quot;application/ld+json&quot; in your page component body.
							Not part of the Metadata API.
						</p>
					</DemoBox>
				</div>
			</Section>
		</DemoPage>
	);
}
