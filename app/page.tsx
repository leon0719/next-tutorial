import {
	ArrowRight,
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
import { CategoryProgress } from "@/components/category-progress";
import { ContinueReading } from "@/components/continue-reading";
import { Badge } from "@/components/ui/badge";
import { allPages, NEXT_VERSION, navGroups } from "@/lib/pages";

const categories = [
	{
		titleKey: "routing" as const,
		descKey: "routing_desc" as const,
		icon: Route,
		href: "/routing",
		bgClass: "bg-brutal-blue",
		textClass: "text-white",
	},
	{
		titleKey: "data" as const,
		descKey: "data_desc" as const,
		icon: Database,
		href: "/data",
		bgClass: "bg-brutal-cyan",
		textClass: "text-foreground",
	},
	{
		titleKey: "rendering" as const,
		descKey: "rendering_desc" as const,
		icon: Layers,
		href: "/rendering",
		bgClass: "bg-brutal-orange",
		textClass: "text-white",
	},
	{
		titleKey: "ui" as const,
		descKey: "ui_desc" as const,
		icon: Palette,
		href: "/ui",
		bgClass: "bg-brutal-pink",
		textClass: "text-white",
	},
	{
		titleKey: "advanced" as const,
		descKey: "advanced_desc" as const,
		icon: Zap,
		href: "/advanced",
		bgClass: "bg-brutal-yellow",
		textClass: "text-foreground",
	},
	{
		titleKey: "config" as const,
		descKey: "config_desc" as const,
		icon: Settings,
		href: "/config",
		bgClass: "bg-brutal-purple",
		textClass: "text-foreground",
	},
	{
		titleKey: "api" as const,
		descKey: "api_desc" as const,
		icon: Server,
		href: "/api-docs/hello",
		bgClass: "bg-brutal-orange",
		textClass: "text-white",
	},
];

export default async function HomePage() {
	const tCommon = await getTranslations("common");
	const tNav = await getTranslations("nav");
	const tHome = await getTranslations("home");
	const totalDemos = allPages.length;

	return (
		<div className="min-h-screen bg-background">
			{/* Hero Section */}
			<div className="relative overflow-hidden border-b-3 border-foreground">
				{/* Background grid */}
				<div className="grid-bg absolute inset-0" />
				{/* Geometric accents */}
				<div className="absolute -top-8 -right-8 h-48 w-48 rotate-12 border-3 border-foreground bg-brutal-yellow" />
				<div className="absolute -bottom-5 right-44 h-20 w-20 -rotate-6 border-3 border-foreground bg-brutal-cyan" />

				<div className="relative mx-auto max-w-6xl px-6 py-24 sm:py-32">
					<div className="text-center">
						<div className="inline-flex items-center gap-2 rounded-sm border-3 border-foreground bg-brutal-yellow px-4 py-1.5 font-heading text-xs font-bold uppercase tracking-wider shadow-[2px_2px_0_var(--foreground)]">
							<span className="relative flex h-2 w-2">
								<span className="absolute inline-flex h-full w-full rounded-full bg-brutal-orange animate-ping opacity-75" />
								<span className="relative inline-flex h-2 w-2 rounded-full bg-brutal-orange" />
							</span>
							Next.js {NEXT_VERSION} · React 19 · {totalDemos} Demos
						</div>

						<h1 className="mt-8 font-heading text-5xl font-bold uppercase tracking-tight sm:text-6xl lg:text-7xl">
							{tCommon("title")}
						</h1>
						<p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
							{tCommon("description", { count: totalDemos })}
						</p>

						<div className="mt-10 flex items-center justify-center gap-4">
							<Link
								href="/routing"
								className="inline-flex items-center gap-2 rounded-sm border-3 border-foreground bg-foreground text-background px-6 py-3 font-heading text-sm font-bold uppercase tracking-wider shadow-[4px_4px_0_var(--brutal-orange)] transition-all duration-150 hover:shadow-none hover:translate-x-1 hover:translate-y-1"
							>
								Start Learning
								<ArrowRight className="h-4 w-4" />
							</Link>
						</div>

						<ContinueReading />
					</div>
				</div>
			</div>

			{/* Categories Grid */}
			<div className="mx-auto max-w-6xl px-6 py-16">
				<div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
					{categories.map((category, index) => {
						const group = navGroups.find(
							(g) => g.labelKey === category.titleKey,
						);
						const hrefs = group?.items.map((i) => i.href) ?? [];
						const demoCount = group?.items.length ?? 0;
						return (
							<Link
								key={category.titleKey}
								href={category.href}
								className="group"
								style={{ animationDelay: `${index * 80}ms` }}
							>
								<div className="animate-fade-up relative h-full rounded-sm border-3 border-foreground bg-card p-6 shadow-[4px_4px_0_var(--foreground)] transition-all duration-150 hover:shadow-none hover:translate-x-1 hover:translate-y-1">
									{/* Corner accent triangle */}
									<div
										className={`absolute top-0 right-0 w-14 h-14 ${category.bgClass}`}
										style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
									/>

									<div className="relative">
										<div className="flex items-center justify-between mb-4">
											<div
												className={`rounded-sm border-2 border-foreground p-2.5 ${category.bgClass} ${category.textClass}`}
											>
												<category.icon className="h-5 w-5" />
											</div>
											<Badge
												variant="secondary"
												className={`font-heading text-xs ${category.bgClass} ${category.textClass} border-foreground`}
											>
												{tHome("demos", { count: demoCount })}
											</Badge>
										</div>
										<h2 className="font-heading text-lg font-bold uppercase tracking-wide mb-1.5">
											{tNav(category.titleKey)}
										</h2>
										<p className="text-sm text-muted-foreground leading-relaxed">
											{tHome(category.descKey)}
										</p>
										{hrefs.length > 0 && <CategoryProgress hrefs={hrefs} />}
										<div className="mt-4 flex items-center font-heading text-sm font-bold uppercase tracking-wider">
											<span>Explore</span>
											<ArrowRight className="ml-1 h-3.5 w-3.5" />
										</div>
									</div>
								</div>
							</Link>
						);
					})}
				</div>
			</div>
		</div>
	);
}
