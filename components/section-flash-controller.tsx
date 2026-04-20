"use client";

import { useEffect } from "react";
import { flashSection } from "@/lib/section-flash";

export function SectionFlashController() {
	useEffect(() => {
		const flashFromHash = () => {
			const id = window.location.hash.slice(1);
			if (id) flashSection(id);
		};

		if (window.location.hash) {
			// wait for layout + scroll to settle
			window.setTimeout(flashFromHash, 120);
		}

		window.addEventListener("hashchange", flashFromHash);
		return () => window.removeEventListener("hashchange", flashFromHash);
	}, []);

	return null;
}
