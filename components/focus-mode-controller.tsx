"use client";

import { Eye } from "lucide-react";
import { useEffect, useRef } from "react";
import { useSidebar } from "@/components/ui/sidebar";
import { useUI } from "@/lib/stores/ui";

export function FocusModeController() {
	const focusMode = useUI((s) => s.focusMode);
	const setFocusMode = useUI((s) => s.setFocusMode);
	const { open, setOpen } = useSidebar();
	const openRef = useRef(open);
	const restoreToRef = useRef<boolean | null>(null);

	useEffect(() => {
		openRef.current = open;
	}, [open]);

	useEffect(() => {
		document.body.classList.toggle("focus-mode", focusMode);
		if (focusMode) {
			if (restoreToRef.current === null) {
				restoreToRef.current = openRef.current;
			}
			setOpen(false);
		} else if (restoreToRef.current !== null) {
			setOpen(restoreToRef.current);
			restoreToRef.current = null;
		}
	}, [focusMode, setOpen]);

	if (!focusMode) return null;

	return (
		<button
			type="button"
			onClick={() => setFocusMode(false)}
			className="fixed bottom-5 left-5 z-55 inline-flex items-center gap-2 border-3 border-foreground bg-brutal-orange px-3 py-2 shadow-[4px_4px_0_var(--foreground)] transition-all duration-150 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_var(--foreground)]"
			aria-label="Exit focus mode"
		>
			<Eye className="h-3.5 w-3.5" strokeWidth={2.5} />
			<span className="font-heading text-[11px] font-bold uppercase tracking-[0.18em]">
				Focus
			</span>
			<kbd className="rounded-sm border border-foreground/50 bg-background/80 px-1 font-mono text-[10px] text-foreground">
				F
			</kbd>
		</button>
	);
}
