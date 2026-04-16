import Link from "next/link";
import { getTranslations } from "next-intl/server";

export default async function NotFound() {
	const t = await getTranslations("notFound");

	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
			<div className="text-center space-y-4">
				<h1 className="font-heading text-9xl font-bold text-foreground">
					{t("title")}
				</h1>
				<p className="text-lg text-muted-foreground">{t("description")}</p>
				<Link
					href="/"
					className="inline-flex items-center gap-2 rounded-sm border-3 border-foreground bg-foreground text-background px-6 py-3 font-heading text-sm font-bold uppercase tracking-wider shadow-[4px_4px_0_var(--brutal-orange)] transition-all duration-150 hover:shadow-none hover:translate-x-1 hover:translate-y-1"
				>
					{t("backHome")}
				</Link>
			</div>
		</div>
	);
}
