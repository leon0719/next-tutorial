import { getTranslations } from "next-intl/server";
import { CategoryOverview } from "@/components/category-overview";
import { buildDemoMetadata } from "@/lib/metadata";

export const generateMetadata = () => buildDemoMetadata("overviews.advanced");

export default async function AdvancedPage() {
	const t = await getTranslations("overviews.advanced");

	const demos = [
		{
			title: t("proxy"),
			description: t("proxyDesc"),
			href: "/advanced/proxy",
			status: "ready" as const,
		},
		{
			title: t("i18n"),
			description: t("i18nDesc"),
			href: "/advanced/i18n",
			status: "ready" as const,
		},
		{
			title: t("auth"),
			description: t("authDesc"),
			href: "/advanced/auth",
			status: "ready" as const,
		},
		{
			title: t("draftMode"),
			description: t("draftModeDesc"),
			href: "/advanced/draft-mode",
			status: "ready" as const,
		},
		{
			title: t("edgeRuntime"),
			description: t("edgeRuntimeDesc"),
			href: "/advanced/edge-runtime",
			status: "ready" as const,
		},
		{
			title: t("errorHandling"),
			description: t("errorHandlingDesc"),
			href: "/advanced/error-handling",
			status: "ready" as const,
		},
		{
			title: t("mdx"),
			description: t("mdxDesc"),
			href: "/advanced/mdx",
			status: "ready" as const,
		},
		{
			title: t("instrumentation"),
			description: t("instrumentationDesc"),
			href: "/advanced/instrumentation",
			status: "ready" as const,
		},
		{
			title: t("pwa"),
			description: t("pwaDesc"),
			href: "/advanced/pwa",
			status: "ready" as const,
		},
		{
			title: t("dates"),
			description: t("datesDesc"),
			href: "/advanced/dates",
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
