"use client";

import { useEffect, useState } from "react";

export function ScrollProgress() {
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		let rafId = 0;
		let pending = false;

		function compute() {
			pending = false;
			const scrollTop =
				document.documentElement.scrollTop || document.body.scrollTop;
			const scrollHeight =
				document.documentElement.scrollHeight -
				document.documentElement.clientHeight;
			const next = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
			setProgress((prev) => (Math.abs(prev - next) < 0.1 ? prev : next));
		}

		function onScroll() {
			if (pending) return;
			pending = true;
			rafId = requestAnimationFrame(compute);
		}

		compute();
		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("resize", onScroll, { passive: true });
		return () => {
			if (rafId) cancelAnimationFrame(rafId);
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("resize", onScroll);
		};
	}, []);

	return (
		<div className="fixed top-0 left-0 right-0 z-50 h-1 bg-transparent">
			<div
				className="h-full bg-brutal-orange transition-all duration-150 ease-out"
				style={{ width: `${progress}%` }}
			/>
		</div>
	);
}
