import { getTranslations } from "next-intl/server";
import { CodeBlock, DemoBox, DemoPage, Section } from "@/components/demo-page";
import { PostsQuery } from "./posts-query";

export default async function ClientFetchPage() {
	const t = await getTranslations("data.clientFetch");

	return (
		<DemoPage title={t("title")} description={t("description")}>
			<Section title={t("liveDemo")} description={t("liveDemoDescription")}>
				<PostsQuery />
			</Section>

			<Section title={t("basicQuery")}>
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

			<Section title={t("setup")}>
				<p className="text-sm text-muted-foreground mb-3">
					{t("setupDescription")}
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

			<Section title={t("keyPoints")}>
				<div className="grid gap-3 sm:grid-cols-2">
					<DemoBox title={t("autoCaching")}>
						<p className="text-sm text-muted-foreground">
							{t("autoCachingDescription")}
						</p>
					</DemoBox>
					<DemoBox title={t("backgroundRefetch")}>
						<p className="text-sm text-muted-foreground">
							{t("backgroundRefetchDescription")}
						</p>
					</DemoBox>
					<DemoBox title={t("whenToUse")}>
						<p className="text-sm text-muted-foreground">
							{t("whenToUseDescription")}
						</p>
					</DemoBox>
					<DemoBox title={t("serverFetchFirst")}>
						<p className="text-sm text-muted-foreground">
							{t("serverFetchFirstDescription")}
						</p>
					</DemoBox>
				</div>
			</Section>
		</DemoPage>
	);
}
