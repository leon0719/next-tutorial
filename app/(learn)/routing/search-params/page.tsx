import { getTranslations } from "next-intl/server";
import { CodeBlock, DemoBox, DemoPage, Section } from "@/components/demo-page";
import { Badge } from "@/components/ui/badge";
import { SearchForm } from "./search-form";

export default async function SearchParamsPage({
	searchParams,
}: {
	searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
	const params = await searchParams;
	const t = await getTranslations("routing.searchParams");

	const entries = Object.entries(params);

	return (
		<DemoPage title={t("title")} description={t("description")}>
			<Section
				title={t("sectionLiveDemo")}
				description={t("sectionLiveDemoDesc")}
			>
				<div className="space-y-4">
					<div className="rounded-lg border bg-muted/30 p-4">
						<p className="text-sm font-medium mb-2">
							{t("sectionCurrentParams")}
						</p>
						{entries.length === 0 ? (
							<p className="text-sm text-muted-foreground">{t("noParams")}</p>
						) : (
							<div className="flex flex-wrap gap-2">
								{entries.map(([key, value]) => (
									<Badge
										key={key}
										variant="outline"
										className="font-mono text-xs"
									>
										{key}=
										{Array.isArray(value) ? `[${value.join(", ")}]` : value}
									</Badge>
								))}
							</div>
						)}
					</div>

					<SearchForm />
				</div>
			</Section>

			<Section
				title={t("sectionV14VsV16")}
				description={t("sectionV14VsV16Desc")}
			>
				<div className="grid gap-4 md:grid-cols-2">
					<CodeBlock
						filename="v14 (old)"
						language="tsx"
					>{`// Next.js 14 — synchronous object
export default function Page({
  searchParams,
}: {
  searchParams: {
    q?: string;
    page?: string;
  };
}) {
  // Direct access — no await needed
  const query = searchParams.q;
  const page = searchParams.page;

  return <div>Query: {query}</div>;
}`}</CodeBlock>
					<CodeBlock
						filename="v16 (current)"
						language="tsx"
					>{`// Next.js 16 — async Promise
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<
    Record<string, string | string[] | undefined>
  >;
}) {
  // Must await the Promise
  const params = await searchParams;
  const query = params.q;
  const page = params.page;

  return <div>Query: {query}</div>;
}`}</CodeBlock>
				</div>
			</Section>

			<Section
				title={t("sectionServerUsage")}
				description={t("sectionServerUsageDesc")}
			>
				<CodeBlock
					filename="app/products/page.tsx"
					language="tsx"
				>{`// Server Component — await searchParams
export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const category = params.category as string | undefined;
  const sort = params.sort as string | undefined;

  const products = await db.products.findMany({
    where: category ? { category } : undefined,
    orderBy: sort === "price" ? { price: "asc" } : { createdAt: "desc" },
  });

  return (
    <div>
      <h1>Products {category ? \`in \${category}\` : ""}</h1>
      {products.map((p) => <ProductCard key={p.id} product={p} />)}
    </div>
  );
}`}</CodeBlock>
			</Section>

			<Section
				title={t("sectionClientUsage")}
				description={t("sectionClientUsageDesc")}
			>
				<CodeBlock
					filename="components/search-bar.tsx"
					language="tsx"
				>{`"use client";

import { useRouter, useSearchParams } from "next/navigation";

export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (term) {
      params.set("q", term);
    } else {
      params.delete("q");
    }
    router.push(\`?\${params.toString()}\`);
  }

  return (
    <input
      defaultValue={searchParams.get("q") ?? ""}
      onChange={(e) => handleSearch(e.target.value)}
      placeholder="Search..."
    />
  );
}`}</CodeBlock>
			</Section>

			<Section title={t("sectionKeyPoints")}>
				<div className="grid gap-3 sm:grid-cols-2">
					<DemoBox title={t("keyPromise")}>
						<p className="text-sm text-muted-foreground">
							{t("keyPromiseDesc")}
						</p>
					</DemoBox>
					<DemoBox title={t("keyBreaking")}>
						<p className="text-sm text-muted-foreground">
							{t("keyBreakingDesc")}
						</p>
					</DemoBox>
					<DemoBox title={t("keyMultipleValues")}>
						<p className="text-sm text-muted-foreground">
							{t("keyMultipleValuesDesc")}
						</p>
					</DemoBox>
					<DemoBox title={t("keyTypeSignature")}>
						<p className="text-sm text-muted-foreground">
							{t("keyTypeSignatureDesc")}
						</p>
					</DemoBox>
				</div>
			</Section>
		</DemoPage>
	);
}
