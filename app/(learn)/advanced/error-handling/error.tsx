"use client";

import { Button } from "@/components/ui/button";

export default function ErrorBoundary({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
		<div className="flex flex-col items-center justify-center py-16 text-center">
			<div className="text-5xl font-bold text-destructive/30">Error</div>
			<h2 className="mt-4 text-lg font-semibold">Something went wrong</h2>
			<p className="mt-2 text-sm text-muted-foreground max-w-md">
				{error.message}
			</p>
			{error.digest && (
				<p className="mt-1 text-xs text-muted-foreground/60">
					Digest: {error.digest}
				</p>
			)}
			<Button
				variant="outline"
				size="sm"
				className="mt-6"
				onClick={() => reset()}
			>
				Try again
			</Button>
		</div>
	);
}
