import { CategoryOverview } from "@/components/category-overview";

const demos = [
	{
		title: "Basics",
		description:
			"Link, Navigation, useRouter — the fundamentals of moving between pages.",
		href: "/routing/basics",
		status: "ready" as const,
	},
	{
		title: "Dynamic Routes",
		description:
			"[slug] syntax — pages that respond to different URL parameters.",
		href: "/routing/dynamic/hello-world",
		status: "ready" as const,
	},
	{
		title: "Catch-all Segments",
		description: "[...slug] syntax — match any number of URL segments.",
		href: "/routing/catch-all/a/b/c",
		status: "ready" as const,
	},
	{
		title: "Route Groups",
		description: "(folder) syntax — organize routes without affecting the URL.",
		href: "/routing/groups",
		status: "ready" as const,
	},
	{
		title: "Parallel Routes",
		description:
			"@slot syntax — render multiple pages simultaneously in the same layout.",
		href: "/routing/parallel",
		status: "ready" as const,
	},
	{
		title: "Intercepting Routes",
		description: "(.) syntax — intercept routes to show modal overlays.",
		href: "/routing/intercepting",
		status: "ready" as const,
	},
	{
		title: "Error Pages",
		description: "Custom 404, 403, 401 — handle errors gracefully.",
		href: "/routing/not-found",
		status: "ready" as const,
	},
];

export default function RoutingPage() {
	return (
		<CategoryOverview
			title="Routing"
			description="Next.js uses a file-system based router built on top of React Server Components. Each folder in the app directory represents a route segment."
			demos={demos}
		/>
	);
}
