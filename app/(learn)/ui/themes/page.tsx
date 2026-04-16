import { CodeBlock, DemoBox, DemoPage, Section } from "@/components/demo-page";
import { ThemeDemo } from "./theme-demo";

export default function ThemesPage() {
	return (
		<DemoPage
			title="Theming"
			description="This project uses next-themes for dark mode support with CSS variables for color tokens."
		>
			<Section
				title="Live Theme Switcher"
				description="Toggle between themes and see CSS variables update in real time."
			>
				<ThemeDemo />
			</Section>

			<Section title="Setting Up next-themes">
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

			<Section title="CSS Variables for Themes">
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

			<Section title="Using useTheme">
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

			<Section title="Key Points">
				<div className="grid gap-3 sm:grid-cols-2">
					<DemoBox title="No Flash of Wrong Theme">
						<p className="text-sm text-muted-foreground">
							next-themes injects a script before hydration to set the correct
							class, preventing a flash of the wrong theme.
						</p>
					</DemoBox>
					<DemoBox title="System Preference">
						<p className="text-sm text-muted-foreground">
							With enableSystem, the theme automatically follows the OS
							preference. resolvedTheme gives the actual active theme.
						</p>
					</DemoBox>
					<DemoBox title="CSS Variables Strategy">
						<p className="text-sm text-muted-foreground">
							Define colors as CSS variables in :root and .dark. Components
							reference variables, making theme changes instant.
						</p>
					</DemoBox>
					<DemoBox title="Server Components">
						<p className="text-sm text-muted-foreground">
							useTheme only works in Client Components. Server Components render
							with CSS variables that resolve at paint time.
						</p>
					</DemoBox>
				</div>
			</Section>
		</DemoPage>
	);
}
