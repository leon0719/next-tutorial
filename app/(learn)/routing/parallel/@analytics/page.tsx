import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AnalyticsSlot() {
	const data = [
		{ page: "/", views: 1240 },
		{ page: "/routing", views: 890 },
		{ page: "/data", views: 654 },
		{ page: "/rendering", views: 432 },
	];

	return (
		<Card>
			<CardHeader className="pb-2">
				<CardTitle className="text-base">Analytics</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="space-y-2">
					{data.map((item) => (
						<div key={item.page} className="flex justify-between text-sm">
							<code className="text-muted-foreground">{item.page}</code>
							<span className="font-medium">
								{item.views.toLocaleString()} views
							</span>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
