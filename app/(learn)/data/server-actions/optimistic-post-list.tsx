"use client";

import { useTranslations } from "next-intl";
import { useOptimistic } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { deletePost } from "./actions";
import { DeleteButton } from "./delete-button";

type Post = {
	id: number;
	title: string;
	authorName: string;
	createdAt: string;
};

export function OptimisticPostList({ initialPosts }: { initialPosts: Post[] }) {
	const t = useTranslations("data.serverActions");
	const [optimisticPosts, removeOptimistic] = useOptimistic(
		initialPosts,
		(posts: Post[], removedId: number) =>
			posts.filter((p) => p.id !== removedId),
	);

	return (
		<Card>
			<CardHeader className="pb-2">
				<div className="flex items-center justify-between">
					<CardTitle className="text-base">
						{t("postsTitle", { count: optimisticPosts.length })}
					</CardTitle>
					<Badge variant="outline" className="text-xs">
						{t("serverComponentBadge")}
					</Badge>
				</div>
			</CardHeader>
			<CardContent>
				{optimisticPosts.length === 0 ? (
					<p className="text-sm text-muted-foreground">{t("emptyMessage")}</p>
				) : (
					<div className="space-y-2">
						{optimisticPosts.map((post) => (
							<div
								key={post.id}
								className="flex items-start justify-between border-b pb-2 last:border-0"
							>
								<div>
									<p className="text-sm font-medium">{post.title}</p>
									<p className="text-xs text-muted-foreground">
										{post.authorName} · {post.createdAt}
									</p>
								</div>
								<DeleteButton
									onRemove={async () => {
										removeOptimistic(post.id);
										await deletePost(post.id);
									}}
								/>
							</div>
						))}
					</div>
				)}
			</CardContent>
		</Card>
	);
}
