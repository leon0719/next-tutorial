import { getTranslations } from "next-intl/server";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";

async function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function SlowStats() {
	const t = await getTranslations("data.streaming");
	await sleep(4000); // Simulate 4 second delay (slower than posts)
	let allPosts: (typeof posts.$inferSelect)[] = [];
	try {
		allPosts = db.select().from(posts).all();
	} catch (e) {
		console.error("Failed to fetch stats:", e);
	}
	const totalPosts = allPosts.length;
	const authors = new Set(allPosts.map((p) => p.authorName)).size;

	return (
		<Card>
			<CardHeader className="pb-2">
				<div className="flex items-center justify-between">
					<CardTitle className="text-base">{t("stats")}</CardTitle>
					<Badge variant="secondary" className="text-xs">
						{t("loadedAfter4s")}
					</Badge>
				</div>
			</CardHeader>
			<CardContent>
				<div className="grid grid-cols-2 gap-4 text-center">
					<div>
						<p className="text-2xl font-bold">{totalPosts}</p>
						<p className="text-xs text-muted-foreground">{t("totalPosts")}</p>
					</div>
					<div>
						<p className="text-2xl font-bold">{authors}</p>
						<p className="text-xs text-muted-foreground">{t("authors")}</p>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
