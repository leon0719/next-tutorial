import { getTranslations } from "next-intl/server";
import { CategoryOverview } from "@/components/category-overview";

export default async function UIPage() {
	const t = await getTranslations("overviews.ui");

	const demos = [
		{
			title: t("css"),
			description: t("cssDesc"),
			href: "/ui/css",
			status: "ready" as const,
		},
		{
			title: t("images"),
			description: t("imagesDesc"),
			href: "/ui/images",
			status: "ready" as const,
		},
		{
			title: t("fonts"),
			description: t("fontsDesc"),
			href: "/ui/fonts",
			status: "ready" as const,
		},
		{
			title: t("metadata"),
			description: t("metadataDesc"),
			href: "/ui/metadata",
			status: "ready" as const,
		},
		{
			title: t("animations"),
			description: t("animationsDesc"),
			href: "/ui/animations",
			status: "ready" as const,
		},
		{
			title: t("themes"),
			description: t("themesDesc"),
			href: "/ui/themes",
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
