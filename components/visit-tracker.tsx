"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { allPages } from "@/lib/pages";
import { useProgress } from "@/lib/stores/progress";

export function VisitTracker() {
	const pathname = usePathname();
	const markVisited = useProgress((s) => s.markVisited);

	useEffect(() => {
		if (!pathname) return;
		if (allPages.some((p) => p.href === pathname)) {
			markVisited(pathname);
		}
	}, [pathname, markVisited]);

	return null;
}
