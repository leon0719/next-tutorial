import { CodeBlock, DemoBox, DemoPage, Section } from "@/components/demo-page";

export default function CSSPage() {
	return (
		<DemoPage
			title="CSS Styling"
			description="Next.js supports multiple CSS approaches. Tailwind CSS v4 is the recommended default, with CSS Modules and global CSS also available."
		>
			<Section
				title="Tailwind CSS v4"
				description="Tailwind v4 uses native CSS @import instead of tailwind.config.js. This project already uses it."
			>
				<CodeBlock
					filename="app/globals.css"
					language="css"
				>{`@import "tailwindcss";
@import "tw-animate-css";

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-sans);
  --font-mono: var(--font-geist-mono);
}

@layer base {
  body {
    @apply bg-background text-foreground;
  }
}`}</CodeBlock>
			</Section>

			<Section title="Live Tailwind Example">
				<div className="flex flex-wrap gap-3">
					<div className="rounded-lg bg-primary px-4 py-2 text-primary-foreground text-sm font-medium">
						Primary
					</div>
					<div className="rounded-lg bg-secondary px-4 py-2 text-secondary-foreground text-sm font-medium">
						Secondary
					</div>
					<div className="rounded-lg bg-destructive px-4 py-2 text-white text-sm font-medium">
						Destructive
					</div>
					<div className="rounded-lg bg-muted px-4 py-2 text-muted-foreground text-sm font-medium">
						Muted
					</div>
				</div>
				<CodeBlock language="tsx">{`<div className="rounded-lg bg-primary px-4 py-2 text-primary-foreground">
  Primary
</div>`}</CodeBlock>
			</Section>

			<Section title="CSS Modules">
				<CodeBlock
					filename="components/button.module.css"
					language="css"
				>{`.button {
  background: var(--primary);
  color: var(--primary-foreground);
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
}

.button:hover {
  opacity: 0.9;
}`}</CodeBlock>
				<CodeBlock
					filename="components/button.tsx"
					language="tsx"
				>{`import styles from "./button.module.css";

export function Button() {
  return <button className={styles.button}>Click me</button>;
}`}</CodeBlock>
			</Section>

			<Section title="Global CSS">
				<p className="text-sm text-muted-foreground mb-3">
					Import global CSS in your root layout. It applies to all routes.
				</p>
				<CodeBlock
					filename="app/layout.tsx"
					language="tsx"
				>{`import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}`}</CodeBlock>
			</Section>

			<Section title="Key Points">
				<div className="grid gap-3 sm:grid-cols-2">
					<DemoBox title="Tailwind v4 Changes">
						<p className="text-sm text-muted-foreground">
							No more tailwind.config.js. Configuration is done via CSS with
							@theme and @custom-variant directives.
						</p>
					</DemoBox>
					<DemoBox title="CSS Modules Scoping">
						<p className="text-sm text-muted-foreground">
							CSS Modules auto-scope class names to prevent conflicts. Use
							.module.css extension to enable them.
						</p>
					</DemoBox>
					<DemoBox title="CSS Variables">
						<p className="text-sm text-muted-foreground">
							This project uses CSS custom properties (oklch colors) for
							theming. Tailwind maps them via @theme inline.
						</p>
					</DemoBox>
					<DemoBox title="No Runtime CSS-in-JS">
						<p className="text-sm text-muted-foreground">
							Server Components do not support runtime CSS-in-JS libraries like
							styled-components. Use Tailwind or CSS Modules instead.
						</p>
					</DemoBox>
				</div>
			</Section>
		</DemoPage>
	);
}
