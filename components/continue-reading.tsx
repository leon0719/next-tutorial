"use client";

import { BookmarkCheck, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { allPages, navGroups } from "@/lib/pages";
import { useProgress } from "@/lib/stores/progress";

export function ContinueReading() {
	const [mounted, setMounted] = useState(false);
	const visited = useProgress((s) => s.visited);

	useEffect(() => setMounted(true), []);

	const last = useMemo(() => {
		const entries = Object.entries(visited);
		if (entries.length === 0) return null;
		let bestHref = entries[0][0];
		let bestAt = entries[0][1].at;
		for (const [href, { at }] of entries) {
			if (at > bestAt) {
				bestAt = at;
				bestHref = href;
			}
		}
		return { href: bestHref, at: bestAt };
	}, [visited]);

	const visitedCount = Object.keys(visited).length;

	if (!mounted || !last) return null;

	const page = allPages.find((p) => p.href === last.href);
	if (!page) return null;

	const group = navGroups.find((g) =>
		g.items.some((item) => item.href === last.href),
	);

	const percent = Math.round((visitedCount / allPages.length) * 100);
	const display = page.label ?? page.title;

	return (
		<div className="relative mx-auto mt-8 max-w-2xl">
			<div className="relative border-3 border-foreground bg-background shadow-[5px_5px_0_var(--foreground)]">
				<div className="flex items-center justify-between border-b-3 border-foreground bg-brutal-yellow px-4 py-2">
					<div className="flex items-center gap-2">
						<BookmarkCheck className="h-4 w-4" strokeWidth={2.5} />
						<span className="font-heading text-[11px] font-bold uppercase tracking-[0.22em]">
							Continue Reading
						</span>
					</div>
					<span className="font-mono text-[11px] font-bold text-foreground/80">
						{visitedCount}/{allPages.length} · {percent}%
					</span>
				</div>
				<Link
					href={page.href}
					className="group flex items-center gap-4 px-4 py-3 transition-colors duration-150 hover:bg-brutal-yellow/30"
				>
					<div className="flex-1 min-w-0">
						{group && (
							<div className="font-heading text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
								{group.labelKey}
							</div>
						)}
						<div className="mt-0.5 truncate font-heading text-base font-bold uppercase tracking-wide text-foreground">
							{display}
						</div>
					</div>
					<span className="inline-flex h-9 w-9 shrink-0 items-center justify-center border-2 border-foreground bg-brutal-orange text-background transition-transform duration-150 group-hover:translate-x-1">
						<ChevronRight className="h-5 w-5" strokeWidth={3} />
					</span>
				</Link>
				<div className="h-2 w-full border-t-2 border-foreground bg-muted">
					<div
						className="h-full bg-brutal-orange transition-all duration-500"
						style={{ width: `${percent}%` }}
					/>
				</div>
			</div>
		</div>
	);
}
