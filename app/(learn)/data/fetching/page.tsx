import { desc } from "drizzle-orm";
import { CodeBlock, DemoBox, DemoPage, Section } from "@/components/demo-page";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";

export default async function ServerFetchPage() {
	const startTime = performance.now();
	const allPosts = db.select().from(posts).orderBy(desc(posts.createdAt)).all();
	const fetchTime = (performance.now() - startTime).toFixed(2);

	return (
		<DemoPage
			title="Server Fetch"
			description="Server Components can fetch data directly — no API routes, no useEffect, no loading spinners. Data is available before the page renders."
		>
			<Section title="Live Demo — Direct Database Query">
				<DemoBox title={`Fetched ${allPosts.length} posts in ${fetchTime}ms`}>
					<div className="space-y-3">
						<p className="text-sm text-muted-foreground">
							This data was queried from SQLite using Drizzle ORM directly in
							the Server Component. No API call, no client-side fetching.
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
							<span>Rendered: {new Date().toLocaleTimeString()}</span>
							<span>Query time: {fetchTime}ms</span>
						</div>
					</div>
				</DemoBox>
			</Section>

			<Section title="Pattern 1: Database Query">
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

			<Section title="Pattern 2: Fetch API">
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

			<Section title="Pattern 3: Parallel Fetching">
				<p className="text-sm text-muted-foreground mb-3">
					Avoid waterfalls by fetching data in parallel with Promise.all.
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

			<Section title="Server Fetch vs Client Fetch">
				<div className="grid gap-4 md:grid-cols-2">
					<Card>
						<CardHeader className="pb-2">
							<CardTitle className="text-sm text-green-600 dark:text-green-400">
								Server Fetch (this demo)
							</CardTitle>
						</CardHeader>
						<CardContent className="text-sm text-muted-foreground space-y-1">
							<p>✅ No loading state — data ready at render</p>
							<p>✅ No client JS for data fetching</p>
							<p>✅ Direct DB/API access with secrets</p>
							<p>✅ No CORS issues</p>
							<p>❌ No real-time updates</p>
							<p>❌ No refetch on user action</p>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="pb-2">
							<CardTitle className="text-sm text-blue-600 dark:text-blue-400">
								Client Fetch (next demo)
							</CardTitle>
						</CardHeader>
						<CardContent className="text-sm text-muted-foreground space-y-1">
							<p>✅ Real-time updates / polling</p>
							<p>✅ Refetch on user interaction</p>
							<p>✅ Optimistic updates</p>
							<p>✅ Infinite scroll / pagination</p>
							<p>❌ Needs loading/error states</p>
							<p>❌ More client JS</p>
						</CardContent>
					</Card>
				</div>
			</Section>

			<Section title="Key Points">
				<div className="grid gap-3 sm:grid-cols-2">
					<DemoBox title="No Default Cache">
						<p className="text-sm text-muted-foreground">
							In Next.js 16, fetch() has no default caching. Data is fresh on
							every request. Use &apos;use cache&apos; directive to opt into
							caching.
						</p>
					</DemoBox>
					<DemoBox title="Automatic Deduplication">
						<p className="text-sm text-muted-foreground">
							Identical fetch() calls in the same render are automatically
							deduplicated. Multiple components fetching the same URL only make
							one request.
						</p>
					</DemoBox>
				</div>
			</Section>
		</DemoPage>
	);
}
