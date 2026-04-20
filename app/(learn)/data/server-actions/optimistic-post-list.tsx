"use client";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useTranslations } from "next-intl";
import { useOptimistic } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { deletePost } from "./actions";
import { DeleteButton } from "./delete-button";

dayjs.extend(relativeTime);

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
					<div className="max-h-[400px] space-y-2 overflow-y-auto pr-1">
						{optimisticPosts.map((post) => (
							<div
								key={post.id}
								className="flex items-start justify-between border-b pb-2 last:border-0"
							>
								<div>
									<p className="text-sm font-medium">{post.title}</p>
									<p
										className="text-xs text-muted-foreground"
										title={post.createdAt}
									>
										{post.authorName} · {dayjs(post.createdAt).fromNow()}
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
