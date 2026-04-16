"use client";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

dayjs.extend(relativeTime);

export function DateDemo() {
	const t = useTranslations("advanced.dates");
	const [now, setNow] = useState(dayjs());

	return (
		<Card>
			<CardHeader className="pb-2">
				<div className="flex items-center justify-between">
					<CardTitle className="text-base">{t("dateDemoTitle")}</CardTitle>
					<Button variant="outline" size="sm" onClick={() => setNow(dayjs())}>
						{t("refreshButton")}
					</Button>
				</div>
			</CardHeader>
			<CardContent>
				<div className="space-y-2 text-sm">
					<div className="flex justify-between">
						<span className="text-muted-foreground">{t("formatLabel")}</span>
						<code>{now.format("YYYY-MM-DD HH:mm:ss")}</code>
					</div>
					<div className="flex justify-between">
						<span className="text-muted-foreground">{t("relativeLabel")}</span>
						<code>{now.fromNow()}</code>
					</div>
					<div className="flex justify-between">
						<span className="text-muted-foreground">{t("isoLabel")}</span>
						<code>{now.toISOString()}</code>
					</div>
					<div className="flex justify-between">
						<span className="text-muted-foreground">{t("unixLabel")}</span>
						<code>{now.unix()}</code>
					</div>
					<div className="flex justify-between">
						<span className="text-muted-foreground">{t("dayOfWeekLabel")}</span>
						<code>{now.format("dddd")}</code>
					</div>
					<div className="flex justify-between">
						<span className="text-muted-foreground">
							{t("startOfMonthLabel")}
						</span>
						<code>{now.startOf("month").format("YYYY-MM-DD")}</code>
					</div>
					<div className="flex justify-between">
						<span className="text-muted-foreground">
							{t("addSevenDaysLabel")}
						</span>
						<code>{now.add(7, "day").format("YYYY-MM-DD")}</code>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
