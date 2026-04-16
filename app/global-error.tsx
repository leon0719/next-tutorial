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
			<body
				className="flex min-h-screen flex-col items-center justify-center bg-[#121212] text-[#f0efe5] px-4"
				style={{ fontFamily: "'Space Mono', monospace" }}
			>
				<div className="text-center space-y-4">
					<h1 className="text-7xl font-bold text-[#ff6b6b]">!</h1>
					<h2 className="text-xl font-bold uppercase tracking-wide">
						Something went wrong
					</h2>
					<p className="text-sm text-[#a0998f] max-w-md">
						An unexpected error occurred. Please try again.
					</p>
					{error.digest && (
						<p className="text-xs text-[#a0998f]">Error ID: {error.digest}</p>
					)}
					<div className="flex gap-3 justify-center pt-2">
						<button
							type="button"
							onClick={() => reset()}
							className="rounded-sm border-[3px] border-[#f0efe5] bg-[#f0efe5] text-[#121212] px-5 py-2.5 text-sm font-bold uppercase tracking-wider shadow-[3px_3px_0_#ff6b35] transition-all duration-150 hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]"
						>
							Try again
						</button>
						<a
							href="/"
							className="rounded-sm border-[3px] border-[#f0efe5] bg-transparent px-5 py-2.5 text-sm font-bold uppercase tracking-wider transition-all duration-150 hover:bg-[#f0efe5] hover:text-[#121212]"
						>
							Back to Home
						</a>
					</div>
				</div>
			</body>
		</html>
	);
}
