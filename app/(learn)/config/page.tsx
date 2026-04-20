import { getTranslations } from "next-intl/server";
import { CategoryOverview } from "@/components/category-overview";
import { buildDemoMetadata } from "@/lib/metadata";

export const generateMetadata = () => buildDemoMetadata("overviews.config");

export default async function ConfigPage() {
	const t = await getTranslations("overviews.config");

	const demos = [
		{
			title: t("env"),
			description: t("envDesc"),
			href: "/config/env",
			status: "ready" as const,
		},
		{
			title: t("redirects"),
			description: t("redirectsDesc"),
			href: "/config/redirects",
			status: "ready" as const,
		},
		{
			title: t("headers"),
			description: t("headersDesc"),
			href: "/config/headers",
			status: "ready" as const,
		},
		{
			title: t("bundle"),
			description: t("bundleDesc"),
			href: "/config/bundle",
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
