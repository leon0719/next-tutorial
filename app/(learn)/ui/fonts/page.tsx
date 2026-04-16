import { CodeBlock, DemoBox, DemoPage, Section } from "@/components/demo-page";

export default function FontsPage() {
	return (
		<DemoPage
			title="Font Optimization"
			description="Next.js automatically self-hosts Google Fonts with zero layout shift. This project uses Geist Sans and Geist Mono."
		>
			<Section
				title="This Project's Font Setup"
				description="Geist fonts are loaded in the root layout and applied via CSS variables."
			>
				<div className="space-y-4 rounded-lg border p-6">
					<div>
						<p className="text-xs text-muted-foreground mb-1">
							font-sans (Geist Sans)
						</p>
						<p className="font-sans text-2xl">
							The quick brown fox jumps over the lazy dog
						</p>
					</div>
					<div>
						<p className="text-xs text-muted-foreground mb-1">
							font-mono (Geist Mono)
						</p>
						<p className="font-mono text-2xl">const x = 42;</p>
					</div>
				</div>
				<CodeBlock
					filename="app/layout.tsx"
					language="tsx"
				>{`import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html className={\`\${geistSans.variable} \${geistMono.variable}\`}>
      <body>{children}</body>
    </html>
  );
}`}</CodeBlock>
			</Section>

			<Section title="Using CSS Variables with Tailwind">
				<CodeBlock filename="app/globals.css" language="css">{`@theme inline {
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}

@layer base {
  html {
    @apply font-sans;
  }
}`}</CodeBlock>
			</Section>

			<Section title="Local Fonts">
				<p className="text-sm text-muted-foreground mb-3">
					Use next/font/local for custom font files stored in your project.
				</p>
				<CodeBlock
					filename="app/layout.tsx"
					language="tsx"
				>{`import localFont from "next/font/local";

const myFont = localFont({
  src: [
    { path: "./fonts/Regular.woff2", weight: "400" },
    { path: "./fonts/Bold.woff2", weight: "700" },
  ],
  variable: "--font-my-font",
});

export default function RootLayout({ children }) {
  return (
    <html className={myFont.variable}>
      <body>{children}</body>
    </html>
  );
}`}</CodeBlock>
			</Section>

			<Section title="Key Points">
				<div className="grid gap-3 sm:grid-cols-2">
					<DemoBox title="Zero Layout Shift">
						<p className="text-sm text-muted-foreground">
							Fonts are self-hosted at build time using size-adjust, eliminating
							flash of unstyled text (FOUT) and CLS.
						</p>
					</DemoBox>
					<DemoBox title="CSS Variables Approach">
						<p className="text-sm text-muted-foreground">
							Use the variable option to create a CSS custom property, then
							reference it in Tailwind or your CSS.
						</p>
					</DemoBox>
					<DemoBox title="Automatic Subsetting">
						<p className="text-sm text-muted-foreground">
							Google Fonts are automatically subset to only include the
							characters needed for your specified subsets.
						</p>
					</DemoBox>
					<DemoBox title="No External Requests">
						<p className="text-sm text-muted-foreground">
							Font files are downloaded at build time and served from your
							domain. No requests to Google at runtime.
						</p>
					</DemoBox>
				</div>
			</Section>
		</DemoPage>
	);
}
