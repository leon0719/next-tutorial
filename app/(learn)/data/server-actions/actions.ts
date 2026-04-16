"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";

const createPostSchema = z.object({
	title: z.string().min(1, "Title is required"),
	content: z.string().min(1, "Content is required"),
	authorName: z.string().min(1, "Author is required"),
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

	db.insert(posts).values(parsed.data).run();
	revalidatePath("/data/server-actions");
	return { message: `Post "${parsed.data.title}" created!`, success: true };
}

export async function deletePost(id: number) {
	db.delete(posts).where(eq(posts.id, id)).run();
	revalidatePath("/data/server-actions");
}
