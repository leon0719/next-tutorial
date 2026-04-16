import Link from "next/link";
import { getTranslations } from "next-intl/server";

export default async function NotFound() {
	const t = await getTranslations("notFound");

	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
			<div className="text-center space-y-4">
				<h1 className="text-8xl font-bold text-muted-foreground/20">
					{t("title")}
				</h1>
				<p className="text-lg text-muted-foreground">{t("description")}</p>
				<Link
					href="/"
					className="inline-flex items-center gap-2 rounded-lg bg-foreground text-background px-5 py-2.5 text-sm font-medium transition-opacity hover:opacity-90"
				>
					{t("backHome")}
				</Link>
			</div>
		</div>
	);
}
