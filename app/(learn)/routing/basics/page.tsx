import {
	CodeBlock,
	DemoBox,
	DemoPage,
	FileTree,
	Section,
} from "@/components/demo-page";
import { NavDemo } from "./nav-demo";

export default function RoutingBasicsPage() {
	return (
		<DemoPage
			title="Routing Basics"
			description="Next.js uses a file-system based router. Every folder inside app/ becomes a URL segment, and page.tsx makes it publicly accessible."
		>
			<Section title="File Structure">
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

			<Section
				title="Navigation Methods"
				description="Next.js provides several ways to navigate between pages."
			>
				<NavDemo />
			</Section>

			<Section title="1. Link Component (Recommended)">
				<p className="text-sm text-muted-foreground mb-3">
					The {"<Link>"} component extends HTML {"<a>"} with prefetching and
					client-side navigation.
				</p>
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

			<Section title="2. useRouter Hook (Client Components)">
				<p className="text-sm text-muted-foreground mb-3">
					For programmatic navigation inside event handlers. Must be used in
					Client Components with &apos;use client&apos;.
				</p>
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

			<Section title="3. redirect() (Server Components)">
				<p className="text-sm text-muted-foreground mb-3">
					For server-side redirects inside Server Components, Server Actions, or
					Route Handlers.
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

			<Section title="Key Points">
				<div className="grid gap-3 sm:grid-cols-2">
					<DemoBox title="Prefetching">
						<p className="text-sm text-muted-foreground">
							Link automatically prefetches routes when they appear in the
							viewport. Static routes are fully prefetched; dynamic routes
							prefetch up to the nearest loading.tsx boundary.
						</p>
					</DemoBox>
					<DemoBox title="Soft vs Hard Navigation">
						<p className="text-sm text-muted-foreground">
							Client-side navigation (Link, useRouter) is &quot;soft&quot; —
							only changed segments re-render. Full page reload is
							&quot;hard&quot; — the entire page re-renders from scratch.
						</p>
					</DemoBox>
				</div>
			</Section>
		</DemoPage>
	);
}
