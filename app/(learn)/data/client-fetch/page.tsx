import { CodeBlock, DemoBox, DemoPage, Section } from "@/components/demo-page";
import { PostsQuery } from "./posts-query";

export default function ClientFetchPage() {
	return (
		<DemoPage
			title="Client Fetch (TanStack Query)"
			description="For client-side data fetching with caching, refetching, loading states, and error handling. Perfect for interactive data that changes based on user actions."
		>
			<Section
				title="Live Demo — Fetching from Hono API"
				description="This component uses useQuery to fetch posts from /api/posts. Try the refetch button!"
			>
				<PostsQuery />
			</Section>

			<Section title="Basic useQuery">
				<CodeBlock
					filename="components/posts.tsx"
					language="tsx"
				>{`"use client";
import { useQuery } from "@tanstack/react-query";

export function Posts() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await fetch("/api/posts");
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
    // Optional config:
    staleTime: 1000 * 60,      // Cache for 1 minute
    refetchOnWindowFocus: true, // Refetch when tab is focused
  });

  if (isLoading) return <Skeleton />;
  if (isError) return <p>Error loading posts</p>;

  return (
    <ul>
      {data.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}`}</CodeBlock>
			</Section>

			<Section title="Setup — QueryClientProvider">
				<p className="text-sm text-muted-foreground mb-3">
					TanStack Query needs a QueryClientProvider wrapping your app. This
					project sets it up in app/providers.tsx.
				</p>
				<CodeBlock filename="app/providers.tsx" language="tsx">{`"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  // Create QueryClient once per component instance
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}`}</CodeBlock>
			</Section>

			<Section title="Key Points">
				<div className="grid gap-3 sm:grid-cols-2">
					<DemoBox title="Automatic Caching">
						<p className="text-sm text-muted-foreground">
							TanStack Query caches responses by queryKey. Same key = same
							cached data across components. Configure staleTime to control
							freshness.
						</p>
					</DemoBox>
					<DemoBox title="Background Refetch">
						<p className="text-sm text-muted-foreground">
							Stale data is shown immediately while fresh data fetches in the
							background. No loading spinner for cached data — instant UI.
						</p>
					</DemoBox>
					<DemoBox title="When to Use">
						<p className="text-sm text-muted-foreground">
							Use client fetch for: real-time data, user-triggered refreshes,
							infinite scroll, search-as-you-type, or any data that changes
							based on client state.
						</p>
					</DemoBox>
					<DemoBox title="Server Fetch First">
						<p className="text-sm text-muted-foreground">
							Default to Server Components for initial data. Add TanStack Query
							only when you need client-side interactivity (refetch, polling,
							optimistic updates).
						</p>
					</DemoBox>
				</div>
			</Section>
		</DemoPage>
	);
}
