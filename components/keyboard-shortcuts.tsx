"use client";

import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { allPages } from "@/lib/pages";
import { useUI } from "@/lib/stores/ui";

function isEditableTarget(target: EventTarget | null): boolean {
	if (!(target instanceof HTMLElement)) return false;
	const tag = target.tagName;
	return (
		tag === "INPUT" ||
		tag === "TEXTAREA" ||
		tag === "SELECT" ||
		target.isContentEditable
	);
}

const SHORTCUTS: { keys: string[]; labelKey: string }[] = [
	{ keys: ["⌘", "K"], labelKey: "items.openSearch" },
	{ keys: ["["], labelKey: "items.prevPage" },
	{ keys: ["]"], labelKey: "items.nextPage" },
	{ keys: ["G", "H"], labelKey: "items.goHome" },
	{ keys: ["F"], labelKey: "items.toggleFocus" },
	{ keys: ["?"], labelKey: "items.showHelp" },
	{ keys: ["ESC"], labelKey: "items.closeDialog" },
];

export function KeyboardShortcuts() {
	const t = useTranslations("nav.shortcuts");
	const router = useRouter();
	const pathname = usePathname();
	const toggleFocusMode = useUI((s) => s.toggleFocusMode);
	const [helpOpen, setHelpOpen] = useState(false);
	const gPending = useRef(false);
	const gTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

	useEffect(() => {
		const clearGPending = () => {
			gPending.current = false;
			if (gTimer.current) {
				clearTimeout(gTimer.current);
				gTimer.current = null;
			}
		};

		const onKey = (e: KeyboardEvent) => {
			if (isEditableTarget(e.target)) return;
			if (e.metaKey || e.ctrlKey || e.altKey) return;

			const key = e.key;

			if (gPending.current && key.toLowerCase() === "h") {
				e.preventDefault();
				clearGPending();
				router.push("/");
				return;
			}

			if (key === "[") {
				const idx = allPages.findIndex((p) => p.href === pathname);
				if (idx > 0) {
					e.preventDefault();
					router.push(allPages[idx - 1].href);
				}
				return;
			}
			if (key === "]") {
				const idx = allPages.findIndex((p) => p.href === pathname);
				if (idx >= 0 && idx < allPages.length - 1) {
					e.preventDefault();
					router.push(allPages[idx + 1].href);
				}
				return;
			}
			if (key === "?") {
				e.preventDefault();
				setHelpOpen((prev) => !prev);
				return;
			}
			if (key.toLowerCase() === "f") {
				e.preventDefault();
				toggleFocusMode();
				return;
			}
			if (key.toLowerCase() === "g") {
				e.preventDefault();
				gPending.current = true;
				if (gTimer.current) clearTimeout(gTimer.current);
				gTimer.current = setTimeout(clearGPending, 1000);
				return;
			}
			clearGPending();
		};

		window.addEventListener("keydown", onKey);
		return () => {
			window.removeEventListener("keydown", onKey);
			if (gTimer.current) clearTimeout(gTimer.current);
		};
	}, [pathname, router, toggleFocusMode]);

	return (
		<Dialog open={helpOpen} onOpenChange={setHelpOpen}>
			<DialogContent
				className="w-[min(26rem,92vw)] max-w-none gap-0 rounded-none border-3 border-foreground bg-background p-0 shadow-[6px_6px_0_var(--foreground)] ring-0"
				showCloseButton={false}
			>
				<DialogHeader className="flex flex-row items-center justify-between gap-2 border-b-3 border-foreground bg-brutal-yellow px-4 py-2.5 text-brutal-ink">
					<DialogTitle className="font-heading text-sm font-bold uppercase tracking-[0.22em]">
						{t("title")}
					</DialogTitle>
					<DialogDescription className="sr-only">
						{t("description")}
					</DialogDescription>
					<kbd className="rounded-sm border border-foreground/40 bg-background px-1.5 py-0.5 font-mono text-[10px] font-bold text-foreground">
						?
					</kbd>
				</DialogHeader>
				<ul className="divide-y-2 divide-foreground/10">
					{SHORTCUTS.map((s) => (
						<li
							key={s.labelKey}
							className="flex items-center justify-between px-4 py-2.5"
						>
							<span className="font-heading text-xs font-semibold uppercase tracking-wide text-foreground">
								{t(s.labelKey)}
							</span>
							<span className="flex items-center gap-1">
								{s.keys.map((k) => (
									<span
										key={`${s.labelKey}-${k}`}
										className="inline-flex min-w-7 items-center justify-center rounded-sm border-2 border-foreground bg-background px-1.5 py-0.5 font-mono text-[11px] font-bold text-foreground shadow-[2px_2px_0_var(--foreground)]"
									>
										{k}
									</span>
								))}
							</span>
						</li>
					))}
				</ul>
				<div className="border-t-3 border-foreground bg-brutal-yellow/40 px-4 py-2">
					<p className="font-mono text-[10px] text-foreground/70">
						{t("hint")}
					</p>
				</div>
			</DialogContent>
		</Dialog>
	);
}
