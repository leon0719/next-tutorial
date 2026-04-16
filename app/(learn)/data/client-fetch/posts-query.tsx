"use client";

import { useQuery } from "@tanstack/react-query";
import { RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface Post {
	id: number;
	title: string;
	content: string;
	author_name: string;
	created_at: string;
}

export function PostsQuery() {
	const {
		data,
		isLoading,
		isError,
		error,
		refetch,
		isFetching,
		dataUpdatedAt,
	} = useQuery<Post[]>({
		queryKey: ["posts"],
		queryFn: async () => {
			const res = await fetch("/api/posts");
			if (!res.ok) throw new Error("Failed to fetch posts");
			return res.json();
		},
	});

	return (
		<Card>
			<CardHeader className="pb-2">
				<div className="flex items-center justify-between">
					<CardTitle className="text-base">Posts from API</CardTitle>
					<div className="flex items-center gap-2">
						{isFetching && (
							<Badge variant="secondary" className="text-xs">
								Fetching...
							</Badge>
						)}
						<Button
							variant="outline"
							size="sm"
							onClick={() => refetch()}
							disabled={isFetching}
						>
							<RefreshCw
								className={`h-3 w-3 mr-1 ${isFetching ? "animate-spin" : ""}`}
							/>
							Refetch
						</Button>
					</div>
				</div>
			</CardHeader>
			<CardContent>
				{isLoading && (
					<div className="space-y-3">
						{[1, 2, 3].map((i) => (
							<div key={i} className="space-y-2">
								<Skeleton className="h-4 w-3/4" />
								<Skeleton className="h-3 w-1/2" />
							</div>
						))}
					</div>
				)}

				{isError && (
					<div className="text-sm text-destructive">Error: {error.message}</div>
				)}

				{data && (
					<div className="space-y-3">
						<div className="space-y-2">
							{data.map((post) => (
								<div
									key={post.id}
									className="flex items-start justify-between border-b pb-2 last:border-0"
								>
									<div>
										<p className="text-sm font-medium">{post.title}</p>
										<p className="text-xs text-muted-foreground line-clamp-1">
											{post.content}
										</p>
									</div>
									<Badge variant="outline" className="ml-2 shrink-0 text-xs">
										{post.author_name}
									</Badge>
								</div>
							))}
						</div>
						<p className="text-xs text-muted-foreground">
							Last updated:{" "}
							{dataUpdatedAt
								? new Date(dataUpdatedAt).toLocaleTimeString()
								: "—"}
						</p>
					</div>
				)}
			</CardContent>
		</Card>
	);
}
