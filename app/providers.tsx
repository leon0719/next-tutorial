"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { useState } from "react";

// Suppress next-themes@0.4.6's React 19 "Encountered a script tag" false
// positive. The library injects its no-FOUC script via createElement, which
// runs correctly on SSR but trips React 19's new client-render check.
// Library is unmaintained (last release 2025-03) — remove when replaced.
type PatchedError = typeof console.error & { __nextThemesPatched?: boolean };
if (
	typeof window !== "undefined" &&
	!(console.error as PatchedError).__nextThemesPatched
) {
	const original = console.error;
	const patched: PatchedError = (...args) => {
		if (
			typeof args[0] === "string" &&
			args[0].includes("Encountered a script tag")
		) {
			return;
		}
		original(...args);
	};
	patched.__nextThemesPatched = true;
	console.error = patched;
}

export function Providers({ children }: { children: React.ReactNode }) {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						staleTime: 60 * 1000,
						refetchOnWindowFocus: false,
					},
				},
			}),
	);

	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider
				attribute="class"
				defaultTheme="system"
				enableSystem
				disableTransitionOnChange
			>
				<NuqsAdapter>{children}</NuqsAdapter>
			</ThemeProvider>
		</QueryClientProvider>
	);
}
