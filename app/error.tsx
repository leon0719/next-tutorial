"use client";

import { AlertTriangle } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

export default function GlobalError({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	const t = useTranslations("error");

	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
			<AlertTriangle className="h-16 w-16 text-destructive/60" />
			<h1 className="mt-6 text-3xl font-bold tracking-tight">{t("title")}</h1>
			<p className="mt-3 text-sm text-muted-foreground max-w-md">
				{error.message || t("description")}
			</p>
			{error.digest && (
				<p className="mt-2 text-xs text-muted-foreground/50">
					{t("errorId", { digest: error.digest })}
				</p>
			)}
			<div className="mt-8 flex gap-3">
				<Button variant="outline" onClick={() => reset()}>
					{t("retry")}
				</Button>
				<Button
					onClick={() => {
						window.location.href = "/";
					}}
				>
					{t("backHome")}
				</Button>
			</div>
		</div>
	);
}
