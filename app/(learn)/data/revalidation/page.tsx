import { getTranslations } from "next-intl/server";
import { CodeBlock, DemoBox, DemoPage, Section } from "@/components/demo-page";

export default async function RevalidationPage() {
	const t = await getTranslations("data.revalidation");

	return (
		<DemoPage title={t("title")} description={t("description")}>
			<Section title={t("twoStrategies")}>
				<div className="grid gap-4 md:grid-cols-2">
					<DemoBox title={t("timeBased")}>
						<p className="text-sm text-muted-foreground">
							{t("timeBasedDescription")}
						</p>
					</DemoBox>
					<DemoBox title={t("onDemand")}>
						<p className="text-sm text-muted-foreground">
							{t("onDemandDescription")}
						</p>
					</DemoBox>
				</div>
			</Section>

			<Section title={t("timeBasedSection")}>
				<CodeBlock
					filename="lib/data.ts"
					language="tsx"
				>{`import { cacheLife } from 'next/cache'

async function getProducts() {
  'use cache'
  cacheLife('hours')  // Revalidate every hour
  return db.select().from(products).all()
}

// Custom timing:
async function getSettings() {
  'use cache'
  cacheLife({
    stale: 300,      // Serve stale for 5 min
    revalidate: 60,  // Start revalidation after 1 min
    expire: 3600,    // Hard expire after 1 hour
  })
  return db.select().from(settings).all()
}`}</CodeBlock>
			</Section>

			<Section title={t("onDemandSection")}>
				<p className="text-sm text-muted-foreground mb-3">
					{t("onDemandSectionDescription")}
				</p>
				<CodeBlock
					filename="lib/data.ts"
					language="tsx"
				>{`import { cacheTag, cacheLife } from 'next/cache'

// Step 1: Tag the cached data
async function getPosts() {
  'use cache'
  cacheLife('days')
  cacheTag('posts')  // ← Tag it
  return db.select().from(posts).all()
}

async function getPost(id: number) {
  'use cache'
  cacheLife('days')
  cacheTag('posts', \`post-\${id}\`)  // ← Multiple tags
  return db.select().from(posts).where(eq(posts.id, id)).get()
}`}</CodeBlock>
				<div className="mt-3" />
				<CodeBlock filename="app/actions.ts" language="tsx">{`'use server'
import { revalidateTag } from 'next/cache'

// Step 2: Invalidate after mutation
export async function createPost(formData: FormData) {
  await db.insert(posts).values({
    title: formData.get('title'),
    content: formData.get('content'),
  })

  revalidateTag('posts')  // ← All caches tagged 'posts' refresh
}

export async function updatePost(id: number, formData: FormData) {
  await db.update(posts).set({
    title: formData.get('title'),
  }).where(eq(posts.id, id))

  revalidateTag(\`post-\${id}\`)  // ← Only this post refreshes
}`}</CodeBlock>
			</Section>

			<Section title={t("revalidatePath")}>
				<p className="text-sm text-muted-foreground mb-3">
					{t("revalidatePathDescription")}
				</p>
				<CodeBlock filename="app/actions.ts" language="tsx">{`'use server'
import { revalidatePath } from 'next/cache'

export async function createPost(formData: FormData) {
  await db.insert(posts).values({ /* ... */ })

  // Invalidate specific page
  revalidatePath('/posts')

  // Invalidate with layout (also refreshes child pages)
  revalidatePath('/posts', 'layout')

  // Invalidate dynamic route
  revalidatePath('/posts/[id]', 'page')
}`}</CodeBlock>
			</Section>

			<Section title={t("updateTagVsRevalidateTag")}>
				<div className="grid gap-4 md:grid-cols-2">
					<div>
						<h3 className="text-sm font-semibold mb-2">
							{t("revalidateTagLabel")}
						</h3>
						<CodeBlock
							filename="stale-while-revalidate"
							language="tsx"
						>{`// Marks cache as stale
// Current request sees OLD data
// NEXT request triggers revalidation
// Request after that sees NEW data

revalidateTag('posts')

// Use in: Server Actions, Route Handlers
// Pattern: stale-while-revalidate`}</CodeBlock>
					</div>
					<div>
						<h3 className="text-sm font-semibold mb-2">
							{t("updateTagLabel")}
						</h3>
						<CodeBlock
							filename="read-your-own-writes"
							language="tsx"
						>{`// Immediately expires cache
// Current request sees NEW data
// "Read your own writes" semantics

import { updateTag } from 'next/cache'
updateTag('posts')

// Use in: Server Actions ONLY
// Pattern: read-your-own-writes
// The user sees their change immediately`}</CodeBlock>
					</div>
				</div>
			</Section>

			<Section title={t("keyPoints")}>
				<div className="grid gap-3 sm:grid-cols-2">
					<DemoBox title={t("tagOverPath")}>
						<p className="text-sm text-muted-foreground">
							{t("tagOverPathDescription")}
						</p>
					</DemoBox>
					<DemoBox title={t("updateTagForForms")}>
						<p className="text-sm text-muted-foreground">
							{t("updateTagForFormsDescription")}
						</p>
					</DemoBox>
					<DemoBox title={t("noCacheNoRevalidation")}>
						<p className="text-sm text-muted-foreground">
							{t("noCacheNoRevalidationDescription")}
						</p>
					</DemoBox>
					<DemoBox title={t("serverActionsOnly")}>
						<p className="text-sm text-muted-foreground">
							{t("serverActionsOnlyDescription")}
						</p>
					</DemoBox>
				</div>
			</Section>
		</DemoPage>
	);
}
