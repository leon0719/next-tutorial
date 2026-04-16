import {
	CodeBlock,
	DemoBox,
	DemoPage,
	FileTree,
	Section,
} from "@/components/demo-page";
import { Badge } from "@/components/ui/badge";

export default function InstrumentationPage() {
	return (
		<DemoPage
			title="Instrumentation"
			description="Monitor and trace your Next.js application with the instrumentation.ts convention — integrate OpenTelemetry, custom logging, and performance monitoring."
		>
			<Section
				title="instrumentation.ts Convention"
				description="Place an instrumentation.ts file at the project root (or inside src/). Next.js calls its register() function once when the server starts."
			>
				<FileTree>{`project-root/
├── instrumentation.ts     ← called once on server startup
├── app/
│   └── ...
└── next.config.ts`}</FileTree>
			</Section>

			<Section title="The register() Function">
				<p className="text-sm text-muted-foreground mb-3">
					Export a register function that runs once when a new Next.js server
					instance is initialized. Use it to set up monitoring SDKs, loggers, or
					tracing.
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

			<Section title="OpenTelemetry Integration">
				<p className="text-sm text-muted-foreground mb-3">
					Next.js has built-in support for OpenTelemetry. Install @vercel/otel
					for the simplest setup, or configure the OpenTelemetry SDK directly.
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

			<Section title="The onRequestError Hook">
				<p className="text-sm text-muted-foreground mb-3">
					Export an onRequestError function to capture and report server-side
					errors to your observability platform.
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

			<Section title="Use Cases">
				<div className="grid gap-3 sm:grid-cols-2">
					<DemoBox title="Logging">
						<div className="space-y-1 text-sm text-muted-foreground">
							<p>
								Initialize structured logging (e.g., pino, winston) once at
								startup instead of on every request.
							</p>
						</div>
					</DemoBox>
					<DemoBox title="APM & Monitoring">
						<div className="space-y-1 text-sm text-muted-foreground">
							<p>
								Set up Datadog, New Relic, or Sentry SDKs that need to
								instrument the process before any requests are handled.
							</p>
						</div>
					</DemoBox>
					<DemoBox title="Distributed Tracing">
						<div className="space-y-1 text-sm text-muted-foreground">
							<p>
								Configure OpenTelemetry to trace requests across services with
								automatic span creation for fetch, database calls, and route
								handlers.
							</p>
						</div>
					</DemoBox>
					<DemoBox title="Feature Flags">
						<div className="space-y-1 text-sm text-muted-foreground">
							<p>
								Initialize feature flag SDKs (LaunchDarkly, Statsig) at startup
								so flags are available in all server components and middleware.
							</p>
						</div>
					</DemoBox>
				</div>
			</Section>

			<Section title="Key Points">
				<DemoBox>
					<div className="space-y-3">
						<div className="flex items-start gap-3">
							<Badge variant="secondary" className="mt-0.5 shrink-0">
								Runtime Check
							</Badge>
							<p className="text-sm text-muted-foreground">
								Use{" "}
								<code className="text-foreground">
									process.env.NEXT_RUNTIME
								</code>{" "}
								to conditionally load Node.js-only code. Edge runtime has
								limited API support.
							</p>
						</div>
						<div className="flex items-start gap-3">
							<Badge variant="secondary" className="mt-0.5 shrink-0">
								Runs Once
							</Badge>
							<p className="text-sm text-muted-foreground">
								register() is called once per server instance, not per request.
								Use it for initialization, not per-request logic.
							</p>
						</div>
						<div className="flex items-start gap-3">
							<Badge variant="secondary" className="mt-0.5 shrink-0">
								Dynamic Import
							</Badge>
							<p className="text-sm text-muted-foreground">
								Use dynamic import() inside register() to avoid loading heavy
								dependencies in environments that don&apos;t need them.
							</p>
						</div>
					</div>
				</DemoBox>
			</Section>
		</DemoPage>
	);
}
