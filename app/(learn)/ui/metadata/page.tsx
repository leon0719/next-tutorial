import { getTranslations } from "next-intl/server";
import { CodeBlock, DemoBox, DemoPage, Section } from "@/components/demo-page";

export default async function MetadataPage() {
	const t = await getTranslations("ui.metadata");
	return (
		<DemoPage title={t("title")} description={t("description")}>
			<Section
				title={t("staticMetadataTitle")}
				description={t("staticMetadataDesc")}
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

			<Section title={t("dynamicMetadataTitle")}>
				<p className="text-sm text-muted-foreground mb-3">
					{t("dynamicMetadataText")}
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

			<Section title={t("templateTitlesTitle")}>
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

			<Section title={t("specialFilesTitle")}>
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

			<Section title={t("keyPointsTitle")}>
				<div className="grid gap-3 sm:grid-cols-2">
					<DemoBox title={t("autoMergingTitle")}>
						<p className="text-sm text-muted-foreground">
							{t("autoMergingText")}
						</p>
					</DemoBox>
					<DemoBox title={t("deduplicationTitle")}>
						<p className="text-sm text-muted-foreground">
							{t("deduplicationText")}
						</p>
					</DemoBox>
					<DemoBox title={t("openGraphTitle")}>
						<p className="text-sm text-muted-foreground">
							{t("openGraphText")}
						</p>
					</DemoBox>
					<DemoBox title={t("jsonLdTitle")}>
						<p className="text-sm text-muted-foreground">
							{t.raw("jsonLdText")}
						</p>
					</DemoBox>
				</div>
			</Section>
		</DemoPage>
	);
}
