"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { DemoBox } from "@/components/demo-page";
import { Button } from "@/components/ui/button";

export function ErrorTrigger() {
	const t = useTranslations("advanced.errorHandling");
	const [shouldError, setShouldError] = useState(false);

	if (shouldError) {
		throw new Error(
			"This is a demo error! The error.tsx boundary caught this.",
		);
	}

	return (
		<DemoBox title={t("triggerTitle")}>
			<p className="text-sm text-muted-foreground mb-3">{t("triggerDesc")}</p>
			<Button
				variant="destructive"
				size="sm"
				onClick={() => setShouldError(true)}
			>
				{t("throwErrorButton")}
			</Button>
		</DemoBox>
	);
}
