import {
	CodeBlock,
	DemoBox,
	DemoPage,
	FileTree,
	Section,
} from "@/components/demo-page";
import { Badge } from "@/components/ui/badge";
import { ErrorTrigger } from "./error-trigger";

export default function ErrorHandlingPage() {
	return (
		<DemoPage
			title="Error Handling"
			description="Gracefully handle runtime errors with error.tsx boundaries — catch, display, and recover from errors without crashing your entire app."
		>
			<Section
				title="error.tsx Convention"
				description="Next.js uses React Error Boundaries under the hood. An error.tsx file automatically wraps a route segment and its children."
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
							error.tsx must be a Client Component (&quot;use client&quot;).
							Error boundaries use React&apos;s class component lifecycle which
							only works on the client.
						</p>
					</div>
				</DemoBox>
			</Section>

			<Section title="Basic error.tsx">
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
				title="global-error.tsx"
				description="Catches errors in the root layout itself. It must render its own <html> and <body> tags since it replaces the root layout when active."
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

			<Section title="Error Recovery with reset()">
				<DemoBox title="How reset() works">
					<div className="space-y-2 text-sm text-muted-foreground">
						<p>
							The <code className="text-foreground">reset()</code> function
							attempts to re-render the error boundary&apos;s children. If the
							error was transient (e.g., a network hiccup), the re-render may
							succeed without the error recurring.
						</p>
						<p>
							In production,{" "}
							<code className="text-foreground">error.digest</code> provides a
							hash of the error for server-side log correlation without exposing
							sensitive details to the client.
						</p>
					</div>
				</DemoBox>
			</Section>

			<Section title="Live Demo">
				<ErrorTrigger />
			</Section>

			<Section title="Key Points">
				<div className="grid gap-3 sm:grid-cols-2">
					<DemoBox title="Client Component Required">
						<p className="text-sm text-muted-foreground">
							error.tsx must start with &quot;use client&quot; — React error
							boundaries only work as client components.
						</p>
					</DemoBox>
					<DemoBox title="Nested Boundaries">
						<p className="text-sm text-muted-foreground">
							Errors bubble up to the nearest error boundary. More specific
							boundaries prevent the entire page from being replaced.
						</p>
					</DemoBox>
					<DemoBox title="Layout Errors">
						<p className="text-sm text-muted-foreground">
							error.tsx does NOT catch errors in the same segment&apos;s
							layout.tsx. Use the parent segment&apos;s error.tsx or
							global-error.tsx instead.
						</p>
					</DemoBox>
					<DemoBox title="Production Digest">
						<p className="text-sm text-muted-foreground">
							In production, error.digest gives a hashed identifier for
							server-side log matching without leaking error details.
						</p>
					</DemoBox>
				</div>
			</Section>
		</DemoPage>
	);
}
