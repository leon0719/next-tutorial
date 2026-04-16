import { getTranslations } from "next-intl/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function ParallelMainPage() {
	const t = await getTranslations("routing.parallel");

	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-base">{t("mainContent")}</CardTitle>
			</CardHeader>
			<CardContent>
				<p className="text-sm text-muted-foreground">{t("mainContentDesc")}</p>
			</CardContent>
		</Card>
	);
}
