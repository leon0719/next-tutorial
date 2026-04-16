import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";

// Simulate slow data source
async function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function SlowPosts() {
	await sleep(2000); // Simulate 2 second delay
	const allPosts = db.select().from(posts).limit(3).all();

	return (
		<Card>
			<CardHeader className="pb-2">
				<div className="flex items-center justify-between">
					<CardTitle className="text-base">Recent Posts</CardTitle>
					<Badge variant="secondary" className="text-xs">
						Loaded after 2s
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
