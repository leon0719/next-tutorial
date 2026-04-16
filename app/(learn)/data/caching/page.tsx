import { getTranslations } from "next-intl/server";
import {
	CodeBlock,
	DemoBox,
	DemoPage,
	FileTree,
	Section,
} from "@/components/demo-page";
import { Badge } from "@/components/ui/badge";

export default async function CachingPage() {
	const t = await getTranslations("data.caching");

	return (
		<DemoPage title={t("title")} description={t("description")}>
			<Section title={t("newModel")}>
				<DemoBox title={t("newModelTitle")}>
					<div className="space-y-3 text-sm">
						<div className="flex items-start gap-3">
							<Badge variant="outline" className="mt-0.5 shrink-0">
								{t("v14v15Badge")}
							</Badge>
							<p className="text-muted-foreground">{t("v14v15Description")}</p>
						</div>
						<div className="flex items-start gap-3">
							<Badge variant="secondary" className="mt-0.5 shrink-0">
								{t("v16Badge")}
							</Badge>
							<p className="text-muted-foreground">{t("v16Description")}</p>
						</div>
					</div>
				</DemoBox>
			</Section>

			<Section title={t("useCacheDirective")}>
				<p className="text-sm text-muted-foreground mb-3">
					{t("useCacheDirectiveDescription")}
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

			<Section title={t("cacheLife")}>
				<p className="text-sm text-muted-foreground mb-3">
					{t("cacheLifeDescription")}
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

			<Section title={t("cacheTag")}>
				<p className="text-sm text-muted-foreground mb-3">
					{t("cacheTagDescription")}
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

			<Section title={t("cacheHierarchy")}>
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

			<Section title={t("keyPoints")}>
				<div className="grid gap-3 sm:grid-cols-2">
					<DemoBox title={t("noDefaultCache")}>
						<p className="text-sm text-muted-foreground">
							{t("noDefaultCacheDescription")}
						</p>
					</DemoBox>
					<DemoBox title={t("functionLevelCaching")}>
						<p className="text-sm text-muted-foreground">
							{t("functionLevelCachingDescription")}
						</p>
					</DemoBox>
					<DemoBox title={t("argumentsCacheKey")}>
						<p className="text-sm text-muted-foreground">
							{t("argumentsCacheKeyDescription")}
						</p>
					</DemoBox>
					<DemoBox title={t("requiresConfig")}>
						<p className="text-sm text-muted-foreground">
							{t("requiresConfigDescription")}
						</p>
					</DemoBox>
				</div>
			</Section>
		</DemoPage>
	);
}
