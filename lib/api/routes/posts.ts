import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export const postsRoute = new Hono();

const createPostSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  authorName: z.string().min(1).default("Anonymous"),
});

const updatePostSchema = z.object({
  title: z.string().min(1).optional(),
  content: z.string().min(1).optional(),
  authorName: z.string().min(1).optional(),
});

const idParamSchema = z.object({
  id: z.coerce.number().int().positive(),
});

// GET /api/posts
postsRoute.get("/", (c) => {
  try {
    const allPosts = db.select().from(posts).all();
    return c.json(allPosts);
  } catch (e) {
    console.error("Failed to fetch posts:", e);
    return c.json({ error: "Failed to fetch posts" }, 500);
  }
});

// GET /api/posts/:id
postsRoute.get("/:id", zValidator("param", idParamSchema), (c) => {
  try {
    const { id } = c.req.valid("param");
    const post = db.select().from(posts).where(eq(posts.id, id)).get();
    if (!post) {
      return c.json({ error: "Post not found" }, 404);
    }
    return c.json(post);
  } catch (e) {
    console.error("Failed to fetch post:", e);
    return c.json({ error: "Failed to fetch post" }, 500);
  }
});

// POST /api/posts
postsRoute.post("/", zValidator("json", createPostSchema), (c) => {
  try {
    const data = c.req.valid("json");
    const result = db.insert(posts).values(data).returning().get();
    return c.json(result, 201);
  } catch (e) {
    console.error("Failed to create post:", e);
    return c.json({ error: "Failed to create post" }, 500);
  }
});

// PUT /api/posts/:id
postsRoute.put(
  "/:id",
  zValidator("param", idParamSchema),
  zValidator("json", updatePostSchema),
  (c) => {
    try {
      const { id } = c.req.valid("param");
      const data = c.req.valid("json");
      const result = db
        .update(posts)
        .set({ ...data, updatedAt: new Date().toISOString() })
        .where(eq(posts.id, id))
        .returning()
        .get();
      if (!result) {
        return c.json({ error: "Post not found" }, 404);
      }
      return c.json(result);
    } catch (e) {
      console.error("Failed to update post:", e);
      return c.json({ error: "Failed to update post" }, 500);
    }
  },
);

// DELETE /api/posts/:id
postsRoute.delete("/:id", zValidator("param", idParamSchema), (c) => {
  try {
    const { id } = c.req.valid("param");
    const result = db.delete(posts).where(eq(posts.id, id)).returning().get();
    if (!result) {
      return c.json({ error: "Post not found" }, 404);
    }
    return c.json({ message: "Deleted", id });
  } catch (e) {
    console.error("Failed to delete post:", e);
    return c.json({ error: "Failed to delete post" }, 500);
  }
});
