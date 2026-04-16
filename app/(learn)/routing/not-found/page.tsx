import {
	CodeBlock,
	DemoBox,
	DemoPage,
	FileTree,
	Section,
} from "@/components/demo-page";
import { Badge } from "@/components/ui/badge";
import { TriggerDemo } from "./trigger-demo";

export default function ErrorPagesDemo() {
	return (
		<DemoPage
			title="Error Pages"
			description="Next.js provides file conventions for handling errors gracefully — not-found.tsx, error.tsx, forbidden.tsx, and unauthorized.tsx."
		>
			<Section title="File Conventions">
				<FileTree>{`app/
├── not-found.tsx        ← Global 404 page
├── global-error.tsx     ← Root error boundary (must include <html>)
│
├── dashboard/
│   ├── page.tsx
│   ├── not-found.tsx    ← 404 for /dashboard/* routes
│   ├── error.tsx        ← Error boundary for /dashboard/*
│   ├── loading.tsx      ← Loading skeleton
│   ├── forbidden.tsx    ← 403 page (needs authInterrupts config)
│   └── unauthorized.tsx ← 401 page (needs authInterrupts config)
│
└── Rendering order:
    layout.tsx
    └── error.tsx        ← Catches errors from below
        └── loading.tsx  ← Shows while page loads
            └── not-found.tsx
                └── page.tsx`}</FileTree>
			</Section>

			<Section
				title="Interactive Demo"
				description="Click the buttons to trigger different error types. Each is handled by its own file convention."
			>
				<TriggerDemo />
			</Section>

			<Section title="1. not-found.tsx (404)">
				<p className="text-sm text-muted-foreground mb-3">
					Rendered when notFound() is called or when no route matches.
				</p>
				<CodeBlock
					filename="app/not-found.tsx"
					language="tsx"
				>{`// No props — just a simple component
export default function NotFound() {
  return (
    <div>
      <h2>404 — Page Not Found</h2>
      <p>The page you're looking for doesn't exist.</p>
      <Link href="/">Go home</Link>
    </div>
  );
}

// Trigger it programmatically:
import { notFound } from "next/navigation";

export default async function UserPage({ params }) {
  const { id } = await params;
  const user = await getUser(id);
  if (!user) notFound(); // ← renders not-found.tsx
  return <Profile user={user} />;
}`}</CodeBlock>
			</Section>

			<Section title="2. error.tsx (Error Boundary)">
				<p className="text-sm text-muted-foreground mb-3">
					Must be a Client Component. Catches runtime errors and shows a
					recovery UI.
				</p>
				<CodeBlock
					filename="app/dashboard/error.tsx"
					language="tsx"
				>{`"use client"; // ← REQUIRED

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
      <button onClick={() => reset()}>
        Try again
      </button>
    </div>
  );
}

// Note: error.tsx catches errors from page.tsx and below,
// but NOT from layout.tsx at the same level.
// For root layout errors, use global-error.tsx.`}</CodeBlock>
			</Section>

			<Section title="3. forbidden.tsx & unauthorized.tsx">
				<p className="text-sm text-muted-foreground mb-3">
					Handle 403 and 401 responses. Requires enabling authInterrupts in
					next.config.ts.
				</p>
				<CodeBlock
					filename="next.config.ts"
					language="tsx"
				>{`const nextConfig: NextConfig = {
  experimental: {
    authInterrupts: true, // ← Enable forbidden() and unauthorized()
  },
};

// Then in your page:
import { forbidden, unauthorized } from "next/navigation";

export default async function AdminPage() {
  const session = await getSession();
  if (!session) unauthorized();     // → renders unauthorized.tsx (401)
  if (!session.isAdmin) forbidden(); // → renders forbidden.tsx (403)
  return <AdminDashboard />;
}`}</CodeBlock>
			</Section>

			<Section title="Key Points">
				<div className="grid gap-3 sm:grid-cols-2">
					<DemoBox title="error.tsx Must Be Client">
						<p className="text-sm text-muted-foreground">
							error.tsx requires "use client" because it uses React's Error
							Boundary mechanism, which only works on the client.
						</p>
					</DemoBox>
					<DemoBox title="Nesting Matters">
						<p className="text-sm text-muted-foreground">
							error.tsx catches errors from its child page.tsx, NOT from its
							sibling layout.tsx. Use global-error.tsx for root layout errors.
						</p>
					</DemoBox>
					<DemoBox title="loading.tsx">
						<p className="text-sm text-muted-foreground">
							loading.tsx creates a Suspense boundary around page.tsx. It shows
							instantly on navigation while the page loads.
						</p>
					</DemoBox>
					<DemoBox title="Error Digest">
						<p className="text-sm text-muted-foreground">
							In production, error.digest is a hash of the error (not the full
							message) to avoid leaking sensitive info to the client.
						</p>
					</DemoBox>
				</div>
			</Section>
		</DemoPage>
	);
}
