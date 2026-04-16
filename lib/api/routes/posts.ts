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

// GET /api/posts
postsRoute.get("/", (c) => {
  const allPosts = db.select().from(posts).all();
  return c.json(allPosts);
});

// GET /api/posts/:id
postsRoute.get("/:id", (c) => {
  const id = Number(c.req.param("id"));
  const post = db.select().from(posts).where(eq(posts.id, id)).get();
  if (!post) {
    return c.json({ error: "Post not found" }, 404);
  }
  return c.json(post);
});

// POST /api/posts
postsRoute.post("/", zValidator("json", createPostSchema), (c) => {
  const data = c.req.valid("json");
  const result = db.insert(posts).values(data).returning().get();
  return c.json(result, 201);
});

// PUT /api/posts/:id
postsRoute.put("/:id", zValidator("json", updatePostSchema), (c) => {
  const id = Number(c.req.param("id"));
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
});

// DELETE /api/posts/:id
postsRoute.delete("/:id", (c) => {
  const id = Number(c.req.param("id"));
  const result = db.delete(posts).where(eq(posts.id, id)).returning().get();
  if (!result) {
    return c.json({ error: "Post not found" }, 404);
  }
  return c.json({ message: "Deleted", id });
});
