"use client";

import { useEffect, useState } from "react";
import { flashSection } from "@/lib/section-flash";
import { cn } from "@/lib/utils";

type TocItem = { id: string; title: string };

export function OnThisPage() {
	const [items, setItems] = useState<TocItem[]>([]);
	const [activeId, setActiveId] = useState<string>("");

	useEffect(() => {
		const nodes = Array.from(
			document.querySelectorAll<HTMLElement>("[data-toc-section]"),
		).filter((el) => el.id);

		const next = nodes.map((el) => ({
			id: el.id,
			title: el.dataset.tocTitle || el.id,
		}));
		setItems(next);

		if (nodes.length === 0) return;
		setActiveId(nodes[0].id);

		const observer = new IntersectionObserver(
			(entries) => {
				const visible = entries
					.filter((e) => e.isIntersecting)
					.map((e) => e.target as HTMLElement)
					.sort(
						(a, b) =>
							a.getBoundingClientRect().top - b.getBoundingClientRect().top,
					);
				if (visible[0]) setActiveId(visible[0].id);
			},
			{ rootMargin: "-80px 0px -65% 0px", threshold: 0 },
		);

		for (const n of nodes) observer.observe(n);
		return () => observer.disconnect();
	}, []);

	if (items.length === 0) return null;

	const handleJump = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
		e.preventDefault();
		const el = document.getElementById(id);
		if (!el) return;
		el.scrollIntoView({ behavior: "smooth", block: "start" });
		history.replaceState(null, "", `#${id}`);
		flashSection(id);
	};

	return (
		<aside data-focus-hide className="hidden lg:block">
			<div className="sticky top-20">
				<div className="relative border-3 border-foreground bg-background shadow-[4px_4px_0_var(--foreground)]">
					<span
						className="absolute -top-3.5 left-4 inline-flex items-center gap-1.5 border-2 border-foreground bg-brutal-orange px-2.5 py-1 shadow-[2px_2px_0_var(--foreground)]"
						aria-hidden
					>
						<span className="h-1.5 w-1.5 bg-foreground" />
						<span className="font-heading text-[11px] font-bold uppercase tracking-[0.2em] text-foreground">
							On This Page
						</span>
					</span>
					<nav className="pt-8 pb-3 pr-3 pl-2">
						<ol className="space-y-0.5">
							{items.map((item, i) => {
								const active = activeId === item.id;
								return (
									<li key={item.id}>
										<a
											href={`#${item.id}`}
											onClick={(e) => handleJump(e, item.id)}
											className={cn(
												"group relative flex items-start gap-3 border-l-[3px] py-2 pr-2 pl-3 transition-all duration-150",
												active
													? "border-brutal-orange bg-brutal-yellow/30"
													: "border-transparent hover:border-foreground hover:bg-muted",
											)}
										>
											<span
												className={cn(
													"pt-0.5 font-mono text-[13px] font-bold tabular-nums",
													active
														? "text-brutal-orange"
														: "text-muted-foreground group-hover:text-foreground",
												)}
											>
												{String(i + 1).padStart(2, "0")}
											</span>
											<span
												className={cn(
													"font-heading text-sm uppercase leading-snug tracking-wide",
													active
														? "font-bold text-foreground"
														: "font-semibold text-muted-foreground group-hover:text-foreground",
												)}
											>
												{item.title}
											</span>
										</a>
									</li>
								);
							})}
						</ol>
					</nav>
					<div className="flex items-center justify-between border-t-3 border-foreground bg-brutal-yellow/50 px-3 py-2">
						<span className="font-heading text-xs font-bold uppercase tracking-[0.18em] text-foreground/70">
							{items.length.toString().padStart(2, "0")} Sections
						</span>
						<button
							type="button"
							onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
							className="font-heading text-xs font-bold uppercase tracking-[0.18em] text-foreground underline-offset-2 hover:underline"
						>
							↑ Top
						</button>
					</div>
				</div>
			</div>
		</aside>
	);
}
