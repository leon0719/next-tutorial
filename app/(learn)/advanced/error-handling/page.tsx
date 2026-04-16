import { getTranslations } from "next-intl/server";
import {
	CodeBlock,
	DemoBox,
	DemoPage,
	FileTree,
	Section,
} from "@/components/demo-page";
import { Badge } from "@/components/ui/badge";
import { ErrorTrigger } from "./error-trigger";

export default async function ErrorHandlingPage() {
	const t = await getTranslations("advanced.errorHandling");
	return (
		<DemoPage title={t("title")} description={t("description")}>
			<Section
				title={t("errorTsxConventionTitle")}
				description={t("errorTsxConventionDescription")}
			>
				<FileTree>{`app/
├── layout.tsx
├── error.tsx          ← catches errors in page.tsx and children
├── page.tsx
└── dashboard/
    ├── error.tsx      ← catches errors only in this segment
    └── page.tsx`}</FileTree>
				<DemoBox>
					<div className="flex items-start gap-3">
						<Badge variant="secondary" className="mt-0.5 shrink-0">
							Important
						</Badge>
						<p className="text-sm text-muted-foreground">
							{t("importantNote")}
						</p>
					</div>
				</DemoBox>
			</Section>

			<Section title={t("basicErrorTitle")}>
				<CodeBlock
					filename="app/dashboard/error.tsx"
					language="tsx"
				>{`"use client";

import { Button } from "@/components/ui/button";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="text-center py-16">
      <h2>Something went wrong</h2>
      <p>{error.message}</p>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  );
}`}</CodeBlock>
			</Section>

			<Section
				title={t("globalErrorTitle")}
				description={t("globalErrorDescription")}
			>
				<CodeBlock
					filename="app/global-error.tsx"
					language="tsx"
				>{`"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <h2>Something went wrong!</h2>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  );
}`}</CodeBlock>
			</Section>

			<Section title={t("errorRecoveryTitle")}>
				<DemoBox title={t("howResetWorksTitle")}>
					<div className="space-y-2 text-sm text-muted-foreground">
						<p>{t("howResetWorksDesc1")}</p>
						<p>{t("howResetWorksDesc2")}</p>
					</div>
				</DemoBox>
			</Section>

			<Section title={t("liveDemoTitle")}>
				<ErrorTrigger />
			</Section>

			<Section title={t("keyPointsTitle")}>
				<div className="grid gap-3 sm:grid-cols-2">
					<DemoBox title={t("clientComponentRequiredTitle")}>
						<p className="text-sm text-muted-foreground">
							{t("clientComponentRequiredDesc")}
						</p>
					</DemoBox>
					<DemoBox title={t("nestedBoundariesTitle")}>
						<p className="text-sm text-muted-foreground">
							{t("nestedBoundariesDesc")}
						</p>
					</DemoBox>
					<DemoBox title={t("layoutErrorsTitle")}>
						<p className="text-sm text-muted-foreground">
							{t("layoutErrorsDesc")}
						</p>
					</DemoBox>
					<DemoBox title={t("productionDigestTitle")}>
						<p className="text-sm text-muted-foreground">
							{t("productionDigestDesc")}
						</p>
					</DemoBox>
				</div>
			</Section>
		</DemoPage>
	);
}
