import { CodeBlock, DemoBox, DemoPage, Section } from "@/components/demo-page";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";

export default async function ServerComponentsPage() {
	// Direct database access — only possible in Server Components!
	const allPosts = db.select().from(posts).all();

	return (
		<DemoPage
			title="Server Components"
			description="In Next.js, all components are Server Components by default. They run on the server, can access databases directly, and send zero JavaScript to the client."
		>
			<Section title="This Page IS a Server Component">
				<DemoBox title="Live Demo — Data from SQLite">
					<div className="space-y-3">
						<p className="text-sm text-muted-foreground">
							These posts were fetched directly from the database in this Server
							Component. No API route, no useEffect, no loading state — just a
							direct query.
						</p>
						<div className="grid gap-3 sm:grid-cols-2">
							{allPosts.map((post) => (
								<Card key={post.id}>
									<CardHeader className="pb-2">
										<div className="flex items-center justify-between">
											<CardTitle className="text-sm">{post.title}</CardTitle>
											<Badge variant="outline" className="text-xs">
												{post.authorName}
											</Badge>
										</div>
									</CardHeader>
									<CardContent>
										<p className="text-xs text-muted-foreground line-clamp-2">
											{post.content}
										</p>
									</CardContent>
								</Card>
							))}
						</div>
						<p className="text-xs text-muted-foreground">
							Total: {allPosts.length} posts fetched at render time. Check the
							network tab — no JS bundle for this data!
						</p>
					</div>
				</DemoBox>
			</Section>

			<Section title="How It Works">
				<CodeBlock
					filename="app/posts/page.tsx"
					language="tsx"
				>{`// This is a Server Component (the default)
// It runs ONLY on the server — never in the browser

import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";

export default async function PostsPage() {
  // Direct database access — no API needed!
  const allPosts = db.select().from(posts).all();

  return (
    <ul>
      {allPosts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}`}</CodeBlock>
			</Section>

			<Section title="Server vs Client Components">
				<div className="grid gap-4 md:grid-cols-2">
					<div>
						<h3 className="text-sm font-semibold mb-2 text-green-600 dark:text-green-400">
							Server Component (Default)
						</h3>
						<CodeBlock
							filename="server-component.tsx"
							language="tsx"
						>{`// No directive needed — this is the default
import { db } from "@/lib/db";

export default async function Page() {
  const data = await db.query.posts.findMany();

  return <div>{data.length} posts</div>;
}

// ✅ Can: access DB, read files, use secrets
// ✅ Can: async/await at component level
// ✅ Can: import server-only packages
// ❌ Cannot: useState, useEffect, onClick
// ❌ Cannot: browser APIs (window, document)`}</CodeBlock>
					</div>
					<div>
						<h3 className="text-sm font-semibold mb-2 text-blue-600 dark:text-blue-400">
							Client Component
						</h3>
						<CodeBlock
							filename="client-component.tsx"
							language="tsx"
						>{`"use client"; // ← This directive is required

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}

// ✅ Can: useState, useEffect, onClick
// ✅ Can: browser APIs
// ❌ Cannot: direct DB access
// ❌ Cannot: use server-only secrets`}</CodeBlock>
					</div>
				</div>
			</Section>

			<Section title="When to Use Which?">
				<div className="overflow-x-auto">
					<table className="w-full text-sm">
						<thead>
							<tr className="border-b">
								<th className="text-left py-2 pr-4 font-medium">Use Case</th>
								<th className="text-left py-2 pr-4 font-medium">Server</th>
								<th className="text-left py-2 font-medium">Client</th>
							</tr>
						</thead>
						<tbody className="text-muted-foreground">
							<tr className="border-b">
								<td className="py-2 pr-4">Fetch data</td>
								<td className="py-2 pr-4">✅</td>
								<td className="py-2">⚠️ (via API)</td>
							</tr>
							<tr className="border-b">
								<td className="py-2 pr-4">Access backend resources</td>
								<td className="py-2 pr-4">✅</td>
								<td className="py-2">❌</td>
							</tr>
							<tr className="border-b">
								<td className="py-2 pr-4">Keep secrets on server</td>
								<td className="py-2 pr-4">✅</td>
								<td className="py-2">❌</td>
							</tr>
							<tr className="border-b">
								<td className="py-2 pr-4">Interactivity (click, input)</td>
								<td className="py-2 pr-4">❌</td>
								<td className="py-2">✅</td>
							</tr>
							<tr className="border-b">
								<td className="py-2 pr-4">State (useState)</td>
								<td className="py-2 pr-4">❌</td>
								<td className="py-2">✅</td>
							</tr>
							<tr>
								<td className="py-2 pr-4">Effects (useEffect)</td>
								<td className="py-2 pr-4">❌</td>
								<td className="py-2">✅</td>
							</tr>
						</tbody>
					</table>
				</div>
			</Section>

			<Section title="Key Points">
				<div className="grid gap-3 sm:grid-cols-2">
					<DemoBox title="Zero Client JS">
						<p className="text-sm text-muted-foreground">
							Server Components send only HTML to the client. No JavaScript
							bundle for rendering — the browser just displays the result.
						</p>
					</DemoBox>
					<DemoBox title="Async Components">
						<p className="text-sm text-muted-foreground">
							Server Components can be async functions. Use await directly at
							the component level — no useEffect or loading state needed.
						</p>
					</DemoBox>
					<DemoBox title="Direct Backend Access">
						<p className="text-sm text-muted-foreground">
							Access databases, file systems, and environment secrets directly.
							No API layer needed for data that only the server sees.
						</p>
					</DemoBox>
					<DemoBox title="Default in Next.js">
						<p className="text-sm text-muted-foreground">
							Every component is a Server Component unless you add "use client".
							Start with server, add "use client" only when you need
							interactivity.
						</p>
					</DemoBox>
				</div>
			</Section>
		</DemoPage>
	);
}
