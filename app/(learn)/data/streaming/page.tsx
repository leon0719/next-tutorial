import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import {
	CodeBlock,
	DemoBox,
	DemoPage,
	FileTree,
	Section,
} from "@/components/demo-page";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { SlowPosts } from "./slow-posts";
import { SlowStats } from "./slow-stats";

function PostsSkeleton() {
	return (
		<Card>
			<CardHeader className="pb-2">
				<Skeleton className="h-5 w-32" />
			</CardHeader>
			<CardContent className="space-y-3">
				<Skeleton className="h-4 w-full" />
				<Skeleton className="h-4 w-3/4" />
				<Skeleton className="h-4 w-5/6" />
			</CardContent>
		</Card>
	);
}

function StatsSkeleton() {
	return (
		<Card>
			<CardHeader className="pb-2">
				<Skeleton className="h-5 w-20" />
			</CardHeader>
			<CardContent>
				<div className="grid grid-cols-2 gap-4 text-center">
					<div>
						<Skeleton className="h-8 w-12 mx-auto" />
						<Skeleton className="h-3 w-16 mx-auto mt-1" />
					</div>
					<div>
						<Skeleton className="h-8 w-12 mx-auto" />
						<Skeleton className="h-3 w-16 mx-auto mt-1" />
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

export default async function StreamingPage() {
	const t = await getTranslations("data.streaming");

	return (
		<DemoPage title={t("title")} description={t("description")}>
			<Section title={t("liveDemo")} description={t("liveDemoDescription")}>
				<div className="grid gap-4 md:grid-cols-2">
					<Suspense fallback={<PostsSkeleton />}>
						<SlowPosts />
					</Suspense>
					<Suspense fallback={<StatsSkeleton />}>
						<SlowStats />
					</Suspense>
				</div>
			</Section>

			<Section title={t("howItWorks")}>
				<FileTree>{`Request Flow:

1. Browser requests /data/streaming
2. Server sends instant HTML (layout + skeletons)
3. SlowPosts finishes (2s) → streams into the page
4. SlowStats finishes (4s) → streams into the page

Without Suspense:
  Page waits 4s (slowest) → renders everything at once

With Suspense:
  Page instant → Posts at 2s → Stats at 4s
  Each piece arrives independently!`}</FileTree>
			</Section>

			<Section title={t("suspenseBoundaries")}>
				<CodeBlock
					filename="app/dashboard/page.tsx"
					language="tsx"
				>{`import { Suspense } from 'react'

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>  {/* Instant */}

      <Suspense fallback={<PostsSkeleton />}>
        <SlowPosts />     {/* Streams when ready */}
      </Suspense>

      <Suspense fallback={<StatsSkeleton />}>
        <SlowStats />     {/* Streams independently */}
      </Suspense>
    </div>
  )
}

// Each <Suspense> is a streaming boundary
// Components inside can be async and take time
// Fallback shows instantly, content replaces it`}</CodeBlock>
			</Section>

			<Section title={t("loadingTsx")}>
				<p className="text-sm text-muted-foreground mb-3">
					{t("loadingTsxDescription")}
				</p>
				<CodeBlock
					filename="app/posts/loading.tsx"
					language="tsx"
				>{`// This file automatically wraps page.tsx in <Suspense>
// Shows while page.tsx is loading

import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  )
}

// Equivalent to:
// <Suspense fallback={<Loading />}>
//   <Page />
// </Suspense>`}</CodeBlock>
			</Section>

			<Section title={t("keyPoints")}>
				<div className="grid gap-3 sm:grid-cols-2">
					<DemoBox title={t("granularBoundaries")}>
						<p className="text-sm text-muted-foreground">
							{t("granularBoundariesDescription")}
						</p>
					</DemoBox>
					<DemoBox title={t("nestedSuspense")}>
						<p className="text-sm text-muted-foreground">
							{t("nestedSuspenseDescription")}
						</p>
					</DemoBox>
					<DemoBox title={t("noClientJs")}>
						<p className="text-sm text-muted-foreground">
							{t("noClientJsDescription")}
						</p>
					</DemoBox>
					<DemoBox title={t("loadingPageSuspense")}>
						<p className="text-sm text-muted-foreground">
							{t("loadingPageSuspenseDescription")}
						</p>
					</DemoBox>
				</div>
			</Section>
		</DemoPage>
	);
}
