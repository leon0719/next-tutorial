import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
	return (
		<div className="space-y-8">
			<div>
				<Skeleton className="h-8 w-48" />
				<Skeleton className="mt-2 h-5 w-96" />
			</div>
			<div className="grid gap-4 md:grid-cols-2">
				<Skeleton className="h-48" />
				<Skeleton className="h-48" />
			</div>
		</div>
	);
}
