"use client";

import { Dialog } from "@base-ui/react/dialog";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
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

const SHORTCUTS: { keys: string[]; label: string }[] = [
	{ keys: ["⌘", "K"], label: "Open search" },
	{ keys: ["["], label: "Previous page" },
	{ keys: ["]"], label: "Next page" },
	{ keys: ["G", "H"], label: "Go to home" },
	{ keys: ["F"], label: "Toggle focus mode" },
	{ keys: ["?"], label: "Show this help" },
	{ keys: ["ESC"], label: "Close dialog" },
];

export function KeyboardShortcuts() {
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
		<Dialog.Root open={helpOpen} onOpenChange={setHelpOpen}>
			<Dialog.Portal>
				<Dialog.Backdrop className="fixed inset-0 z-50 bg-black/30 transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0" />
				<Dialog.Popup className="-translate-x-1/2 -translate-y-1/2 fixed top-1/2 left-1/2 z-50 w-[min(26rem,92vw)] border-3 border-foreground bg-background shadow-[6px_6px_0_var(--foreground)] transition-all duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0">
					<div className="flex items-center justify-between border-b-3 border-foreground bg-brutal-yellow px-4 py-2.5">
						<Dialog.Title className="font-heading text-sm font-bold uppercase tracking-[0.22em]">
							Keyboard Shortcuts
						</Dialog.Title>
						<kbd className="rounded-sm border border-foreground/40 bg-background px-1.5 py-0.5 font-mono text-[10px] font-bold text-foreground">
							?
						</kbd>
					</div>
					<ul className="divide-y-2 divide-foreground/10">
						{SHORTCUTS.map((s) => (
							<li
								key={s.label}
								className="flex items-center justify-between px-4 py-2.5"
							>
								<span className="font-heading text-xs font-semibold uppercase tracking-wide text-foreground">
									{s.label}
								</span>
								<span className="flex items-center gap-1">
									{s.keys.map((k) => (
										<span
											key={`${s.label}-${k}`}
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
							Shortcuts are ignored while typing in inputs.
						</p>
					</div>
				</Dialog.Popup>
			</Dialog.Portal>
		</Dialog.Root>
	);
}
