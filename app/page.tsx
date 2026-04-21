import type { LucideIcon } from "lucide-react";
import {
	ArrowRight,
	Database,
	Layers,
	Palette,
	Route,
	Server,
	Settings,
	Sparkles,
	Zap,
} from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { CategoryProgress } from "@/components/category-progress";
import { ContinueReading } from "@/components/continue-reading";
import { LearningPaths } from "@/components/learning-paths";
import { Badge } from "@/components/ui/badge";
import { allPages, NEXT_VERSION, navGroups } from "@/lib/pages";

type TileSize = "hero" | "wide" | "normal";

type TitleKey =
	| "routing"
	| "data"
	| "rendering"
	| "ui"
	| "advanced"
	| "config"
	| "api";

type DescKey =
	| "routing_desc"
	| "data_desc"
	| "rendering_desc"
	| "ui_desc"
	| "advanced_desc"
	| "config_desc"
	| "api_desc";

type Tile = {
	titleKey: TitleKey;
	descKey: DescKey;
	icon: LucideIcon;
	href: string;
	bgClass: string;
	textClass: string;
	size: TileSize;
	gridClass: string;
};

const tiles: Tile[] = [
	{
		titleKey: "routing",
		descKey: "routing_desc",
		icon: Route,
		href: "/routing",
		bgClass: "bg-brutal-blue",
		textClass: "text-white",
		size: "hero",
		gridClass: "sm:col-span-2 lg:col-span-6 lg:row-span-2",
	},
	{
		titleKey: "data",
		descKey: "data_desc",
		icon: Database,
		href: "/data",
		bgClass: "bg-brutal-cyan",
		textClass: "text-brutal-ink",
		size: "wide",
		gridClass: "sm:col-span-2 lg:col-span-6",
	},
	{
		titleKey: "rendering",
		descKey: "rendering_desc",
		icon: Layers,
		href: "/rendering",
		bgClass: "bg-brutal-orange",
		textClass: "text-white",
		size: "normal",
		gridClass: "lg:col-span-3",
	},
	{
		titleKey: "ui",
		descKey: "ui_desc",
		icon: Palette,
		href: "/ui",
		bgClass: "bg-brutal-pink",
		textClass: "text-white",
		size: "normal",
		gridClass: "lg:col-span-3",
	},
	{
		titleKey: "advanced",
		descKey: "advanced_desc",
		icon: Zap,
		href: "/advanced",
		bgClass: "bg-brutal-yellow",
		textClass: "text-brutal-ink",
		size: "wide",
		gridClass: "sm:col-span-2 lg:col-span-6",
	},
	{
		titleKey: "config",
		descKey: "config_desc",
		icon: Settings,
		href: "/config",
		bgClass: "bg-brutal-purple",
		textClass: "text-brutal-ink",
		size: "normal",
		gridClass: "lg:col-span-3",
	},
	{
		titleKey: "api",
		descKey: "api_desc",
		icon: Server,
		href: "/api-docs/hello",
		bgClass: "bg-brutal-orange",
		textClass: "text-white",
		size: "normal",
		gridClass: "lg:col-span-3",
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
						<div className="inline-flex items-center gap-2 rounded-sm border-3 border-foreground bg-brutal-yellow px-4 py-1.5 font-heading text-xs font-bold uppercase tracking-wider text-brutal-ink shadow-[2px_2px_0_var(--foreground)]">
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

			{/* Learning Paths */}
			<LearningPaths />

			{/* Bento Categories Grid */}
			<div className="mx-auto max-w-6xl px-6 pt-8 pb-16">
				<div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-12 lg:auto-rows-[minmax(200px,auto)]">
					{tiles.map((tile, index) => {
						const group = navGroups.find((g) => g.labelKey === tile.titleKey);
						const hrefs = group?.items.map((i) => i.href) ?? [];
						const demoCount = group?.items.length ?? 0;
						const previews = (group?.items ?? []).slice(1, 5);

						return (
							<BentoTile
								key={tile.titleKey}
								tile={tile}
								title={tNav(tile.titleKey)}
								description={tHome(tile.descKey)}
								demoCountLabel={tHome("demos", { count: demoCount })}
								previews={previews}
								hrefs={hrefs}
								delay={index * 70}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
}

interface BentoTileProps {
	tile: Tile;
	title: string;
	description: string;
	demoCountLabel: string;
	previews: { title: string; href: string }[];
	hrefs: string[];
	delay: number;
}

function BentoTile({
	tile,
	title,
	description,
	demoCountLabel,
	previews,
	hrefs,
	delay,
}: BentoTileProps) {
	const Icon = tile.icon;

	if (tile.size === "hero") {
		return (
			<Link href={tile.href} className={`group ${tile.gridClass}`}>
				<div
					className="animate-fade-up relative flex h-full flex-col overflow-hidden rounded-sm border-3 border-foreground bg-card p-8 shadow-[6px_6px_0_var(--foreground)] transition-all duration-200 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[4px_4px_0_var(--foreground)]"
					style={{ animationDelay: `${delay}ms` }}
				>
					{/* Diagonal stripes pattern */}
					<div
						aria-hidden
						className="pointer-events-none absolute inset-0 opacity-[0.06]"
						style={{
							backgroundImage:
								"repeating-linear-gradient(135deg, var(--foreground) 0 1px, transparent 1px 14px)",
						}}
					/>
					{/* Corner accent triangle */}
					<div
						aria-hidden
						className={`absolute top-0 right-0 h-28 w-28 ${tile.bgClass}`}
						style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
					/>

					<div className="relative flex h-full flex-col">
						<div className="flex items-start justify-between">
							<div
								className={`rounded-sm border-3 border-foreground p-4 shadow-[3px_3px_0_var(--foreground)] ${tile.bgClass} ${tile.textClass}`}
							>
								<Icon className="h-8 w-8" strokeWidth={2.25} />
							</div>
							<div className="flex flex-col items-end gap-1.5 pr-2">
								<span className="inline-flex items-center gap-1 rounded-sm border-2 border-foreground bg-foreground px-2 py-0.5 font-heading text-[10px] font-bold uppercase tracking-[0.22em] text-background">
									<Sparkles className="h-2.5 w-2.5" strokeWidth={3} />
									Start Here
								</span>
								<Badge
									variant="secondary"
									className={`border-foreground font-heading text-xs ${tile.bgClass} ${tile.textClass}`}
								>
									{demoCountLabel}
								</Badge>
							</div>
						</div>

						<h2 className="mt-6 font-heading text-3xl font-bold uppercase tracking-tight sm:text-4xl">
							{title}
						</h2>
						<p className="mt-3 max-w-md text-base leading-relaxed text-muted-foreground">
							{description}
						</p>

						{previews.length > 0 && (
							<div className="mt-5 flex flex-wrap gap-2">
								{previews.map((p) => (
									<span
										key={p.href}
										className="inline-flex items-center border-2 border-foreground bg-background px-2.5 py-1 font-mono text-[11px] font-bold tracking-tight"
									>
										{p.title}
									</span>
								))}
								{hrefs.length - 1 > previews.length && (
									<span className="inline-flex items-center font-mono text-[11px] font-bold tracking-tight text-muted-foreground">
										+{hrefs.length - 1 - previews.length} more
									</span>
								)}
							</div>
						)}

						<div className="mt-auto pt-6">
							{hrefs.length > 0 && <CategoryProgress hrefs={hrefs} />}
							<div className="mt-4 flex items-center font-heading text-sm font-bold uppercase tracking-wider transition-transform duration-200 group-hover:translate-x-1">
								<span>Dive In</span>
								<ArrowRight className="ml-2 h-4 w-4" strokeWidth={3} />
							</div>
						</div>
					</div>
				</div>
			</Link>
		);
	}

	if (tile.size === "wide") {
		return (
			<Link href={tile.href} className={`group ${tile.gridClass}`}>
				<div
					className="animate-fade-up relative flex h-full overflow-hidden rounded-sm border-3 border-foreground bg-card p-5 shadow-[4px_4px_0_var(--foreground)] transition-all duration-150 hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
					style={{ animationDelay: `${delay}ms` }}
				>
					<div
						aria-hidden
						className={`absolute top-0 right-0 h-16 w-16 ${tile.bgClass}`}
						style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
					/>

					<div className="relative flex h-full w-full gap-5">
						{/* Left: icon column */}
						<div className="shrink-0">
							<div
								className={`rounded-sm border-3 border-foreground p-3.5 shadow-[2px_2px_0_var(--foreground)] ${tile.bgClass} ${tile.textClass}`}
							>
								<Icon className="h-7 w-7" strokeWidth={2.25} />
							</div>
						</div>

						{/* Right: content */}
						<div className="flex min-w-0 flex-1 flex-col">
							<div className="mb-1.5 flex items-center gap-2 pr-10">
								<h2 className="truncate font-heading text-xl font-bold uppercase tracking-wide">
									{title}
								</h2>
								<Badge
									variant="secondary"
									className={`shrink-0 border-foreground font-heading text-[10px] ${tile.bgClass} ${tile.textClass}`}
								>
									{demoCountLabel}
								</Badge>
							</div>
							<p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
								{description}
							</p>

							{previews.length > 0 && (
								<div className="mt-3 flex flex-wrap gap-1.5">
									{previews.slice(0, 3).map((p) => (
										<span
											key={p.href}
											className="inline-flex items-center border-2 border-foreground bg-background px-2 py-0.5 font-mono text-[10px] font-bold"
										>
											{p.title}
										</span>
									))}
								</div>
							)}

							{hrefs.length > 0 && (
								<div className="mt-auto pt-3">
									<CategoryProgress hrefs={hrefs} />
								</div>
							)}
						</div>
					</div>
				</div>
			</Link>
		);
	}

	// Normal tile
	return (
		<Link href={tile.href} className={`group ${tile.gridClass}`}>
			<div
				className="animate-fade-up relative flex h-full flex-col overflow-hidden rounded-sm border-3 border-foreground bg-card p-6 shadow-[4px_4px_0_var(--foreground)] transition-all duration-150 hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
				style={{ animationDelay: `${delay}ms` }}
			>
				<div
					aria-hidden
					className={`absolute top-0 right-0 h-14 w-14 ${tile.bgClass}`}
					style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
				/>

				<div className="relative flex h-full flex-col">
					<div className="mb-4 flex items-center justify-between">
						<div
							className={`rounded-sm border-2 border-foreground p-2.5 ${tile.bgClass} ${tile.textClass}`}
						>
							<Icon className="h-5 w-5" />
						</div>
						<Badge
							variant="secondary"
							className={`border-foreground font-heading text-xs ${tile.bgClass} ${tile.textClass}`}
						>
							{demoCountLabel}
						</Badge>
					</div>
					<h2 className="mb-1.5 font-heading text-lg font-bold uppercase tracking-wide">
						{title}
					</h2>
					<p className="text-sm leading-relaxed text-muted-foreground">
						{description}
					</p>
					{hrefs.length > 0 && <CategoryProgress hrefs={hrefs} />}
					<div className="mt-auto flex items-center pt-4 font-heading text-sm font-bold uppercase tracking-wider">
						<span>Explore</span>
						<ArrowRight className="ml-1 h-3.5 w-3.5" />
					</div>
				</div>
			</div>
		</Link>
	);
}
