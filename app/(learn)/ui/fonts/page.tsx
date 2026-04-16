import { getTranslations } from "next-intl/server";
import { CodeBlock, DemoBox, DemoPage, Section } from "@/components/demo-page";

export default async function FontsPage() {
	const t = await getTranslations("ui.fonts");
	return (
		<DemoPage title={t("title")} description={t("description")}>
			<Section title={t("fontSetupTitle")} description={t("fontSetupDesc")}>
				<div className="space-y-4 rounded-lg border p-6">
					<div>
						<p className="text-xs text-muted-foreground mb-1">
							{t("fontSansLabel")}
						</p>
						<p className="font-sans text-2xl">{t("fontSample")}</p>
					</div>
					<div>
						<p className="text-xs text-muted-foreground mb-1">
							{t("fontMonoLabel")}
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

			<Section title={t("cssVariablesTailwindTitle")}>
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

			<Section title={t("localFontsTitle")}>
				<p className="text-sm text-muted-foreground mb-3">
					{t("localFontsText")}
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

			<Section title={t("keyPointsTitle")}>
				<div className="grid gap-3 sm:grid-cols-2">
					<DemoBox title={t("zeroLayoutShiftTitle")}>
						<p className="text-sm text-muted-foreground">
							{t("zeroLayoutShiftText")}
						</p>
					</DemoBox>
					<DemoBox title={t("cssVariablesApproachTitle")}>
						<p className="text-sm text-muted-foreground">
							{t("cssVariablesApproachText")}
						</p>
					</DemoBox>
					<DemoBox title={t("autoSubsettingTitle")}>
						<p className="text-sm text-muted-foreground">
							{t("autoSubsettingText")}
						</p>
					</DemoBox>
					<DemoBox title={t("noExternalRequestsTitle")}>
						<p className="text-sm text-muted-foreground">
							{t("noExternalRequestsText")}
						</p>
					</DemoBox>
				</div>
			</Section>
		</DemoPage>
	);
}
