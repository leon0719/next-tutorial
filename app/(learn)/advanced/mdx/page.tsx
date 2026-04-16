import { getTranslations } from "next-intl/server";
import {
	CodeBlock,
	DemoBox,
	DemoPage,
	FileTree,
	Section,
} from "@/components/demo-page";
import { Badge } from "@/components/ui/badge";

export default async function MdxPage() {
	const t = await getTranslations("advanced.mdx");
	return (
		<DemoPage title={t("title")} description={t("description")}>
			<Section
				title={t("whatIsMdxTitle")}
				description={t("whatIsMdxDescription")}
			>
				<DemoBox>
					<div className="flex items-start gap-3">
						<Badge variant="secondary" className="mt-0.5 shrink-0">
							MDX
						</Badge>
						<p className="text-sm text-muted-foreground">
							{t("whatIsMdxNote")}
						</p>
					</div>
				</DemoBox>
			</Section>

			<Section title={t("setupTitle")}>
				<p className="text-sm text-muted-foreground mb-3">{t("setupDesc")}</p>
				<CodeBlock
					filename="next.config.ts"
					language="tsx"
				>{`import createMDX from '@next/mdx'

const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
}

const withMDX = createMDX({
  // Optionally add remark/rehype plugins
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})

export default withMDX(nextConfig)`}</CodeBlock>
			</Section>

			<Section title={t("fileConventionTitle")}>
				<p className="text-sm text-muted-foreground mb-3">
					{t("fileConventionDesc")}
				</p>
				<FileTree>{`app/
├── blog/
│   └── my-post/
│       └── page.mdx      ← renders as /blog/my-post
├── components/
│   └── chart.tsx
└── content/
    └── intro.mdx          ← importable as a component`}</FileTree>
			</Section>

			<Section title={t("usingComponentsTitle")}>
				<CodeBlock
					filename="app/blog/my-post/page.mdx"
					language="mdx"
				>{`import { Chart } from '@/components/chart'
import { Callout } from '@/components/callout'

# My Blog Post

Here is regular **Markdown** content.

<Callout type="info">
  This is a custom React component inside Markdown!
</Callout>

## Data Visualization

<Chart data={[10, 20, 30, 40]} />

You can mix Markdown and JSX freely.`}</CodeBlock>
			</Section>

			<Section title={t("mdxComponentsTitle")}>
				<p className="text-sm text-muted-foreground mb-3">
					{t("mdxComponentsDesc")}
				</p>
				<CodeBlock
					filename="mdx-components.tsx"
					language="tsx"
				>{`import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(
  components: MDXComponents
): MDXComponents {
  return {
    // Override default HTML elements with custom components
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>
    ),
    p: ({ children }) => (
      <p className="text-muted-foreground leading-7 mb-4">{children}</p>
    ),
    code: ({ children }) => (
      <code className="bg-muted px-1.5 py-0.5 rounded text-sm">
        {children}
      </code>
    ),
    // Spread existing components to allow per-page overrides
    ...components,
  }
}`}</CodeBlock>
			</Section>

			<Section title={t("frontmatterTitle")}>
				<CodeBlock
					filename="app/blog/post/page.mdx"
					language="mdx"
				>{`export const metadata = {
  title: 'My Blog Post',
  description: 'Learn about MDX in Next.js',
}

# {metadata.title}

Content goes here...`}</CodeBlock>
			</Section>

			<Section title={t("keyPointsTitle")}>
				<div className="grid gap-3 sm:grid-cols-2">
					<DemoBox title={t("serverComponentsTitle")}>
						<p className="text-sm text-muted-foreground">
							{t("serverComponentsDesc")}
						</p>
					</DemoBox>
					<DemoBox title={t("remarkRehypeTitle")}>
						<p className="text-sm text-muted-foreground">
							{t("remarkRehypeDesc")}
						</p>
					</DemoBox>
					<DemoBox title={t("typeSafetyTitle")}>
						<p className="text-sm text-muted-foreground">
							{t("typeSafetyDesc")}
						</p>
					</DemoBox>
					<DemoBox title={t("remoteMdxTitle")}>
						<p className="text-sm text-muted-foreground">
							{t("remoteMdxDesc")}
						</p>
					</DemoBox>
				</div>
			</Section>
		</DemoPage>
	);
}
