import Link from "next/link";

export default function NotFound() {
	return (
		<div className="flex flex-col items-center justify-center py-16 text-center">
			<div className="text-6xl font-bold text-muted-foreground/30">404</div>
			<h2 className="mt-4 text-xl font-semibold">Page Not Found</h2>
			<p className="mt-2 text-muted-foreground">
				This is a custom not-found.tsx — it renders when notFound() is called.
			</p>
			<Link
				href="/routing/not-found"
				className="mt-6 text-sm underline underline-offset-4 hover:text-foreground text-muted-foreground"
			>
				← Back to Error Pages demo
			</Link>
		</div>
	);
}
