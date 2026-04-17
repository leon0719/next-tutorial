import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

interface DemoItem {
	title: string;
	description: string;
	href: string;
	status: "ready" | "coming-soon";
}

interface CategoryOverviewProps {
	title: string;
	description: string;
	demos: DemoItem[];
}

export function CategoryOverview({
	title,
	description,
	demos,
}: CategoryOverviewProps) {
	return (
		<div>
			<h1 className="text-3xl font-bold">{title}</h1>
			<p className="mt-2 text-muted-foreground">{description}</p>

			<div className="mt-8 grid gap-4 sm:grid-cols-2">
				{demos.map((demo) => (
					<Link key={demo.href} href={demo.href}>
						<Card className="h-full transition-colors hover:border-foreground/20">
							<CardHeader>
								<div className="flex items-center justify-between">
									<CardTitle className="text-lg">{demo.title}</CardTitle>
									<Badge
										variant={demo.status === "ready" ? "default" : "secondary"}
									>
										{demo.status === "ready" ? "Ready" : "Coming Soon"}
									</Badge>
								</div>
								<CardDescription>{demo.description}</CardDescription>
							</CardHeader>
						</Card>
					</Link>
				))}
			</div>
		</div>
	);
}
