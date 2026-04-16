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
import { getTranslations } from "next-intl/server";
import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

const categories = [
	{
		titleKey: "routing" as const,
		descKey: "routing_desc" as const,
		icon: Route,
		href: "/routing",
		count: 7,
		color: "text-blue-500",
	},
	{
		titleKey: "data" as const,
		descKey: "data_desc" as const,
		icon: Database,
		href: "/data",
		count: 6,
		color: "text-green-500",
	},
	{
		titleKey: "rendering" as const,
		descKey: "rendering_desc" as const,
		icon: Layers,
		href: "/rendering",
		count: 4,
		color: "text-purple-500",
	},
	{
		titleKey: "ui" as const,
		descKey: "ui_desc" as const,
		icon: Palette,
		href: "/ui",
		count: 6,
		color: "text-pink-500",
	},
	{
		titleKey: "advanced" as const,
		descKey: "advanced_desc" as const,
		icon: Zap,
		href: "/advanced",
		count: 10,
		color: "text-orange-500",
	},
	{
		titleKey: "config" as const,
		descKey: "config_desc" as const,
		icon: Settings,
		href: "/config",
		count: 4,
		color: "text-gray-500",
	},
	{
		titleKey: "api" as const,
		descKey: "api_desc" as const,
		icon: Server,
		href: "/api/hello",
		count: 4,
		color: "text-red-500",
	},
];

export default async function HomePage() {
	const tCommon = await getTranslations("common");
	const tNav = await getTranslations("nav");
	const tHome = await getTranslations("home");
	const totalDemos = categories.reduce((sum, cat) => sum + cat.count, 0);

	return (
		<div className="min-h-screen bg-background">
			<div className="mx-auto max-w-6xl px-6 py-16">
				<div className="mb-12 text-center">
					<h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
						{tCommon("title")}
					</h1>
					<p className="mt-4 text-lg text-muted-foreground">
						{tCommon("description", { count: totalDemos })}
					</p>
				</div>

				<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{categories.map((category) => (
						<Link key={category.titleKey} href={category.href}>
							<Card className="h-full transition-colors hover:border-foreground/20">
								<CardHeader>
									<div className="flex items-center justify-between">
										<category.icon className={`h-8 w-8 ${category.color}`} />
										<Badge variant="secondary">
											{tHome("demos", { count: category.count })}
										</Badge>
									</div>
									<CardTitle className="mt-4">
										{tNav(category.titleKey)}
									</CardTitle>
									<CardDescription>{tHome(category.descKey)}</CardDescription>
								</CardHeader>
							</Card>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
}
