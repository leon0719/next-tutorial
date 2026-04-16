import { getTranslations } from "next-intl/server";
import { CodeBlock, DemoBox, DemoPage, Section } from "@/components/demo-page";

export default async function CSSPage() {
	const t = await getTranslations("ui.css");
	return (
		<DemoPage title={t("title")} description={t("description")}>
			<Section title={t("tailwindV4Title")} description={t("tailwindV4Desc")}>
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

			<Section title={t("liveTailwindTitle")}>
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

			<Section title={t("cssModulesTitle")}>
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

			<Section title={t("globalCssTitle")}>
				<p className="text-sm text-muted-foreground mb-3">
					{t("globalCssText")}
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

			<Section title={t("keyPointsTitle")}>
				<div className="grid gap-3 sm:grid-cols-2">
					<DemoBox title={t("tailwindV4ChangesTitle")}>
						<p className="text-sm text-muted-foreground">
							{t("tailwindV4ChangesText")}
						</p>
					</DemoBox>
					<DemoBox title={t("cssModulesScopingTitle")}>
						<p className="text-sm text-muted-foreground">
							{t("cssModulesScopingText")}
						</p>
					</DemoBox>
					<DemoBox title={t("cssVariablesTitle")}>
						<p className="text-sm text-muted-foreground">
							{t("cssVariablesText")}
						</p>
					</DemoBox>
					<DemoBox title={t("noRuntimeCssInJsTitle")}>
						<p className="text-sm text-muted-foreground">
							{t("noRuntimeCssInJsText")}
						</p>
					</DemoBox>
				</div>
			</Section>
		</DemoPage>
	);
}
