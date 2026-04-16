import { getTranslations } from "next-intl/server";
import {
	CodeBlock,
	DemoBox,
	DemoPage,
	FileTree,
	Section,
} from "@/components/demo-page";
import { NavDemo } from "./nav-demo";

export default async function RoutingBasicsPage() {
	const t = await getTranslations("routing.basics");

	return (
		<DemoPage title={t("title")} description={t("description")}>
			<Section title={t("fileStructure")}>
				<FileTree>{`app/
├── layout.tsx        ← Root Layout (wraps all pages)
├── page.tsx          ← / (home)
├── about/
│   └── page.tsx      ← /about
├── blog/
│   ├── page.tsx      ← /blog
│   └── [slug]/
│       └── page.tsx  ← /blog/hello-world
└── (learn)/
    └── routing/
        └── basics/
            └── page.tsx  ← /routing/basics (this page!)`}</FileTree>
			</Section>

			<Section title={t("navMethods")} description={t("navMethodsDesc")}>
				<NavDemo />
			</Section>

			<Section title={t("linkSection")}>
				<p className="text-sm text-muted-foreground mb-3">{t("linkDesc")}</p>
				<CodeBlock
					filename="app/page.tsx"
					language="tsx"
				>{`import Link from "next/link";

// Basic link
<Link href="/about">About</Link>

// With prefetch disabled
<Link href="/heavy-page" prefetch={false}>Heavy Page</Link>

// Dynamic route
<Link href={\`/blog/\${post.slug}\`}>{post.title}</Link>`}</CodeBlock>
			</Section>

			<Section title={t("routerSection")}>
				<p className="text-sm text-muted-foreground mb-3">{t("routerDesc")}</p>
				<CodeBlock
					filename="components/nav-button.tsx"
					language="tsx"
				>{`"use client";
import { useRouter } from "next/navigation";

export function NavButton() {
  const router = useRouter();

  return (
    <div>
      <button onClick={() => router.push("/about")}>
        Go to About (adds to history)
      </button>
      <button onClick={() => router.replace("/about")}>
        Go to About (replaces current)
      </button>
      <button onClick={() => router.back()}>
        Go Back
      </button>
      <button onClick={() => router.refresh()}>
        Refresh (re-fetch server components)
      </button>
    </div>
  );
}`}</CodeBlock>
			</Section>

			<Section title={t("redirectSection")}>
				<p className="text-sm text-muted-foreground mb-3">
					{t("redirectDesc")}
				</p>
				<CodeBlock
					filename="app/old-page/page.tsx"
					language="tsx"
				>{`import { redirect } from "next/navigation";

export default function OldPage() {
  // This runs on the server
  redirect("/new-page"); // 307 temporary redirect
  // or: permanentRedirect("/new-page"); // 308 permanent
}`}</CodeBlock>
			</Section>

			<Section title={t("keyPoints")}>
				<div className="grid gap-3 sm:grid-cols-2">
					<DemoBox title={t("prefetching")}>
						<p className="text-sm text-muted-foreground">
							{t("prefetchingDesc")}
						</p>
					</DemoBox>
					<DemoBox title={t("softHard")}>
						<p className="text-sm text-muted-foreground">{t("softHardDesc")}</p>
					</DemoBox>
				</div>
			</Section>
		</DemoPage>
	);
}
