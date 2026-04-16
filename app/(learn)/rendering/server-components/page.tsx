import { getTranslations } from "next-intl/server";
import { CodeBlock, DemoBox, DemoPage, Section } from "@/components/demo-page";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";

export default async function ServerComponentsPage() {
	const t = await getTranslations("rendering.serverComponents");
	// Direct database access — only possible in Server Components!
	const allPosts = db.select().from(posts).all();

	return (
		<DemoPage title={t("title")} description={t("description")}>
			<Section title={t("sectionThisPage")}>
				<DemoBox title={t("demoTitle")}>
					<div className="space-y-3">
						<p className="text-sm text-muted-foreground">
							{t("demoDescription")}
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
							{t("totalPosts", { count: allPosts.length })}
						</p>
					</div>
				</DemoBox>
			</Section>

			<Section title={t("sectionHowItWorks")}>
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

			<Section title={t("sectionServerVsClient")}>
				<div className="grid gap-4 md:grid-cols-2">
					<div>
						<h3 className="text-sm font-semibold mb-2 text-green-600 dark:text-green-400">
							{t("serverComponentDefault")}
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
							{t("clientComponent")}
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

			<Section title={t("sectionWhenToUse")}>
				<div className="overflow-x-auto">
					<table className="w-full text-sm">
						<thead>
							<tr className="border-b">
								<th className="text-left py-2 pr-4 font-medium">
									{t("tableUseCase")}
								</th>
								<th className="text-left py-2 pr-4 font-medium">
									{t("tableServer")}
								</th>
								<th className="text-left py-2 font-medium">
									{t("tableClient")}
								</th>
							</tr>
						</thead>
						<tbody className="text-muted-foreground">
							<tr className="border-b">
								<td className="py-2 pr-4">{t("tableFetchData")}</td>
								<td className="py-2 pr-4">✅</td>
								<td className="py-2">{t("tableViaApi")}</td>
							</tr>
							<tr className="border-b">
								<td className="py-2 pr-4">{t("tableAccessBackend")}</td>
								<td className="py-2 pr-4">✅</td>
								<td className="py-2">❌</td>
							</tr>
							<tr className="border-b">
								<td className="py-2 pr-4">{t("tableKeepSecrets")}</td>
								<td className="py-2 pr-4">✅</td>
								<td className="py-2">❌</td>
							</tr>
							<tr className="border-b">
								<td className="py-2 pr-4">{t("tableInteractivity")}</td>
								<td className="py-2 pr-4">❌</td>
								<td className="py-2">✅</td>
							</tr>
							<tr className="border-b">
								<td className="py-2 pr-4">{t("tableState")}</td>
								<td className="py-2 pr-4">❌</td>
								<td className="py-2">✅</td>
							</tr>
							<tr>
								<td className="py-2 pr-4">{t("tableEffects")}</td>
								<td className="py-2 pr-4">❌</td>
								<td className="py-2">✅</td>
							</tr>
						</tbody>
					</table>
				</div>
			</Section>

			<Section title={t("sectionKeyPoints")}>
				<div className="grid gap-3 sm:grid-cols-2">
					<DemoBox title={t("keyZeroClientJs")}>
						<p className="text-sm text-muted-foreground">
							{t("keyZeroClientJsDesc")}
						</p>
					</DemoBox>
					<DemoBox title={t("keyAsyncComponents")}>
						<p className="text-sm text-muted-foreground">
							{t("keyAsyncComponentsDesc")}
						</p>
					</DemoBox>
					<DemoBox title={t("keyDirectBackend")}>
						<p className="text-sm text-muted-foreground">
							{t("keyDirectBackendDesc")}
						</p>
					</DemoBox>
					<DemoBox title={t("keyDefault")}>
						<p className="text-sm text-muted-foreground">
							{t("keyDefaultDesc")}
						</p>
					</DemoBox>
				</div>
			</Section>
		</DemoPage>
	);
}
