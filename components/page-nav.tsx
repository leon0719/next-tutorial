"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { allPages } from "@/lib/pages";

export function PageNav() {
	const pathname = usePathname();
	const currentIndex = allPages.findIndex((p) => p.href === pathname);

	if (currentIndex === -1) return null;

	const prev = currentIndex > 0 ? allPages[currentIndex - 1] : null;
	const next =
		currentIndex < allPages.length - 1 ? allPages[currentIndex + 1] : null;

	return (
		<nav className="flex items-center justify-between border-t-3 border-foreground pt-6 mt-10">
			{prev ? (
				<Link
					href={prev.href}
					className="group flex items-center gap-3 rounded-sm border-3 border-foreground bg-background px-4 py-3 shadow-[3px_3px_0_var(--foreground)] transition-all duration-150 hover:shadow-none hover:translate-x-0.75 hover:translate-y-0.75"
				>
					<ChevronLeft className="h-4 w-4" />
					<div>
						<div className="font-heading text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
							Previous
						</div>
						<div className="font-heading text-sm font-bold">
							{prev.label ?? prev.title}
						</div>
					</div>
				</Link>
			) : (
				<div />
			)}
			{next ? (
				<Link
					href={next.href}
					className="group flex items-center gap-3 rounded-sm border-3 border-foreground bg-background px-4 py-3 shadow-[3px_3px_0_var(--foreground)] transition-all duration-150 hover:shadow-none hover:translate-x-0.75 hover:translate-y-0.75 text-right"
				>
					<div>
						<div className="font-heading text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
							Next
						</div>
						<div className="font-heading text-sm font-bold">
							{next.label ?? next.title}
						</div>
					</div>
					<ChevronRight className="h-4 w-4" />
				</Link>
			) : (
				<div />
			)}
		</nav>
	);
}
