import {
	Database,
	Layers,
	Palette,
	Route,
	Server,
	Settings,
	Zap,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

const categories = [
	{
		title: "Routing",
		description:
			"File-based routing, dynamic routes, parallel routes, intercepting routes, and more.",
		icon: Route,
		href: "/routing",
		count: 7,
		color: "text-blue-500",
	},
	{
		title: "Data",
		description:
			"Server-side fetching, client-side queries, caching, revalidation, and server actions.",
		icon: Database,
		href: "/data",
		count: 6,
		color: "text-green-500",
	},
	{
		title: "Rendering",
		description:
			"Server components, client components, composition patterns, and state management.",
		icon: Layers,
		href: "/rendering",
		count: 4,
		color: "text-purple-500",
	},
	{
		title: "UI & Assets",
		description: "CSS, images, fonts, metadata, animations, and theming.",
		icon: Palette,
		href: "/ui",
		count: 6,
		color: "text-pink-500",
	},
	{
		title: "Advanced",
		description:
			"Middleware, i18n, auth, draft mode, edge runtime, MDX, and more.",
		icon: Zap,
		href: "/advanced",
		count: 10,
		color: "text-orange-500",
	},
	{
		title: "Config",
		description:
			"Environment variables, redirects, headers, CSP, and bundle analysis.",
		icon: Settings,
		href: "/config",
		count: 4,
		color: "text-gray-500",
	},
	{
		title: "API (Hono)",
		description:
			"Route handlers with Hono — REST CRUD, OG image generation, and streaming.",
		icon: Server,
		href: "/api/hello",
		count: 4,
		color: "text-red-500",
	},
];

export default function HomePage() {
	const totalDemos = categories.reduce((sum, cat) => sum + cat.count, 0);

	return (
		<div className="min-h-screen bg-background">
			<div className="mx-auto max-w-6xl px-6 py-16">
				<div className="mb-12 text-center">
					<h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
						Next.js Learning Hub
					</h1>
					<p className="mt-4 text-lg text-muted-foreground">
						Interactive feature showcase — {totalDemos} demos covering every
						Next.js 16 feature
					</p>
				</div>

				<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{categories.map((category) => (
						<Link key={category.title} href={category.href}>
							<Card className="h-full transition-colors hover:border-foreground/20">
								<CardHeader>
									<div className="flex items-center justify-between">
										<category.icon className={`h-8 w-8 ${category.color}`} />
										<Badge variant="secondary">{category.count} demos</Badge>
									</div>
									<CardTitle className="mt-4">{category.title}</CardTitle>
									<CardDescription>{category.description}</CardDescription>
								</CardHeader>
							</Card>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
}
