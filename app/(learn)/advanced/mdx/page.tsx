import {
	CodeBlock,
	DemoBox,
	DemoPage,
	FileTree,
	Section,
} from "@/components/demo-page";
import { Badge } from "@/components/ui/badge";

export default function MdxPage() {
	return (
		<DemoPage
			title="MDX"
			description="Write JSX in your Markdown — combine the simplicity of content authoring with the power of React components for interactive documentation and blog posts."
		>
			<Section
				title="What is MDX?"
				description="MDX lets you use JSX directly in Markdown files. You can import and use React components alongside standard Markdown content."
			>
				<DemoBox>
					<div className="flex items-start gap-3">
						<Badge variant="secondary" className="mt-0.5 shrink-0">
							MDX
						</Badge>
						<p className="text-sm text-muted-foreground">
							MDX is a superset of Markdown. Any valid Markdown is valid MDX,
							but you can also embed JSX expressions, import statements, and
							export metadata.
						</p>
					</div>
				</DemoBox>
			</Section>

			<Section title="@next/mdx Setup">
				<p className="text-sm text-muted-foreground mb-3">
					Install @next/mdx and configure your next.config.ts to handle .mdx
					files as pages or imports.
				</p>
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

			<Section title=".mdx File Convention">
				<p className="text-sm text-muted-foreground mb-3">
					MDX files in the app directory work just like page.tsx files. You can
					also import .mdx files as components.
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

			<Section title="Using Components in MDX">
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

			<Section title="mdx-components.tsx">
				<p className="text-sm text-muted-foreground mb-3">
					Define a mdx-components.tsx file at the project root to customize how
					standard HTML elements are rendered in MDX content.
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

			<Section title="Frontmatter & Metadata">
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

			<Section title="Key Points">
				<div className="grid gap-3 sm:grid-cols-2">
					<DemoBox title="Server Components by Default">
						<p className="text-sm text-muted-foreground">
							MDX pages in the App Router are Server Components. Add &quot;use
							client&quot; as an export if you need interactivity.
						</p>
					</DemoBox>
					<DemoBox title="Remark & Rehype Plugins">
						<p className="text-sm text-muted-foreground">
							Extend MDX with remark plugins (Markdown AST) and rehype plugins
							(HTML AST) for features like syntax highlighting or math
							rendering.
						</p>
					</DemoBox>
					<DemoBox title="Type Safety">
						<p className="text-sm text-muted-foreground">
							Props passed to components in MDX files are type-checked. Your IDE
							will show errors if you pass the wrong props.
						</p>
					</DemoBox>
					<DemoBox title="Remote MDX">
						<p className="text-sm text-muted-foreground">
							For MDX from a CMS or database, use next-mdx-remote or mdx-bundler
							to compile MDX at runtime with full component support.
						</p>
					</DemoBox>
				</div>
			</Section>
		</DemoPage>
	);
}
