import {
	CodeBlock,
	DemoBox,
	DemoPage,
	FileTree,
	Section,
} from "@/components/demo-page";
import { Badge } from "@/components/ui/badge";

export default function CachingPage() {
	return (
		<DemoPage
			title="Caching"
			description="Next.js 16 has NO default caching. You must explicitly opt in using the 'use cache' directive. This gives you full control over what's cached and for how long."
		>
			<Section title="The New Caching Model">
				<DemoBox title="Next.js 16 vs Previous Versions">
					<div className="space-y-3 text-sm">
						<div className="flex items-start gap-3">
							<Badge variant="outline" className="mt-0.5 shrink-0">
								v14/v15
							</Badge>
							<p className="text-muted-foreground">
								fetch() was cached by default. You had to opt OUT of caching
								with cache: &apos;no-store&apos;. This caused confusion — stale
								data was a common gotcha.
							</p>
						</div>
						<div className="flex items-start gap-3">
							<Badge variant="secondary" className="mt-0.5 shrink-0">
								v16
							</Badge>
							<p className="text-muted-foreground">
								Nothing is cached by default. You opt IN with &apos;use
								cache&apos;. Explicit, predictable, no surprises.
							</p>
						</div>
					</div>
				</DemoBox>
			</Section>

			<Section title="1. 'use cache' Directive">
				<p className="text-sm text-muted-foreground mb-3">
					Add &apos;use cache&apos; to a function or component to cache its
					result. Works at the function level (like &apos;use server&apos;).
				</p>
				<CodeBlock
					filename="lib/data.ts"
					language="tsx"
				>{`// Cache the entire function result
async function getProducts() {
  'use cache'
  const res = await fetch('https://api.example.com/products')
  return res.json()
}

// Cache a specific component
async function ProductList() {
  'use cache'
  const products = await getProducts()
  return (
    <ul>
      {products.map(p => <li key={p.id}>{p.name}</li>)}
    </ul>
  )
}`}</CodeBlock>
			</Section>

			<Section title="2. cacheLife() — Control Duration">
				<p className="text-sm text-muted-foreground mb-3">
					Set how long the cache should live. Use built-in profiles or custom
					durations.
				</p>
				<CodeBlock
					filename="lib/data.ts"
					language="tsx"
				>{`import { cacheLife } from 'next/cache'

async function getProducts() {
  'use cache'
  cacheLife('hours')  // Built-in profile: cache for 1 hour
  return db.query('SELECT * FROM products')
}

// Built-in profiles:
// cacheLife('seconds')  — 1 second
// cacheLife('minutes')  — 5 minutes
// cacheLife('hours')    — 1 hour
// cacheLife('days')     — 1 day
// cacheLife('weeks')    — 1 week
// cacheLife('max')      — as long as possible

// Custom duration:
async function getSettings() {
  'use cache'
  cacheLife({ stale: 300, revalidate: 60, expire: 3600 })
  return db.query('SELECT * FROM settings')
}`}</CodeBlock>
			</Section>

			<Section title="3. cacheTag() — Tag for Invalidation">
				<p className="text-sm text-muted-foreground mb-3">
					Tag cached data so you can invalidate it precisely when data changes.
				</p>
				<CodeBlock
					filename="lib/data.ts"
					language="tsx"
				>{`import { cacheLife, cacheTag } from 'next/cache'

async function getProduct(id: string) {
  'use cache'
  cacheLife('days')
  cacheTag('products', \`product-\${id}\`)
  return db.query('SELECT * FROM products WHERE id = ?', [id])
}

// Then in a Server Action:
import { revalidateTag } from 'next/cache'

async function updateProduct(id: string, data: FormData) {
  'use server'
  await db.update(products).set({ name: data.get('name') })

  // Invalidate just this product's cache
  revalidateTag(\`product-\${id}\`)

  // Or invalidate all products
  revalidateTag('products')
}`}</CodeBlock>
			</Section>

			<Section title="4. Cache Hierarchy">
				<FileTree>{`Request Flow:

Browser Request
  → Static Shell (pre-rendered at build time)
    → 'use cache' components (cached, shared across users)
      → <Suspense> boundaries (dynamic holes)
        → Dynamic data (fresh per request)

Example:
  Layout (static shell)
  ├── Header (cached — same for all users)
  ├── <Suspense fallback={<Skeleton />}>
  │   └── ProductList (cached with 'use cache')
  └── <Suspense fallback={<Skeleton />}>
      └── UserCart (dynamic — per-user data)`}</FileTree>
			</Section>

			<Section title="Key Points">
				<div className="grid gap-3 sm:grid-cols-2">
					<DemoBox title="No Default Cache">
						<p className="text-sm text-muted-foreground">
							fetch() and database queries are NOT cached unless you add
							&apos;use cache&apos;. This is the opposite of Next.js 14/15.
						</p>
					</DemoBox>
					<DemoBox title="Function-Level Caching">
						<p className="text-sm text-muted-foreground">
							&apos;use cache&apos; works at the function level, not the route
							level. You can cache specific data fetches while keeping others
							fresh.
						</p>
					</DemoBox>
					<DemoBox title="Arguments = Cache Key">
						<p className="text-sm text-muted-foreground">
							Function arguments become part of the cache key.
							getProduct(&quot;1&quot;) and getProduct(&quot;2&quot;) have
							separate cache entries.
						</p>
					</DemoBox>
					<DemoBox title="Requires Config">
						<p className="text-sm text-muted-foreground">
							Enable with cacheComponents: true in next.config.ts. This is the
							new default in Next.js 16 but may need explicit opt-in.
						</p>
					</DemoBox>
				</div>
			</Section>
		</DemoPage>
	);
}
