import { desc } from "drizzle-orm";
import { getTranslations } from "next-intl/server";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";
import { DeleteButton } from "./delete-button";

export async function PostList() {
	const t = await getTranslations("data.serverActions");
	const allPosts = db
		.select()
		.from(posts)
		.orderBy(desc(posts.createdAt))
		.limit(50)
		.all();

	return (
		<Card>
			<CardHeader className="pb-2">
				<div className="flex items-center justify-between">
					<CardTitle className="text-base">
						{t("postsTitle", { count: allPosts.length })}
					</CardTitle>
					<Badge variant="outline" className="text-xs">
						{t("serverComponentBadge")}
					</Badge>
				</div>
			</CardHeader>
			<CardContent>
				{allPosts.length === 0 ? (
					<p className="text-sm text-muted-foreground">{t("emptyMessage")}</p>
				) : (
					<div className="space-y-2">
						{allPosts.map((post) => (
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
								<DeleteButton id={post.id} />
							</div>
						))}
					</div>
				)}
			</CardContent>
		</Card>
	);
}
