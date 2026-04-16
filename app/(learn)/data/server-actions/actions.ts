"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";
import { AUTHOR_MAX, CONTENT_MAX, TITLE_MAX } from "./constants";

const createPostSchema = z.object({
	title: z
		.string()
		.min(1, "Title is required")
		.max(TITLE_MAX, `Title must be ${TITLE_MAX} characters or less`),
	content: z
		.string()
		.min(1, "Content is required")
		.max(CONTENT_MAX, `Content must be ${CONTENT_MAX} characters or less`),
	authorName: z
		.string()
		.min(1, "Author is required")
		.max(AUTHOR_MAX, `Author must be ${AUTHOR_MAX} characters or less`),
});

export async function createPost(
	_prevState: { message: string; success: boolean } | null,
	formData: FormData,
) {
	const parsed = createPostSchema.safeParse({
		title: formData.get("title"),
		content: formData.get("content"),
		authorName: formData.get("authorName"),
	});

	if (!parsed.success) {
		return { message: parsed.error.issues[0].message, success: false };
	}

	try {
		db.insert(posts).values(parsed.data).run();
	} catch (e) {
		console.error("Failed to create post:", e);
		return { message: "Failed to create post", success: false };
	}
	revalidatePath("/data/server-actions");
	return { message: `Post "${parsed.data.title}" created!`, success: true };
}

export async function deletePost(id: number) {
	try {
		db.delete(posts).where(eq(posts.id, id)).run();
	} catch (e) {
		console.error("Failed to delete post:", e);
		throw new Error("Failed to delete post");
	}
	revalidatePath("/data/server-actions");
}
