import Link from "next/link";
import { getTranslations } from "next-intl/server";
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

export default async function InterceptingRoutesPage() {
	const t = await getTranslations("routing.intercepting");

	return (
		<DemoPage title={t("title")} description={t("description")}>
			<Section title={t("fileStructure")}>
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

			<Section title={t("howItWorks")}>
				<DemoBox title={t("twoPaths")}>
					<div className="space-y-4">
						<div className="flex items-start gap-3">
							<Badge variant="secondary" className="mt-0.5 shrink-0">
								{t("softNav")}
							</Badge>
							<p className="text-sm text-muted-foreground">
								{t("softNavDesc")}
							</p>
						</div>
						<div className="flex items-start gap-3">
							<Badge variant="outline" className="mt-0.5 shrink-0">
								{t("hardNav")}
							</Badge>
							<p className="text-sm text-muted-foreground">
								{t("hardNavDesc")}
							</p>
						</div>
					</div>
				</DemoBox>
			</Section>

			<Section title={t("photoDemo")} description={t("photoDemoDesc")}>
				<div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
					{photos.map((photo) => (
						<Link
							key={photo.id}
							href={`/routing/intercepting/${photo.id}`}
							className="group block"
						>
							<Card className="overflow-hidden group-hover:border-foreground/20 group-hover:shadow-none group-hover:translate-x-1 group-hover:translate-y-1">
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

			<Section title={t("syntax")}>
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

			<Section title={t("completeExample")}>
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

			<Section title={t("keyPoints")}>
				<div className="grid gap-3 sm:grid-cols-2">
					<DemoBox title={t("requiresParallel")}>
						<p className="text-sm text-muted-foreground">
							{t("requiresParallelDesc")}
						</p>
					</DemoBox>
					<DemoBox title={t("urlUpdates")}>
						<p className="text-sm text-muted-foreground">
							{t("urlUpdatesDesc")}
						</p>
					</DemoBox>
					<DemoBox title={t("commonUseCases")}>
						<p className="text-sm text-muted-foreground">
							{t("commonUseCasesDesc")}
						</p>
					</DemoBox>
					<DemoBox title={t("refreshFullPage")}>
						<p className="text-sm text-muted-foreground">
							{t("refreshFullPageDesc")}
						</p>
					</DemoBox>
				</div>
			</Section>
		</DemoPage>
	);
}
