import { getTranslations } from "next-intl/server";
import {
	CodeBlock,
	DemoBox,
	DemoPage,
	FileTree,
	Section,
} from "@/components/demo-page";
import { Badge } from "@/components/ui/badge";

export default async function InstrumentationPage() {
	const t = await getTranslations("advanced.instrumentation");
	return (
		<DemoPage title={t("title")} description={t("description")}>
			<Section
				title={t("conventionTitle")}
				description={t("conventionDescription")}
			>
				<FileTree>{`project-root/
├── instrumentation.ts     ← called once on server startup
├── app/
│   └── ...
└── next.config.ts`}</FileTree>
			</Section>

			<Section title={t("registerTitle")}>
				<p className="text-sm text-muted-foreground mb-3">
					{t("registerDesc")}
				</p>
				<CodeBlock
					filename="instrumentation.ts"
					language="tsx"
				>{`export async function register() {
  // This runs once when the server starts
  console.log('Server started at', new Date().toISOString())

  // Conditionally load heavy SDKs
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // Only load in Node.js runtime, not Edge
    const { initMonitoring } = await import('./lib/monitoring')
    initMonitoring()
  }
}`}</CodeBlock>
			</Section>

			<Section title={t("openTelemetryTitle")}>
				<p className="text-sm text-muted-foreground mb-3">
					{t("openTelemetryDesc")}
				</p>
				<CodeBlock
					filename="instrumentation.ts"
					language="tsx"
				>{`import { registerOTel } from '@vercel/otel'

export function register() {
  registerOTel({
    serviceName: 'my-next-app',
  })
}

// Or with full OpenTelemetry SDK:
export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { NodeSDK } = await import('@opentelemetry/sdk-node')
    const { SimpleSpanProcessor } = await import(
      '@opentelemetry/sdk-trace-node'
    )
    const { OTLPTraceExporter } = await import(
      '@opentelemetry/exporter-trace-otlp-http'
    )

    const sdk = new NodeSDK({
      spanProcessors: [
        new SimpleSpanProcessor(new OTLPTraceExporter()),
      ],
    })
    sdk.start()
  }
}`}</CodeBlock>
			</Section>

			<Section title={t("onRequestErrorTitle")}>
				<p className="text-sm text-muted-foreground mb-3">
					{t("onRequestErrorDesc")}
				</p>
				<CodeBlock
					filename="instrumentation.ts"
					language="tsx"
				>{`export async function onRequestError(
  err: { message: string; digest?: string },
  request: { method: string; url: string; headers: Headers },
  context: { routerKind: 'Pages Router' | 'App Router'; routePath: string }
) {
  // Report to your error tracking service
  await fetch('https://errors.example.com/report', {
    method: 'POST',
    body: JSON.stringify({
      message: err.message,
      digest: err.digest,
      url: request.url,
      route: context.routePath,
    }),
  })
}`}</CodeBlock>
			</Section>

			<Section title={t("useCasesTitle")}>
				<div className="grid gap-3 sm:grid-cols-2">
					<DemoBox title={t("loggingTitle")}>
						<div className="space-y-1 text-sm text-muted-foreground">
							<p>{t("loggingDesc")}</p>
						</div>
					</DemoBox>
					<DemoBox title={t("apmTitle")}>
						<div className="space-y-1 text-sm text-muted-foreground">
							<p>{t("apmDesc")}</p>
						</div>
					</DemoBox>
					<DemoBox title={t("tracingTitle")}>
						<div className="space-y-1 text-sm text-muted-foreground">
							<p>{t("tracingDesc")}</p>
						</div>
					</DemoBox>
					<DemoBox title={t("featureFlagsTitle")}>
						<div className="space-y-1 text-sm text-muted-foreground">
							<p>{t("featureFlagsDesc")}</p>
						</div>
					</DemoBox>
				</div>
			</Section>

			<Section title={t("keyPointsTitle")}>
				<DemoBox>
					<div className="space-y-3">
						<div className="flex items-start gap-3">
							<Badge variant="secondary" className="mt-0.5 shrink-0">
								{t("runtimeCheckBadge")}
							</Badge>
							<p className="text-sm text-muted-foreground">
								{t("runtimeCheckDesc")}
							</p>
						</div>
						<div className="flex items-start gap-3">
							<Badge variant="secondary" className="mt-0.5 shrink-0">
								{t("runsOnceBadge")}
							</Badge>
							<p className="text-sm text-muted-foreground">
								{t("runsOnceDesc")}
							</p>
						</div>
						<div className="flex items-start gap-3">
							<Badge variant="secondary" className="mt-0.5 shrink-0">
								{t("dynamicImportBadge")}
							</Badge>
							<p className="text-sm text-muted-foreground">
								{t("dynamicImportDesc")}
							</p>
						</div>
					</div>
				</DemoBox>
			</Section>
		</DemoPage>
	);
}
