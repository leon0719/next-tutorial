import { getTranslations } from "next-intl/server";
import { CodeBlock, DemoBox, DemoPage, Section } from "@/components/demo-page";
import { ThemeDemo } from "./theme-demo";

export default async function ThemesPage() {
	const t = await getTranslations("ui.themes");
	return (
		<DemoPage title={t("title")} description={t("description")}>
			<Section
				title={t("liveSwitcherTitle")}
				description={t("liveSwitcherDesc")}
			>
				<ThemeDemo />
			</Section>

			<Section title={t("settingUpTitle")}>
				<CodeBlock filename="app/providers.tsx" language="tsx">{`"use client";
import { ThemeProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}`}</CodeBlock>
				<CodeBlock
					filename="app/layout.tsx"
					language="tsx"
				>{`export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
// suppressHydrationWarning prevents React warnings
// from the theme script that runs before hydration`}</CodeBlock>
			</Section>

			<Section title={t("cssVariablesTitle")}>
				<CodeBlock filename="app/globals.css" language="css">{`:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  /* ... more tokens */
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --primary: oklch(0.922 0 0);
  --primary-foreground: oklch(0.205 0 0);
  /* ... more tokens */
}`}</CodeBlock>
			</Section>

			<Section title={t("useThemeTitle")}>
				<CodeBlock
					filename="components/theme-toggle.tsx"
					language="tsx"
				>{`"use client";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  return (
    <button onClick={() =>
      setTheme(resolvedTheme === "dark" ? "light" : "dark")
    }>
      {resolvedTheme === "dark" ? "🌞" : "🌙"}
    </button>
  );
}`}</CodeBlock>
			</Section>

			<Section title={t("keyPointsTitle")}>
				<div className="grid gap-3 sm:grid-cols-2">
					<DemoBox title={t("noFlashTitle")}>
						<p className="text-sm text-muted-foreground">{t("noFlashText")}</p>
					</DemoBox>
					<DemoBox title={t("systemPreferenceTitle")}>
						<p className="text-sm text-muted-foreground">
							{t("systemPreferenceText")}
						</p>
					</DemoBox>
					<DemoBox title={t("cssVariablesStrategyTitle")}>
						<p className="text-sm text-muted-foreground">
							{t("cssVariablesStrategyText")}
						</p>
					</DemoBox>
					<DemoBox title={t("serverComponentsTitle")}>
						<p className="text-sm text-muted-foreground">
							{t("serverComponentsText")}
						</p>
					</DemoBox>
				</div>
			</Section>
		</DemoPage>
	);
}
