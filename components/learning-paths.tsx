import { ArrowRight, Compass, Flame, Sprout } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { allPages } from "@/lib/pages";

type PathKey = "beginner" | "advanced";

const MINUTES_PER_STEP = 4;

const PATHS: Record<PathKey, string[]> = {
	beginner: [
		"/routing/basics",
		"/routing/dynamic/hello-world",
		"/data/fetching",
		"/rendering/server-components",
		"/ui/css",
	],
	advanced: [
		"/routing/parallel",
		"/data/server-actions",
		"/data/streaming",
		"/advanced/edge-runtime",
		"/advanced/proxy",
	],
};

function resolveSteps(hrefs: string[]) {
	return hrefs.map((href) => {
		const page = allPages.find((p) => p.href === href);
		return { href, title: page?.label ?? page?.title ?? href };
	});
}

export async function LearningPaths() {
	const t = await getTranslations("paths");

	return (
		<section className="mx-auto max-w-6xl px-6 pt-16 pb-4">
			<div className="mb-8 flex flex-col items-start gap-3 sm:flex-row sm:items-end sm:justify-between">
				<div>
					<div className="inline-flex items-center gap-1.5 border-2 border-foreground bg-brutal-yellow px-2 py-0.5 font-heading text-[10px] font-bold uppercase tracking-[0.22em]">
						<Compass className="h-3 w-3" strokeWidth={3} />
						{t("title")}
					</div>
					<h2 className="mt-3 font-heading text-2xl font-bold uppercase tracking-tight sm:text-3xl">
						{t("heading")}
					</h2>
					<p className="mt-2 max-w-xl text-sm text-muted-foreground leading-relaxed">
						{t("subtitle")}
					</p>
				</div>
			</div>

			<div className="grid gap-6 lg:grid-cols-2">
				<PathCard
					pathKey="beginner"
					levelTitle={t("beginner.level")}
					trackTitle={t("beginner.title")}
					description={t("beginner.description")}
					stepCountLabel={t("steps", { count: PATHS.beginner.length })}
					durationLabel={t("duration", {
						min: PATHS.beginner.length * MINUTES_PER_STEP,
					})}
					startHere={t("startHere")}
					icon={<Sprout className="h-5 w-5" strokeWidth={2.25} />}
					accentClass="bg-brutal-cyan text-foreground"
					steps={resolveSteps(PATHS.beginner)}
				/>
				<PathCard
					pathKey="advanced"
					levelTitle={t("advanced.level")}
					trackTitle={t("advanced.title")}
					description={t("advanced.description")}
					stepCountLabel={t("steps", { count: PATHS.advanced.length })}
					durationLabel={t("duration", {
						min: PATHS.advanced.length * MINUTES_PER_STEP,
					})}
					startHere={t("startHere")}
					icon={<Flame className="h-5 w-5" strokeWidth={2.25} />}
					accentClass="bg-brutal-orange text-white"
					steps={resolveSteps(PATHS.advanced)}
				/>
			</div>
		</section>
	);
}

interface PathCardProps {
	pathKey: PathKey;
	levelTitle: string;
	trackTitle: string;
	description: string;
	stepCountLabel: string;
	durationLabel: string;
	startHere: string;
	icon: React.ReactNode;
	accentClass: string;
	steps: { href: string; title: string }[];
}

function PathCard({
	pathKey,
	levelTitle,
	trackTitle,
	description,
	stepCountLabel,
	durationLabel,
	startHere,
	icon,
	accentClass,
	steps,
}: PathCardProps) {
	return (
		<div className="group relative rounded-sm border-3 border-foreground bg-card shadow-[5px_5px_0_var(--foreground)] overflow-hidden">
			{/* Top accent strip with level + stats */}
			<div
				className={`relative flex items-center justify-between border-b-3 border-foreground px-4 py-2.5 ${accentClass}`}
			>
				<div className="flex items-center gap-2">
					<div className="rounded-sm border-2 border-foreground bg-background p-1.5 text-foreground">
						{icon}
					</div>
					<span className="font-heading text-[11px] font-bold uppercase tracking-[0.22em]">
						{levelTitle}
					</span>
				</div>
				<div className="flex items-center gap-2 font-mono text-[10px] font-bold tabular-nums">
					<span className="rounded-sm border-2 border-foreground bg-background px-1.5 py-0.5 text-foreground">
						{stepCountLabel}
					</span>
					<span className="rounded-sm border-2 border-foreground bg-background px-1.5 py-0.5 text-foreground">
						{durationLabel}
					</span>
				</div>
			</div>

			{/* Body */}
			<div className="px-5 pt-4 pb-2">
				<h3 className="font-heading text-xl font-bold uppercase tracking-tight">
					{trackTitle}
				</h3>
				<p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
					{description}
				</p>
			</div>

			{/* Steps */}
			<ol className="relative mx-5 my-3 border-l-2 border-dashed border-foreground/25 pl-0">
				{steps.map((step, idx) => {
					const n = idx + 1;
					const isFirst = idx === 0;
					return (
						<li key={step.href} className="relative -ml-0.5">
							<Link
								href={step.href}
								className="group/step relative flex items-center gap-3 rounded-sm px-3 py-2.5 transition-colors duration-150 hover:bg-foreground/4"
							>
								<span
									className={`relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-sm border-2 border-foreground font-mono text-xs font-bold ${
										isFirst
											? `${accentClass} shadow-[2px_2px_0_var(--foreground)]`
											: "bg-background text-foreground"
									}`}
								>
									{n}
								</span>
								<span className="flex-1 font-heading text-sm font-bold uppercase tracking-wide">
									{step.title}
								</span>
								{isFirst && (
									<span className="hidden items-center gap-1 border-2 border-foreground bg-foreground px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-background sm:inline-flex">
										{startHere}
									</span>
								)}
								<ArrowRight
									className="h-3.5 w-3.5 text-foreground/40 transition-all duration-150 group-hover/step:translate-x-0.5 group-hover/step:text-foreground"
									strokeWidth={2.5}
								/>
							</Link>
						</li>
					);
				})}
			</ol>

			{/* Footer CTA */}
			<Link
				href={steps[0]?.href ?? "#"}
				data-path={pathKey}
				className={`flex items-center justify-between border-t-3 border-foreground px-5 py-3 font-heading text-sm font-bold uppercase tracking-wider transition-all duration-150 hover:translate-x-0.5 ${accentClass}`}
			>
				<span>{trackTitle}</span>
				<span className="flex items-center gap-1.5">
					Go
					<ArrowRight className="h-4 w-4" strokeWidth={3} />
				</span>
			</Link>
		</div>
	);
}
