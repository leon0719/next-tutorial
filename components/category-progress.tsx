"use client";

import { useEffect, useState } from "react";
import { useProgress } from "@/lib/stores/progress";

interface CategoryProgressProps {
	hrefs: string[];
	tone?: "light" | "dark";
}

export function CategoryProgress({
	hrefs,
	tone = "dark",
}: CategoryProgressProps) {
	const [mounted, setMounted] = useState(false);
	const countVisitedIn = useProgress((s) => s.countVisitedIn);

	useEffect(() => setMounted(true), []);

	const count = mounted ? countVisitedIn(hrefs) : 0;
	const total = hrefs.length;
	const percent = total === 0 ? 0 : Math.round((count / total) * 100);
	const done = count === total && total > 0;

	return (
		<div className="mt-3 flex items-center gap-2">
			<div
				className={
					tone === "dark"
						? "relative h-2 flex-1 border-2 border-foreground bg-background"
						: "relative h-2 flex-1 border-2 border-foreground bg-foreground/10"
				}
			>
				<div
					className="h-full bg-foreground transition-all duration-500"
					style={{ width: `${percent}%` }}
				/>
			</div>
			<span
				className={
					done
						? "font-mono text-[10px] font-bold tabular-nums text-foreground"
						: "font-mono text-[10px] font-bold tabular-nums text-foreground/70"
				}
			>
				{count}/{total}
			</span>
		</div>
	);
}
