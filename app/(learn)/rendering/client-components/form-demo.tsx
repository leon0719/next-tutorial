"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function FormDemo() {
	const t = useTranslations("rendering.clientComponents");
	const [name, setName] = useState("");
	const [submitted, setSubmitted] = useState<string | null>(null);

	return (
		<Card>
			<CardHeader className="pb-2">
				<div className="flex items-center justify-between">
					<CardTitle className="text-base">{t("formTitle")}</CardTitle>
					<Badge variant="outline" className="text-xs">
						use client
					</Badge>
				</div>
			</CardHeader>
			<CardContent className="space-y-3">
				<p className="text-sm text-muted-foreground">{t("formDescription")}</p>
				<form
					className="flex gap-2"
					onSubmit={(e) => {
						e.preventDefault();
						setSubmitted(name);
						setName("");
					}}
				>
					<Input
						placeholder={t("formPlaceholder")}
						value={name}
						onChange={(e) => setName(e.target.value)}
						className="flex-1"
					/>
					<Button type="submit" size="sm" disabled={!name.trim()}>
						{t("formSubmit")}
					</Button>
				</form>
				{submitted && (
					<p className="text-sm">{t("formGreeting", { name: submitted })}</p>
				)}
			</CardContent>
		</Card>
	);
}
