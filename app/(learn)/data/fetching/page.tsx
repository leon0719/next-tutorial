import { desc } from "drizzle-orm";
import { getTranslations } from "next-intl/server";
import { CodeBlock, DemoBox, DemoPage, Section } from "@/components/demo-page";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";

export default async function ServerFetchPage() {
	const t = await getTranslations("data.fetching");
	const startTime = performance.now();
	let allPosts: (typeof posts.$inferSelect)[] = [];
	try {
		allPosts = db.select().from(posts).orderBy(desc(posts.createdAt)).all();
	} catch (e) {
		console.error("Failed to fetch posts:", e);
	}
	const fetchTime = (performance.now() - startTime).toFixed(2);

	return (
		<DemoPage title={t("title")} description={t("description")}>
			<Section title={t("liveDemo")}>
				<DemoBox
					title={t("liveDemoTitle", {
						count: allPosts.length,
						time: fetchTime,
					})}
				>
					<div className="space-y-3">
						<p className="text-sm text-muted-foreground">
							{t("liveDemoDescription")}
						</p>
						<div className="space-y-2">
							{allPosts.map((post) => (
								<div
									key={post.id}
									className="flex items-start justify-between border-b pb-2 last:border-0"
								>
									<div>
										<p className="text-sm font-medium">{post.title}</p>
										<p className="text-xs text-muted-foreground line-clamp-1">
											{post.content}
										</p>
									</div>
									<Badge variant="outline" className="ml-2 shrink-0 text-xs">
										{post.authorName}
									</Badge>
								</div>
							))}
						</div>
						<div className="border-t pt-2 flex items-center gap-4 text-xs text-muted-foreground">
							<span>
								{t("rendered", { time: new Date().toLocaleTimeString() })}
							</span>
							<span>{t("queryTime", { time: fetchTime })}</span>
						</div>
					</div>
				</DemoBox>
			</Section>

			<Section title={t("pattern1")}>
				<CodeBlock
					filename="app/posts/page.tsx"
					language="tsx"
				>{`import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";
import { desc } from "drizzle-orm";

export default async function PostsPage() {
  // Direct database query — runs on the server only
  const allPosts = db
    .select()
    .from(posts)
    .orderBy(desc(posts.createdAt))
    .all();

  return (
    <ul>
      {allPosts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}`}</CodeBlock>
			</Section>

			<Section title={t("pattern2")}>
				<CodeBlock
					filename="app/users/page.tsx"
					language="tsx"
				>{`export default async function UsersPage() {
  // fetch() works in Server Components
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await res.json();

  return (
    <ul>
      {users.map((user: { id: number; name: string }) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );

  // Note: In Next.js 16, fetch() has NO default caching
  // Data is fresh on every request unless you use 'use cache'
}`}</CodeBlock>
			</Section>

			<Section title={t("pattern3")}>
				<p className="text-sm text-muted-foreground mb-3">
					{t("pattern3Description")}
				</p>
				<CodeBlock
					filename="app/dashboard/page.tsx"
					language="tsx"
				>{`export default async function Dashboard() {
  // ❌ Sequential (waterfall) — each waits for the previous
  const posts = await getPosts();    // 200ms
  const comments = await getComments(); // 300ms
  // Total: 500ms

  // ✅ Parallel — all requests start at the same time
  const [posts, comments, users] = await Promise.all([
    getPosts(),      // 200ms
    getComments(),   // 300ms
    getUsers(),      // 150ms
  ]);
  // Total: 300ms (slowest request)
}`}</CodeBlock>
			</Section>

			<Section title={t("comparison")}>
				<div className="grid gap-4 md:grid-cols-2">
					<Card>
						<CardHeader className="pb-2">
							<CardTitle className="text-sm text-green-600 dark:text-green-400">
								{t("serverFetchLabel")}
							</CardTitle>
						</CardHeader>
						<CardContent className="text-sm text-muted-foreground space-y-1">
							<p>✅ {t("serverFetchPro1")}</p>
							<p>✅ {t("serverFetchPro2")}</p>
							<p>✅ {t("serverFetchPro3")}</p>
							<p>✅ {t("serverFetchPro4")}</p>
							<p>❌ {t("serverFetchCon1")}</p>
							<p>❌ {t("serverFetchCon2")}</p>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="pb-2">
							<CardTitle className="text-sm text-blue-600 dark:text-blue-400">
								{t("clientFetchLabel")}
							</CardTitle>
						</CardHeader>
						<CardContent className="text-sm text-muted-foreground space-y-1">
							<p>✅ {t("clientFetchPro1")}</p>
							<p>✅ {t("clientFetchPro2")}</p>
							<p>✅ {t("clientFetchPro3")}</p>
							<p>✅ {t("clientFetchPro4")}</p>
							<p>❌ {t("clientFetchCon1")}</p>
							<p>❌ {t("clientFetchCon2")}</p>
						</CardContent>
					</Card>
				</div>
			</Section>

			<Section title={t("keyPoints")}>
				<div className="grid gap-3 sm:grid-cols-2">
					<DemoBox title={t("noDefaultCache")}>
						<p className="text-sm text-muted-foreground">
							{t("noDefaultCacheDescription")}
						</p>
					</DemoBox>
					<DemoBox title={t("autoDedup")}>
						<p className="text-sm text-muted-foreground">
							{t("autoDedupDescription")}
						</p>
					</DemoBox>
				</div>
			</Section>
		</DemoPage>
	);
}
