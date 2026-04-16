import { getTranslations } from "next-intl/server";
import { CodeBlock, DemoBox, DemoPage, Section } from "@/components/demo-page";
import { UrlStateDemo } from "./url-state-demo";

export default async function UrlStatePage() {
	const t = await getTranslations("rendering.urlState");

	return (
		<DemoPage title={t("title")} description={t("description")}>
			<Section
				title={t("sectionLiveDemo")}
				description={t("sectionLiveDemoDesc")}
			>
				<UrlStateDemo />
			</Section>

			<Section title={t("sectionSetup")} description={t("sectionSetupDesc")}>
				<CodeBlock
					filename="app/providers.tsx"
					language="tsx"
				>{`import { NuqsAdapter } from "nuqs/adapters/next/app";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NuqsAdapter>
      {children}
    </NuqsAdapter>
  );
}`}</CodeBlock>
			</Section>

			<Section
				title={t("sectionParsers")}
				description={t("sectionParsersDesc")}
			>
				<CodeBlock filename="nuqs-parsers.ts" language="typescript">{`import {
  parseAsString,
  parseAsInteger,
  parseAsFloat,
  parseAsBoolean,
  parseAsStringEnum,
  parseAsArrayOf,
} from "nuqs";

// String (default) — ?q=hello
parseAsString.withDefault("")

// Integer — ?page=3
parseAsInteger.withDefault(1)

// Float — ?price=9.99
parseAsFloat.withDefault(0)

// Boolean — ?dark=true
parseAsBoolean.withDefault(false)

// Enum — ?sort=newest
parseAsStringEnum(["newest", "oldest", "popular"]).withDefault("newest")

// Array — ?tags=react&tags=next
parseAsArrayOf(parseAsString).withDefault([])`}</CodeBlock>
			</Section>

			<Section title={t("sectionUsage")} description={t("sectionUsageDesc")}>
				<CodeBlock
					filename="components/search.tsx"
					language="tsx"
				>{`"use client";

import { useQueryState, parseAsInteger, parseAsString } from "nuqs";

export function Search() {
  // Works like useState, but syncs with URL
  const [search, setSearch] = useQueryState(
    "q",                              // param name
    parseAsString.withDefault("")      // parser + default
  );

  const [page, setPage] = useQueryState(
    "page",
    parseAsInteger.withDefault(1)
  );

  return (
    <div>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value || null)}
      />
      <button onClick={() => setPage((p) => (p ?? 1) + 1)}>
        Next page
      </button>
      {/* Setting null removes the param from the URL */}
      <button onClick={() => setSearch(null)}>Clear</button>
    </div>
  );
}`}</CodeBlock>
			</Section>

			<Section title={t("sectionKeyPoints")}>
				<div className="grid gap-3 sm:grid-cols-2">
					<DemoBox title={t("keyTypeSafe")}>
						<p className="text-sm text-muted-foreground">
							{t("keyTypeSafeDesc")}
						</p>
					</DemoBox>
					<DemoBox title={t("keyShareable")}>
						<p className="text-sm text-muted-foreground">
							{t("keyShareableDesc")}
						</p>
					</DemoBox>
					<DemoBox title={t("keyDefaults")}>
						<p className="text-sm text-muted-foreground">
							{t("keyDefaultsDesc")}
						</p>
					</DemoBox>
					<DemoBox title={t("keySSRFriendly")}>
						<p className="text-sm text-muted-foreground">
							{t("keySSRFriendlyDesc")}
						</p>
					</DemoBox>
				</div>
			</Section>
		</DemoPage>
	);
}
