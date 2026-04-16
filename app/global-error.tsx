"use client";

export default function GlobalError({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
		<html lang="zh-TW">
			<body className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 text-zinc-50 px-4">
				<div className="text-center space-y-4">
					<h1 className="text-6xl font-bold text-zinc-800">!</h1>
					<h2 className="text-xl font-semibold">Something went wrong</h2>
					<p className="text-sm text-zinc-400 max-w-md">
						An unexpected error occurred. Please try again.
					</p>
					{error.digest && (
						<p className="text-xs text-zinc-600">Error ID: {error.digest}</p>
					)}
					<div className="flex gap-3 justify-center pt-2">
						<button
							type="button"
							onClick={() => reset()}
							className="rounded-lg bg-zinc-800 px-4 py-2 text-sm hover:bg-zinc-700 transition-colors"
						>
							Try again
						</button>
						<a
							href="/"
							className="rounded-lg border border-zinc-800 px-4 py-2 text-sm hover:bg-zinc-900 transition-colors"
						>
							Back to Home
						</a>
					</div>
				</div>
			</body>
		</html>
	);
}
