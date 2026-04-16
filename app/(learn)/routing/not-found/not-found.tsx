import Link from "next/link";
import { getTranslations } from "next-intl/server";

export default async function NotFound() {
	const t = await getTranslations("routing.notFound");

	return (
		<div className="flex flex-col items-center justify-center py-16 text-center">
			<div className="text-6xl font-bold text-muted-foreground/30">404</div>
			<h2 className="mt-4 text-xl font-semibold">{t("pageNotFound")}</h2>
			<p className="mt-2 text-muted-foreground">{t("pageNotFoundDesc")}</p>
			<Link
				href="/routing/not-found"
				className="mt-6 text-sm underline underline-offset-4 hover:text-foreground text-muted-foreground"
			>
				{t("backToDemo")}
			</Link>
		</div>
	);
}
