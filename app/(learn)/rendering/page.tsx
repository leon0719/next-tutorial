import { getTranslations } from "next-intl/server";
import { CategoryOverview } from "@/components/category-overview";

export default async function RenderingPage() {
	const t = await getTranslations("overviews.rendering");

	const demos = [
		{
			title: t("serverComponents"),
			description: t("serverComponentsDesc"),
			href: "/rendering/server-components",
			status: "ready" as const,
		},
		{
			title: t("clientComponents"),
			description: t("clientComponentsDesc"),
			href: "/rendering/client-components",
			status: "ready" as const,
		},
		{
			title: t("composition"),
			description: t("compositionDesc"),
			href: "/rendering/composition",
			status: "ready" as const,
		},
		{
			title: t("state"),
			description: t("stateDesc"),
			href: "/rendering/state",
			status: "ready" as const,
		},
		{
			title: t("urlState"),
			description: t("urlStateDesc"),
			href: "/rendering/url-state",
			status: "ready" as const,
		},
		{
			title: t("lazyLoading"),
			description: t("lazyLoadingDesc"),
			href: "/rendering/lazy-loading",
			status: "ready" as const,
		},
	];

	return (
		<CategoryOverview
			title={t("title")}
			description={t("description")}
			demos={demos}
		/>
	);
}
