import { getTranslations } from "next-intl/server";
import {
	CodeBlock,
	DemoBox,
	DemoPage,
	FileTree,
	Section,
} from "@/components/demo-page";
import { TriggerDemo } from "./trigger-demo";

export default async function ErrorPagesDemo() {
	const t = await getTranslations("routing.notFound");

	return (
		<DemoPage title={t("title")} description={t("description")}>
			<Section title={t("fileConventions")}>
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
				title={t("interactiveDemo")}
				description={t("interactiveDemoDesc")}
			>
				<TriggerDemo />
			</Section>

			<Section title={t("notFoundSection")}>
				<p className="text-sm text-muted-foreground mb-3">
					{t("notFoundDesc")}
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

			<Section title={t("errorSection")}>
				<p className="text-sm text-muted-foreground mb-3">{t("errorDesc")}</p>
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

			<Section title={t("forbiddenSection")}>
				<p className="text-sm text-muted-foreground mb-3">
					{t("forbiddenDesc")}
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

			<Section title={t("keyPoints")}>
				<div className="grid gap-3 sm:grid-cols-2">
					<DemoBox title={t("errorMustBeClient")}>
						<p className="text-sm text-muted-foreground">
							{t("errorMustBeClientDesc")}
						</p>
					</DemoBox>
					<DemoBox title={t("nestingMatters")}>
						<p className="text-sm text-muted-foreground">
							{t("nestingMattersDesc")}
						</p>
					</DemoBox>
					<DemoBox title={t("loadingTsx")}>
						<p className="text-sm text-muted-foreground">
							{t("loadingTsxDesc")}
						</p>
					</DemoBox>
					<DemoBox title={t("errorDigest")}>
						<p className="text-sm text-muted-foreground">
							{t("errorDigestDesc")}
						</p>
					</DemoBox>
				</div>
			</Section>
		</DemoPage>
	);
}
