"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { DemoBox } from "@/components/demo-page";
import { Button } from "@/components/ui/button";

export function TriggerDemo() {
	const router = useRouter();
	const t = useTranslations("routing.notFound");

	return (
		<DemoBox title="Trigger Error Types">
			<div className="space-y-4">
				<div className="flex flex-wrap gap-3">
					<Button
						variant="outline"
						size="sm"
						onClick={() => router.push("/routing/not-found/trigger-404")}
					>
						{t("trigger404")}
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() => router.push("/routing/not-found/trigger-error")}
					>
						{t("triggerError")}
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() => router.push("/routing/not-found/normal")}
					>
						{t("normalPage")}
					</Button>
				</div>
				<p className="text-xs text-muted-foreground">{t("triggerDesc")}</p>
			</div>
		</DemoBox>
	);
}
