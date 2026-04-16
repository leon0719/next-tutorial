import { getTranslations } from "next-intl/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function DashboardSlot() {
	const t = await getTranslations("routing.parallel");

	const stats = [
		{ label: t("totalUsers"), value: "2,847" },
		{ label: t("activeNow"), value: "142" },
		{ label: t("revenue"), value: "$12,450" },
	];

	return (
		<Card>
			<CardHeader className="pb-2">
				<CardTitle className="text-base">{t("dashboard")}</CardTitle>
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
