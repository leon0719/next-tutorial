import { notFound } from "next/navigation";

export default async function TriggerPage({
	params,
}: {
	params: Promise<{ type: string }>;
}) {
	const { type } = await params;

	if (type === "trigger-404") {
		notFound();
	}

	if (type === "trigger-error") {
		throw new Error(
			"This is a demo error! The error.tsx boundary caught this.",
		);
	}

	return (
		<div className="space-y-4">
			<h1 className="text-2xl font-bold">Normal Page</h1>
			<p className="text-muted-foreground">
				This page loaded successfully because the type &quot;{type}&quot;
				didn&apos;t trigger any errors.
			</p>
		</div>
	);
}
