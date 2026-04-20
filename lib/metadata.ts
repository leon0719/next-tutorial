import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

/**
 * Build per-page metadata from a translation namespace that already exposes
 * `title` and `description` keys (the same pair consumed by <DemoPage>).
 *
 * Usage in a server page:
 *   export const generateMetadata = () => buildDemoMetadata("overviews.routing");
 */
export async function buildDemoMetadata(namespace: string): Promise<Metadata> {
	const t = await getTranslations(namespace);
	const title = t("title");
	const description = t("description");

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			type: "article",
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
		},
	};
}
