import { CategoryOverview } from "@/components/category-overview";

const demos = [
	{
		title: "Server Fetch",
		description:
			"Fetch data directly in async Server Components — no useEffect needed.",
		href: "/data/fetching",
		status: "ready" as const,
	},
	{
		title: "Client Fetch (TanStack Query)",
		description:
			"Client-side data fetching with caching, refetching, and loading states.",
		href: "/data/client-fetch",
		status: "ready" as const,
	},
	{
		title: "Caching",
		description: "use cache directive — cache component and function results.",
		href: "/data/caching",
		status: "ready" as const,
	},
	{
		title: "Revalidation",
		description:
			"revalidatePath and revalidateTag — update cached data on demand.",
		href: "/data/revalidation",
		status: "ready" as const,
	},
	{
		title: "Server Actions",
		description:
			"Form mutations with Server Actions — CRUD operations with Drizzle ORM.",
		href: "/data/server-actions",
		status: "ready" as const,
	},
	{
		title: "Streaming",
		description:
			"Suspense boundaries and loading UI — progressive page rendering.",
		href: "/data/streaming",
		status: "ready" as const,
	},
];

export default function DataPage() {
	return (
		<CategoryOverview
			title="Data"
			description="Next.js provides multiple patterns for fetching, caching, and mutating data — from server-side async components to client-side queries."
			demos={demos}
		/>
	);
}
