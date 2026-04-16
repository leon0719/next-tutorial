import { CodeBlock, DemoBox, DemoPage, Section } from "@/components/demo-page";

export default function RevalidationPage() {
	return (
		<DemoPage
			title="Revalidation"
			description="Revalidation updates cached data without rebuilding the entire page. Next.js 16 offers time-based (cacheLife) and on-demand (revalidateTag, revalidatePath) strategies."
		>
			<Section title="Two Revalidation Strategies">
				<div className="grid gap-4 md:grid-cols-2">
					<DemoBox title="Time-based (cacheLife)">
						<p className="text-sm text-muted-foreground">
							Cache expires after a set duration. After expiry, the next request
							gets fresh data while stale data is served in the meantime
							(stale-while-revalidate).
						</p>
					</DemoBox>
					<DemoBox title="On-demand (revalidateTag / revalidatePath)">
						<p className="text-sm text-muted-foreground">
							Manually invalidate cache when data changes — typically inside a
							Server Action after a mutation (create, update, delete).
						</p>
					</DemoBox>
				</div>
			</Section>

			<Section title="1. Time-based with cacheLife">
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

			<Section title="2. On-demand with revalidateTag">
				<p className="text-sm text-muted-foreground mb-3">
					Tag your cached data, then invalidate by tag when data changes.
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

			<Section title="3. revalidatePath">
				<p className="text-sm text-muted-foreground mb-3">
					Invalidate all cached data for a specific URL path. Less precise than
					tags but simpler.
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

			<Section title="4. updateTag vs revalidateTag (New in v16)">
				<div className="grid gap-4 md:grid-cols-2">
					<div>
						<h3 className="text-sm font-semibold mb-2">revalidateTag</h3>
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
						<h3 className="text-sm font-semibold mb-2">updateTag (v16 new)</h3>
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

			<Section title="Key Points">
				<div className="grid gap-3 sm:grid-cols-2">
					<DemoBox title="Tag > Path">
						<p className="text-sm text-muted-foreground">
							Prefer revalidateTag over revalidatePath. Tags are precise — you
							invalidate exactly the data that changed, not an entire page.
						</p>
					</DemoBox>
					<DemoBox title="updateTag for Forms">
						<p className="text-sm text-muted-foreground">
							Use updateTag in Server Actions so the user sees their change
							immediately after submitting a form. revalidateTag would show
							stale data first.
						</p>
					</DemoBox>
					<DemoBox title="No Cache = No Revalidation">
						<p className="text-sm text-muted-foreground">
							Revalidation only works with cached data. If you don&apos;t use
							&apos;use cache&apos;, data is always fresh — no revalidation
							needed.
						</p>
					</DemoBox>
					<DemoBox title="Server Actions Only">
						<p className="text-sm text-muted-foreground">
							updateTag only works in Server Actions. revalidateTag works in
							both Server Actions and Route Handlers.
						</p>
					</DemoBox>
				</div>
			</Section>
		</DemoPage>
	);
}
