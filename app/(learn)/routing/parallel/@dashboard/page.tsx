import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardSlot() {
	const stats = [
		{ label: "Total Users", value: "2,847" },
		{ label: "Active Now", value: "142" },
		{ label: "Revenue", value: "$12,450" },
	];

	return (
		<Card>
			<CardHeader className="pb-2">
				<CardTitle className="text-base">Dashboard</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="grid grid-cols-3 gap-2">
					{stats.map((stat) => (
						<div key={stat.label} className="text-center">
							<p className="text-lg font-bold">{stat.value}</p>
							<p className="text-xs text-muted-foreground">{stat.label}</p>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
