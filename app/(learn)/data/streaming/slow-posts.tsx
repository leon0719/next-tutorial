import { getTranslations } from "next-intl/server";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";

// Simulate slow data source
async function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function SlowPosts() {
	const t = await getTranslations("data.streaming");
	await sleep(2000); // Simulate 2 second delay
	let allPosts: (typeof posts.$inferSelect)[] = [];
	try {
		allPosts = db.select().from(posts).limit(3).all();
	} catch (e) {
		console.error("Failed to fetch posts:", e);
	}

	return (
		<Card>
			<CardHeader className="pb-2">
				<div className="flex items-center justify-between">
					<CardTitle className="text-base">{t("recentPosts")}</CardTitle>
					<Badge variant="secondary" className="text-xs">
						{t("loadedAfter2s")}
					</Badge>
				</div>
			</CardHeader>
			<CardContent>
				<div className="space-y-2">
					{allPosts.map((post) => (
						<div key={post.id} className="border-b pb-2 last:border-0">
							<p className="text-sm font-medium">{post.title}</p>
							<p className="text-xs text-muted-foreground">{post.authorName}</p>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
