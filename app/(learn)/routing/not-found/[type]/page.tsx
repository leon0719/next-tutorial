import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

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

	const t = await getTranslations("routing.notFound");

	return (
		<div className="space-y-4">
			<h1 className="text-2xl font-bold">{t("normalPageTitle")}</h1>
			<p className="text-muted-foreground">{t("normalPageDesc", { type })}</p>
		</div>
	);
}
