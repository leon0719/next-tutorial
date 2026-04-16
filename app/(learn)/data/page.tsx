import { getTranslations } from "next-intl/server";
import { CategoryOverview } from "@/components/category-overview";

export default async function DataPage() {
	const t = await getTranslations("overviews.data");

	const demos = [
		{
			title: t("fetching"),
			description: t("fetchingDesc"),
			href: "/data/fetching",
			status: "ready" as const,
		},
		{
			title: t("clientFetch"),
			description: t("clientFetchDesc"),
			href: "/data/client-fetch",
			status: "ready" as const,
		},
		{
			title: t("caching"),
			description: t("cachingDesc"),
			href: "/data/caching",
			status: "ready" as const,
		},
		{
			title: t("revalidation"),
			description: t("revalidationDesc"),
			href: "/data/revalidation",
			status: "ready" as const,
		},
		{
			title: t("serverActions"),
			description: t("serverActionsDesc"),
			href: "/data/server-actions",
			status: "ready" as const,
		},
		{
			title: t("streaming"),
			description: t("streamingDesc"),
			href: "/data/streaming",
			status: "ready" as const,
		},
		{
			title: t("forms"),
			description: t("formsDesc"),
			href: "/data/forms",
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
