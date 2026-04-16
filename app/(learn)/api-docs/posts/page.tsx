import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { CodeBlock, DemoBox, DemoPage, Section } from "@/components/demo-page";

export default async function PostsApiPage() {
	const t = await getTranslations("api.posts");

	return (
		<DemoPage title={t("title")} description={t("description")}>
			<Section title={t("endpoints")}>
				<div className="rounded-lg border overflow-hidden">
					<table className="w-full text-sm">
						<thead>
							<tr className="border-b bg-muted/50">
								<th className="px-4 py-2 text-left font-medium">Method</th>
								<th className="px-4 py-2 text-left font-medium">Path</th>
								<th className="px-4 py-2 text-left font-medium">Description</th>
							</tr>
						</thead>
						<tbody>
							<tr className="border-b">
								<td className="px-4 py-2 font-mono text-xs">GET</td>
								<td className="px-4 py-2 font-mono text-xs">/api/posts</td>
								<td className="px-4 py-2 text-muted-foreground">
									List all posts
								</td>
							</tr>
							<tr className="border-b">
								<td className="px-4 py-2 font-mono text-xs">GET</td>
								<td className="px-4 py-2 font-mono text-xs">/api/posts/:id</td>
								<td className="px-4 py-2 text-muted-foreground">
									Get a post by ID
								</td>
							</tr>
							<tr className="border-b">
								<td className="px-4 py-2 font-mono text-xs">POST</td>
								<td className="px-4 py-2 font-mono text-xs">/api/posts</td>
								<td className="px-4 py-2 text-muted-foreground">
									Create a post
								</td>
							</tr>
							<tr className="border-b">
								<td className="px-4 py-2 font-mono text-xs">PUT</td>
								<td className="px-4 py-2 font-mono text-xs">/api/posts/:id</td>
								<td className="px-4 py-2 text-muted-foreground">
									Update a post
								</td>
							</tr>
							<tr>
								<td className="px-4 py-2 font-mono text-xs">DELETE</td>
								<td className="px-4 py-2 font-mono text-xs">/api/posts/:id</td>
								<td className="px-4 py-2 text-muted-foreground">
									Delete a post
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</Section>

			<Section title={t("routeCode")}>
				<CodeBlock
					filename="lib/api/routes/posts.ts"
					language="typescript"
				>{`import { Hono } from "hono";
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
});`}</CodeBlock>
			</Section>

			<Section title={t("validation")} description={t("validationDesc")}>
				<CodeBlock
					filename="Zod Schema"
					language="typescript"
				>{`const createPostSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  authorName: z.string().min(1).default("Anonymous"),
});

// Usage with Hono
postsRoute.post("/", zValidator("json", createPostSchema), (c) => {
  const data = c.req.valid("json"); // fully typed!
  // Invalid data automatically returns 400
});`}</CodeBlock>
			</Section>

			<Section title={t("tryIt")} description={t("tryItDesc")}>
				<div className="flex flex-wrap gap-3">
					<Link
						href="/api/posts"
						target="_blank"
						className="inline-flex items-center gap-2 text-sm font-medium text-primary underline-offset-4 hover:underline"
					>
						GET /api/posts →
					</Link>
				</div>
			</Section>

			<Section title={t("keyPoints")}>
				<div className="grid gap-3 sm:grid-cols-2">
					<DemoBox title={t("typesSafe")}>
						<p className="text-sm text-muted-foreground">
							{t("typesSafeDesc")}
						</p>
					</DemoBox>
					<DemoBox title={t("drizzleIntegration")}>
						<p className="text-sm text-muted-foreground">
							{t("drizzleIntegrationDesc")}
						</p>
					</DemoBox>
				</div>
			</Section>
		</DemoPage>
	);
}
