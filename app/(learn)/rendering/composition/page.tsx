import { getTranslations } from "next-intl/server";
import {
	CodeBlock,
	DemoBox,
	DemoPage,
	FileTree,
	Section,
} from "@/components/demo-page";
import { Badge } from "@/components/ui/badge";
import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";
import { InteractiveCard } from "./interactive-card";

export default async function CompositionPage() {
	const t = await getTranslations("rendering.composition");
	// Server-side data fetching
	const allPosts = db.select().from(posts).limit(3).all();

	return (
		<DemoPage title={t("title")} description={t("description")}>
			<Section
				title={t("sectionLiveDemo")}
				description={t("sectionLiveDemoDesc")}
			>
				<div className="grid gap-4 md:grid-cols-2">
					<InteractiveCard
						title={t("serverRenderedPosts")}
						badge={t("clientWrapper")}
					>
						<div className="space-y-2">
							{allPosts.map((post) => (
								<div
									key={post.id}
									className="border-b pb-2 last:border-0 last:pb-0"
								>
									<p className="text-sm font-medium">{post.title}</p>
									<p className="text-xs text-muted-foreground">
										{post.authorName}
									</p>
								</div>
							))}
							<p className="text-xs text-muted-foreground mt-2">
								{t("serverDataNote")}
							</p>
						</div>
					</InteractiveCard>

					<InteractiveCard
						title={t("serverTimestamp")}
						badge={t("clientWrapper")}
					>
						<div className="space-y-2">
							<p className="text-sm text-muted-foreground">{t("renderedAt")}</p>
							<p className="font-mono text-sm">{new Date().toISOString()}</p>
							<p className="text-xs text-muted-foreground">
								{t("serverTimestampNote")}
							</p>
						</div>
					</InteractiveCard>
				</div>
			</Section>

			<Section title={t("sectionPattern")}>
				<FileTree>{`// ✅ CORRECT: Server content as children of Client wrapper

Server Component (page.tsx)
└── Client Component (interactive-card.tsx)  ← has useState
    └── children (React.ReactNode)           ← rendered on server!
        └── <div>{post.title}</div>          ← server data, zero client JS`}</FileTree>
			</Section>

			<Section title={t("sectionHowItWorks")}>
				<CodeBlock
					filename="app/dashboard/page.tsx (Server)"
					language="tsx"
				>{`// Server Component — fetches data, passes as children
import { db } from "@/lib/db";
import { Accordion } from "./accordion"; // Client Component

export default async function Dashboard() {
  const items = db.select().from(reports).all();

  return (
    <Accordion>
      {/* children are rendered on the server */}
      {items.map((item) => (
        <div key={item.id}>
          <h3>{item.title}</h3>
          <p>{item.summary}</p>
        </div>
      ))}
    </Accordion>
  );
}`}</CodeBlock>
				<div className="mt-3" />
				<CodeBlock
					filename="app/dashboard/accordion.tsx (Client)"
					language="tsx"
				>{`"use client";
import { useState } from "react";

export function Accordion({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(true);

  return (
    <div>
      <button onClick={() => setOpen(!open)}>
        {open ? "Collapse" : "Expand"}
      </button>
      {open && <div>{children}</div>}
      {/* children is already rendered HTML from the server */}
    </div>
  );
}`}</CodeBlock>
			</Section>

			<Section title={t("sectionCommonMistakes")}>
				<div className="grid gap-4 md:grid-cols-2">
					<div>
						<h3 className="text-sm font-semibold mb-2 text-red-600 dark:text-red-400">
							❌ {t("wrongImport")}
						</h3>
						<CodeBlock filename="wrong.tsx" language="tsx">{`"use client";

// ❌ This makes ServerData a client component!
import { ServerData } from "./server-data";

export function Wrapper() {
  const [open, setOpen] = useState(true);
  return (
    <div>
      <button onClick={() => setOpen(!open)}>Toggle</button>
      {open && <ServerData />}
      {/* ServerData is now in the client bundle */}
    </div>
  );
}`}</CodeBlock>
					</div>
					<div>
						<h3 className="text-sm font-semibold mb-2 text-green-600 dark:text-green-400">
							✅ {t("rightChildren")}
						</h3>
						<CodeBlock
							filename="right.tsx"
							language="tsx"
						>{`// page.tsx (Server Component)
import { Wrapper } from "./wrapper";
import { ServerData } from "./server-data";

export default function Page() {
  return (
    <Wrapper>
      <ServerData />
      {/* ServerData stays on the server! */}
    </Wrapper>
  );
}

// wrapper.tsx (Client Component)
"use client";
export function Wrapper({ children }) {
  const [open, setOpen] = useState(true);
  return open ? children : null;
}`}</CodeBlock>
					</div>
				</div>
			</Section>

			<Section title={t("sectionSerialization")}>
				<DemoBox title={t("serializationTitle")}>
					<div className="grid gap-2 text-sm">
						<div className="flex items-center gap-2">
							<Badge variant="secondary" className="text-xs">
								✅
							</Badge>
							<span className="text-muted-foreground">
								{t("serStringsNumbers")}
							</span>
						</div>
						<div className="flex items-center gap-2">
							<Badge variant="secondary" className="text-xs">
								✅
							</Badge>
							<span className="text-muted-foreground">
								{t("serArraysObjects")}
							</span>
						</div>
						<div className="flex items-center gap-2">
							<Badge variant="secondary" className="text-xs">
								✅
							</Badge>
							<span className="text-muted-foreground">{t("serReactNode")}</span>
						</div>
						<div className="flex items-center gap-2">
							<Badge variant="secondary" className="text-xs">
								✅
							</Badge>
							<span className="text-muted-foreground">
								{t("serServerActions")}
							</span>
						</div>
						<div className="flex items-center gap-2">
							<Badge variant="destructive" className="text-xs">
								❌
							</Badge>
							<span className="text-muted-foreground">
								{t("serNoFunctions")}
							</span>
						</div>
						<div className="flex items-center gap-2">
							<Badge variant="destructive" className="text-xs">
								❌
							</Badge>
							<span className="text-muted-foreground">
								{t("serNoEventHandlers")}
							</span>
						</div>
					</div>
				</DemoBox>
			</Section>
		</DemoPage>
	);
}
