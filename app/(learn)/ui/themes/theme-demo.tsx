"use client";

import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function ThemeDemo() {
	const { theme, setTheme, resolvedTheme } = useTheme();
	const [mounted, setMounted] = useState(false);
	const t = useTranslations("ui.themes");

	useEffect(() => setMounted(true), []);

	if (!mounted) {
		return (
			<div className="rounded-lg border p-6">
				<div className="h-48 animate-pulse bg-muted rounded" />
			</div>
		);
	}

	const themes = ["light", "dark", "system"] as const;

	return (
		<div className="space-y-6 rounded-lg border p-6">
			{/* Theme Selector */}
			<div className="space-y-3">
				<p className="text-sm font-medium">{t("selectThemeLabel")}</p>
				<div className="flex flex-wrap gap-2">
					{themes.map((themeOption) => (
						<Button
							key={themeOption}
							variant={theme === themeOption ? "default" : "outline"}
							size="sm"
							onClick={() => setTheme(themeOption)}
						>
							{themeOption === "light" && t("lightLabel")}
							{themeOption === "dark" && t("darkLabel")}
							{themeOption === "system" && t("systemLabel")}
						</Button>
					))}
				</div>
			</div>

			{/* Current State */}
			<div className="space-y-2">
				<p className="text-sm font-medium">{t("currentStateLabel")}</p>
				<div className="grid gap-2 sm:grid-cols-2">
					<div className="rounded-md bg-muted px-3 py-2 text-sm">
						<span className="text-muted-foreground">theme: </span>
						<span className="font-mono font-medium">{theme}</span>
					</div>
					<div className="rounded-md bg-muted px-3 py-2 text-sm">
						<span className="text-muted-foreground">resolvedTheme: </span>
						<span className="font-mono font-medium">{resolvedTheme}</span>
					</div>
				</div>
			</div>

			{/* Color Swatches */}
			<div className="space-y-2">
				<p className="text-sm font-medium">{t("activeCssVariablesLabel")}</p>
				<div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
					{[
						{ name: "background", className: "bg-background" },
						{ name: "foreground", className: "bg-foreground" },
						{ name: "primary", className: "bg-primary" },
						{ name: "secondary", className: "bg-secondary" },
						{ name: "muted", className: "bg-muted" },
						{ name: "accent", className: "bg-accent" },
						{ name: "destructive", className: "bg-destructive" },
						{ name: "card", className: "bg-card" },
					].map(({ name, className }) => (
						<div key={name} className="space-y-1">
							<div className={`h-10 rounded-md border ${className}`} />
							<p className="text-xs text-muted-foreground font-mono text-center">
								{name}
							</p>
						</div>
					))}
				</div>
			</div>

			{/* Preview Card */}
			<div className="space-y-2">
				<p className="text-sm font-medium">{t("previewLabel")}</p>
				<div className="rounded-lg border bg-card p-4 space-y-2">
					<p className="font-medium text-card-foreground">{t("cardTitle")}</p>
					<p className="text-sm text-muted-foreground">{t("cardText")}</p>
					<div className="flex gap-2">
						<Button size="sm">Primary</Button>
						<Button size="sm" variant="secondary">
							Secondary
						</Button>
						<Button size="sm" variant="outline">
							Outline
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
