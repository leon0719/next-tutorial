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
	// Server-side data fetching
	const allPosts = db.select().from(posts).limit(3).all();

	return (
		<DemoPage
			title="Composition Pattern"
			description="The most powerful pattern in Next.js: Server Components pass children to Client Components. Interactive wrappers, server-rendered content."
		>
			<Section
				title="Live Demo — Server Content in Client Wrapper"
				description="The collapsible card below is a Client Component (interactive). But its CONTENT was rendered on the server."
			>
				<div className="grid gap-4 md:grid-cols-2">
					<InteractiveCard title="Server-Rendered Posts" badge="client wrapper">
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
								↑ This data was fetched on the server (not in the client bundle)
							</p>
						</div>
					</InteractiveCard>

					<InteractiveCard title="Server Timestamp" badge="client wrapper">
						<div className="space-y-2">
							<p className="text-sm text-muted-foreground">Rendered at:</p>
							<p className="font-mono text-sm">{new Date().toISOString()}</p>
							<p className="text-xs text-muted-foreground">
								↑ This timestamp was generated on the server at render time
							</p>
						</div>
					</InteractiveCard>
				</div>
			</Section>

			<Section title="The Pattern">
				<FileTree>{`// ✅ CORRECT: Server content as children of Client wrapper

Server Component (page.tsx)
└── Client Component (interactive-card.tsx)  ← has useState
    └── children (React.ReactNode)           ← rendered on server!
        └── <div>{post.title}</div>          ← server data, zero client JS`}</FileTree>
			</Section>

			<Section title="How It Works">
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

			<Section title="Common Mistakes">
				<div className="grid gap-4 md:grid-cols-2">
					<div>
						<h3 className="text-sm font-semibold mb-2 text-red-600 dark:text-red-400">
							❌ Wrong: Import Server in Client
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
							✅ Right: Pass as Children
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

			<Section title="Serialization Rules">
				<DemoBox title="What Can Be Passed as Props?">
					<div className="grid gap-2 text-sm">
						<div className="flex items-center gap-2">
							<Badge variant="secondary" className="text-xs">
								✅
							</Badge>
							<span className="text-muted-foreground">
								Strings, numbers, booleans, null, undefined
							</span>
						</div>
						<div className="flex items-center gap-2">
							<Badge variant="secondary" className="text-xs">
								✅
							</Badge>
							<span className="text-muted-foreground">
								Arrays and plain objects (of serializable values)
							</span>
						</div>
						<div className="flex items-center gap-2">
							<Badge variant="secondary" className="text-xs">
								✅
							</Badge>
							<span className="text-muted-foreground">
								React.ReactNode (JSX elements, children)
							</span>
						</div>
						<div className="flex items-center gap-2">
							<Badge variant="secondary" className="text-xs">
								✅
							</Badge>
							<span className="text-muted-foreground">
								Server Actions (functions marked with "use server")
							</span>
						</div>
						<div className="flex items-center gap-2">
							<Badge variant="destructive" className="text-xs">
								❌
							</Badge>
							<span className="text-muted-foreground">
								Functions, classes, Date objects, Map, Set
							</span>
						</div>
						<div className="flex items-center gap-2">
							<Badge variant="destructive" className="text-xs">
								❌
							</Badge>
							<span className="text-muted-foreground">
								Event handlers (pass from client, not server)
							</span>
						</div>
					</div>
				</DemoBox>
			</Section>
		</DemoPage>
	);
}
