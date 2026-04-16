import { FileQuestion } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

export default async function NotFound() {
	const t = await getTranslations("notFound");

	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
			<FileQuestion className="h-16 w-16 text-muted-foreground/40" />
			<h1 className="mt-6 text-5xl font-bold tracking-tight">{t("title")}</h1>
			<p className="mt-3 text-lg text-muted-foreground">{t("description")}</p>
			<Link
				href="/"
				className="mt-8 inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
			>
				{t("backHome")}
			</Link>
		</div>
	);
}
