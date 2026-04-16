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

export default function StreamingPage() {
	return (
		<DemoPage
			title="Streaming"
			description="Streaming lets you progressively render UI. Wrap slow components in <Suspense> to show a fallback instantly while the content loads."
		>
			<Section
				title="Live Demo — Watch Components Stream In"
				description="Posts load after ~2s, Stats after ~4s. The rest of the page is instant. Refresh to see it again!"
			>
				<div className="grid gap-4 md:grid-cols-2">
					<Suspense fallback={<PostsSkeleton />}>
						<SlowPosts />
					</Suspense>
					<Suspense fallback={<StatsSkeleton />}>
						<SlowStats />
					</Suspense>
				</div>
			</Section>

			<Section title="How It Works">
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

			<Section title="Suspense Boundaries">
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

			<Section title="loading.tsx — Automatic Suspense">
				<p className="text-sm text-muted-foreground mb-3">
					Create a loading.tsx file and Next.js automatically wraps the page in
					a Suspense boundary.
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

			<Section title="Key Points">
				<div className="grid gap-3 sm:grid-cols-2">
					<DemoBox title="Granular Boundaries">
						<p className="text-sm text-muted-foreground">
							Each Suspense boundary streams independently. Wrap individual slow
							components, not the entire page — this maximizes perceived
							performance.
						</p>
					</DemoBox>
					<DemoBox title="Nested Suspense">
						<p className="text-sm text-muted-foreground">
							Suspense boundaries can be nested. Outer shows first, then inner
							boundaries resolve progressively. Great for complex layouts.
						</p>
					</DemoBox>
					<DemoBox title="No Client JS Needed">
						<p className="text-sm text-muted-foreground">
							Streaming works with Server Components only. The server sends HTML
							chunks as they become ready — no JavaScript framework needed on
							the client.
						</p>
					</DemoBox>
					<DemoBox title="loading.tsx = Page Suspense">
						<p className="text-sm text-muted-foreground">
							loading.tsx automatically wraps the page in Suspense. It shows
							during navigation before the page component renders.
						</p>
					</DemoBox>
				</div>
			</Section>
		</DemoPage>
	);
}
