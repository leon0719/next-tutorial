"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefs } from "@/lib/stores/prefs";
import { cn } from "@/lib/utils";

const INTERACTIVE_SELECTOR =
	"a, button, [role='button'], input, textarea, select, [data-cursor='interactive']";

export function CustomCursor() {
	const enabled = usePrefs((s) => s.customCursor);
	const [mounted, setMounted] = useState(false);
	const [active, setActive] = useState(false);
	const [hovering, setHovering] = useState(false);
	const ringRef = useRef<HTMLDivElement>(null);
	const dotRef = useRef<HTMLDivElement>(null);

	useEffect(() => setMounted(true), []);

	useEffect(() => {
		if (!mounted || !enabled) return;
		if (window.matchMedia?.("(pointer: coarse)").matches) return;

		document.body.classList.add("custom-cursor-active");
		setActive(true);

		let targetX = window.innerWidth / 2;
		let targetY = window.innerHeight / 2;
		let currentX = targetX;
		let currentY = targetY;
		let rafId = 0;

		const onMove = (e: PointerEvent) => {
			targetX = e.clientX;
			targetY = e.clientY;
			const target = e.target as Element | null;
			setHovering(Boolean(target?.closest?.(INTERACTIVE_SELECTOR)));
		};

		const onLeave = () => {
			if (ringRef.current) ringRef.current.style.opacity = "0";
			if (dotRef.current) dotRef.current.style.opacity = "0";
		};

		const onEnter = () => {
			if (ringRef.current) ringRef.current.style.opacity = "1";
			if (dotRef.current) dotRef.current.style.opacity = "1";
		};

		const tick = () => {
			currentX += (targetX - currentX) * 0.3;
			currentY += (targetY - currentY) * 0.3;
			if (ringRef.current) {
				ringRef.current.style.transform = `translate(${currentX - 14}px, ${currentY - 14}px)`;
			}
			if (dotRef.current) {
				dotRef.current.style.transform = `translate(${targetX - 2}px, ${targetY - 2}px)`;
			}
			rafId = requestAnimationFrame(tick);
		};

		window.addEventListener("pointermove", onMove);
		window.addEventListener("pointerleave", onLeave);
		window.addEventListener("pointerenter", onEnter);
		rafId = requestAnimationFrame(tick);

		return () => {
			document.body.classList.remove("custom-cursor-active");
			setActive(false);
			window.removeEventListener("pointermove", onMove);
			window.removeEventListener("pointerleave", onLeave);
			window.removeEventListener("pointerenter", onEnter);
			cancelAnimationFrame(rafId);
		};
	}, [enabled, mounted]);

	if (!active) return null;

	return (
		<>
			<div
				ref={ringRef}
				aria-hidden
				className="pointer-events-none fixed top-0 left-0 z-999 h-7 w-7 opacity-0 transition-opacity duration-150 will-change-transform"
			>
				<div
					className={cn(
						"h-full w-full border-[3px] border-foreground transition-[transform,background-color] duration-200",
						hovering
							? "scale-150 bg-brutal-orange/70"
							: "scale-100 bg-transparent",
					)}
				/>
			</div>
			<div
				ref={dotRef}
				aria-hidden
				className="pointer-events-none fixed top-0 left-0 z-1000 h-1 w-1 bg-foreground opacity-0 transition-opacity duration-150 will-change-transform"
			/>
		</>
	);
}
