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
import { Badge } from "@/components/ui/badge";

const categories = [
	{
		titleKey: "routing" as const,
		descKey: "routing_desc" as const,
		icon: Route,
		href: "/routing",
		count: 8,
		gradient: "from-blue-500/10 to-blue-500/5",
		iconColor: "text-blue-500",
		borderHover: "hover:border-blue-500/30",
	},
	{
		titleKey: "data" as const,
		descKey: "data_desc" as const,
		icon: Database,
		href: "/data",
		count: 7,
		gradient: "from-emerald-500/10 to-emerald-500/5",
		iconColor: "text-emerald-500",
		borderHover: "hover:border-emerald-500/30",
	},
	{
		titleKey: "rendering" as const,
		descKey: "rendering_desc" as const,
		icon: Layers,
		href: "/rendering",
		count: 6,
		gradient: "from-violet-500/10 to-violet-500/5",
		iconColor: "text-violet-500",
		borderHover: "hover:border-violet-500/30",
	},
	{
		titleKey: "ui" as const,
		descKey: "ui_desc" as const,
		icon: Palette,
		href: "/ui",
		count: 6,
		gradient: "from-pink-500/10 to-pink-500/5",
		iconColor: "text-pink-500",
		borderHover: "hover:border-pink-500/30",
	},
	{
		titleKey: "advanced" as const,
		descKey: "advanced_desc" as const,
		icon: Zap,
		href: "/advanced",
		count: 10,
		gradient: "from-amber-500/10 to-amber-500/5",
		iconColor: "text-amber-500",
		borderHover: "hover:border-amber-500/30",
	},
	{
		titleKey: "config" as const,
		descKey: "config_desc" as const,
		icon: Settings,
		href: "/config",
		count: 4,
		gradient: "from-slate-500/10 to-slate-500/5",
		iconColor: "text-slate-500",
		borderHover: "hover:border-slate-500/30",
	},
	{
		titleKey: "api" as const,
		descKey: "api_desc" as const,
		icon: Server,
		href: "/api-docs/hello",
		count: 4,
		gradient: "from-red-500/10 to-red-500/5",
		iconColor: "text-red-500",
		borderHover: "hover:border-red-500/30",
	},
];

export default async function HomePage() {
	const tCommon = await getTranslations("common");
	const tNav = await getTranslations("nav");
	const tHome = await getTranslations("home");
	const totalDemos = categories.reduce((sum, cat) => sum + cat.count, 0);

	return (
		<div className="min-h-screen bg-background">
			{/* Hero Section */}
			<div className="relative overflow-hidden border-b">
				{/* Background effects */}
				<div className="dot-grid absolute inset-0" />
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-amber-500/5 dark:bg-amber-500/10 rounded-full blur-3xl" />

				<div className="relative mx-auto max-w-6xl px-6 py-24 sm:py-32">
					<div className="text-center">
						<div className="inline-flex items-center gap-2 rounded-full border bg-background/80 backdrop-blur-sm px-4 py-1.5 text-sm text-muted-foreground mb-8">
							<span className="relative flex h-2 w-2">
								<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
								<span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
							</span>
							Next.js 16.2.4 · React 19 · {totalDemos} Demos
						</div>

						<h1 className="font-heading text-5xl font-normal tracking-tight sm:text-6xl lg:text-7xl">
							{tCommon("title")}
						</h1>
						<p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
							{tCommon("description", { count: totalDemos })}
						</p>

						<div className="mt-10 flex items-center justify-center gap-4">
							<Link
								href="/routing"
								className="inline-flex items-center gap-2 rounded-lg bg-foreground text-background px-5 py-2.5 text-sm font-medium transition-opacity hover:opacity-90"
							>
								Start Learning
								<ArrowRight className="h-4 w-4" />
							</Link>
						</div>
					</div>
				</div>
			</div>

			{/* Categories Grid */}
			<div className="mx-auto max-w-6xl px-6 py-16">
				<div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
					{categories.map((category, index) => (
						<Link
							key={category.titleKey}
							href={category.href}
							className="group"
							style={{ animationDelay: `${index * 80}ms` }}
						>
							<div
								className={`animate-fade-up relative h-full rounded-xl border bg-card p-6 transition-all duration-300 ${category.borderHover} hover:shadow-lg hover:-translate-y-0.5`}
							>
								<div
									className={`absolute inset-0 rounded-xl bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
								/>

								<div className="relative">
									<div className="flex items-center justify-between mb-4">
										<div
											className={`rounded-lg bg-muted p-2.5 ${category.iconColor}`}
										>
											<category.icon className="h-5 w-5" />
										</div>
										<Badge variant="secondary" className="font-mono text-xs">
											{tHome("demos", { count: category.count })}
										</Badge>
									</div>
									<h2 className="text-lg font-semibold mb-1.5 group-hover:text-foreground transition-colors">
										{tNav(category.titleKey)}
									</h2>
									<p className="text-sm text-muted-foreground leading-relaxed">
										{tHome(category.descKey)}
									</p>
									<div className="mt-4 flex items-center text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
										<span className={category.iconColor}>Explore</span>
										<ArrowRight
											className={`ml-1 h-3.5 w-3.5 ${category.iconColor}`}
										/>
									</div>
								</div>
							</div>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
}
