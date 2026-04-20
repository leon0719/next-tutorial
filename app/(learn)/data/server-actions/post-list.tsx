import { desc } from "drizzle-orm";
import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";
import { OptimisticPostList } from "./optimistic-post-list";

export async function PostList() {
	const allPosts = db
		.select()
		.from(posts)
		.orderBy(desc(posts.createdAt))
		.limit(50)
		.all();

	return <OptimisticPostList initialPosts={allPosts} />;
}
