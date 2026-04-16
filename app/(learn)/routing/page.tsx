import { getTranslations } from "next-intl/server";
import { CategoryOverview } from "@/components/category-overview";

export default async function RoutingPage() {
	const t = await getTranslations("overviews.routing");

	const demos = [
		{
			title: t("basics"),
			description: t("basicsDesc"),
			href: "/routing/basics",
			status: "ready" as const,
		},
		{
			title: t("dynamic"),
			description: t("dynamicDesc"),
			href: "/routing/dynamic/hello-world",
			status: "ready" as const,
		},
		{
			title: t("catchAll"),
			description: t("catchAllDesc"),
			href: "/routing/catch-all/a/b/c",
			status: "ready" as const,
		},
		{
			title: t("groups"),
			description: t("groupsDesc"),
			href: "/routing/groups",
			status: "ready" as const,
		},
		{
			title: t("parallel"),
			description: t("parallelDesc"),
			href: "/routing/parallel",
			status: "ready" as const,
		},
		{
			title: t("intercepting"),
			description: t("interceptingDesc"),
			href: "/routing/intercepting",
			status: "ready" as const,
		},
		{
			title: t("notFound"),
			description: t("notFoundDesc"),
			href: "/routing/not-found",
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
