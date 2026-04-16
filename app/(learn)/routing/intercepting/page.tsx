import Link from "next/link";
import {
	CodeBlock,
	DemoBox,
	DemoPage,
	FileTree,
	Section,
} from "@/components/demo-page";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const photos = [
	{
		id: 1,
		title: "Mountain Sunrise",
		color: "bg-orange-200 dark:bg-orange-900",
	},
	{ id: 2, title: "Ocean Waves", color: "bg-blue-200 dark:bg-blue-900" },
	{ id: 3, title: "Forest Path", color: "bg-green-200 dark:bg-green-900" },
	{ id: 4, title: "City Lights", color: "bg-purple-200 dark:bg-purple-900" },
	{ id: 5, title: "Desert Dunes", color: "bg-yellow-200 dark:bg-yellow-900" },
	{ id: 6, title: "Snow Peaks", color: "bg-slate-200 dark:bg-slate-900" },
];

export default function InterceptingRoutesPage() {
	return (
		<DemoPage
			title="Intercepting Routes"
			description="Intercepting routes let you load a route within the current layout — perfect for modals that show content without losing page context."
		>
			<Section title="File Structure">
				<FileTree>{`app/
├── @modal/                     ← Parallel route slot for modal
│   ├── default.tsx             ← Empty default (no modal shown)
│   └── (.)photos/[id]/
│       └── page.tsx            ← Intercepted! Shows in modal
│
├── photos/
│   ├── page.tsx                ← Photo gallery (list)
│   └── [id]/
│       └── page.tsx            ← Full photo page (direct access)
│
└── layout.tsx                  ← Renders {children} + {modal}`}</FileTree>
			</Section>

			<Section title="How Interception Works">
				<DemoBox title="The Two Paths">
					<div className="space-y-4">
						<div className="flex items-start gap-3">
							<Badge variant="secondary" className="mt-0.5 shrink-0">
								Soft Nav
							</Badge>
							<p className="text-sm text-muted-foreground">
								Clicking a Link → route is <strong>intercepted</strong> →
								content loads in a modal overlay → URL updates but page stays
							</p>
						</div>
						<div className="flex items-start gap-3">
							<Badge variant="outline" className="mt-0.5 shrink-0">
								Hard Nav
							</Badge>
							<p className="text-sm text-muted-foreground">
								Direct URL / page refresh → goes to the <strong>actual</strong>{" "}
								route → full page renders normally
							</p>
						</div>
					</div>
				</DemoBox>
			</Section>

			<Section
				title="Demo — Photo Gallery"
				description="Click a photo to see the detail page. In a full implementation, clicking would show a modal (intercepted), while direct URL access shows the full page."
			>
				<div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
					{photos.map((photo) => (
						<Link key={photo.id} href={`/routing/intercepting/${photo.id}`}>
							<Card className="overflow-hidden transition-colors hover:border-foreground/20">
								<div className={`h-24 ${photo.color}`} />
								<CardContent className="p-3">
									<p className="text-sm font-medium">{photo.title}</p>
									<p className="text-xs text-muted-foreground">
										ID: {photo.id}
									</p>
								</CardContent>
							</Card>
						</Link>
					))}
				</div>
			</Section>

			<Section title="Interception Syntax">
				<CodeBlock
					filename="Convention"
					language="text"
				>{`(.)   → Intercepts same level
        /feed/(.)photo/[id]  intercepts  /feed/photo/[id]

(..)  → Intercepts one level up
        /feed/photo/(..)comments  intercepts  /feed/comments

(..)(..) → Intercepts two levels up

(...)  → Intercepts from app root
        /app/@modal/(...)photos/[id]  intercepts  /photos/[id]`}</CodeBlock>
			</Section>

			<Section title="Complete Example — Modal Pattern">
				<CodeBlock
					filename="app/layout.tsx"
					language="tsx"
				>{`// Root layout renders the modal slot
export default function RootLayout({
  children,
  modal,   // ← @modal parallel route slot
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html>
      <body>
        {children}
        {modal}  {/* Modal renders on top when intercepted */}
      </body>
    </html>
  );
}`}</CodeBlock>
				<div className="mt-3" />
				<CodeBlock
					filename="app/@modal/(.)photos/[id]/page.tsx"
					language="tsx"
				>{`// Intercepted route — renders in a modal
import { Modal } from "@/components/modal";

export default async function PhotoModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const photo = await getPhoto(id);

  return (
    <Modal>
      <img src={photo.url} alt={photo.title} />
      <h2>{photo.title}</h2>
    </Modal>
  );
}`}</CodeBlock>
				<div className="mt-3" />
				<CodeBlock
					filename="app/photos/[id]/page.tsx"
					language="tsx"
				>{`// Actual route — renders as full page (direct URL or refresh)
export default async function PhotoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const photo = await getPhoto(id);

  return (
    <div className="max-w-4xl mx-auto p-8">
      <img src={photo.url} alt={photo.title} />
      <h1>{photo.title}</h1>
      <p>{photo.description}</p>
    </div>
  );
}`}</CodeBlock>
			</Section>

			<Section title="Key Points">
				<div className="grid gap-3 sm:grid-cols-2">
					<DemoBox title="Requires Parallel Routes">
						<p className="text-sm text-muted-foreground">
							The modal pattern needs a @modal parallel route slot in the
							layout. The intercepted route goes inside @modal/(.)path.
						</p>
					</DemoBox>
					<DemoBox title="URL Updates">
						<p className="text-sm text-muted-foreground">
							The URL updates to the intercepted route (shareable!), but the
							content loads in-place without a full page navigation.
						</p>
					</DemoBox>
					<DemoBox title="Common Use Cases">
						<p className="text-sm text-muted-foreground">
							Photo galleries, login modals, shopping cart previews, social
							media post details — anything that benefits from an overlay.
						</p>
					</DemoBox>
					<DemoBox title="Refresh = Full Page">
						<p className="text-sm text-muted-foreground">
							Refreshing the page or sharing the URL loads the actual route (not
							the intercepted version). Best of both worlds.
						</p>
					</DemoBox>
				</div>
			</Section>
		</DemoPage>
	);
}
