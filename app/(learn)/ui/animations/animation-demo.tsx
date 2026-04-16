"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function AnimationDemo() {
	const [showFadeIn, setShowFadeIn] = useState(false);
	const t = useTranslations("ui.animations");

	return (
		<div className="grid gap-6 sm:grid-cols-2">
			{/* Hover Transitions */}
			<div className="space-y-3">
				<p className="text-sm font-medium">{t("cssTransitionsLabel")}</p>
				<div className="flex flex-wrap gap-3">
					<div className="rounded-lg bg-primary px-4 py-2 text-primary-foreground text-sm transition-all duration-300 hover:scale-110 hover:shadow-lg cursor-pointer">
						Scale
					</div>
					<div className="rounded-lg bg-secondary px-4 py-2 text-secondary-foreground text-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer">
						Lift
					</div>
					<div className="rounded-lg bg-muted px-4 py-2 text-muted-foreground text-sm transition-all duration-500 hover:bg-primary hover:text-primary-foreground cursor-pointer">
						Color
					</div>
					<div className="rounded-lg border px-4 py-2 text-sm transition-all duration-300 hover:rotate-3 hover:shadow-lg cursor-pointer">
						Rotate
					</div>
				</div>
			</div>

			{/* Keyframe Animation */}
			<div className="space-y-3">
				<p className="text-sm font-medium">{t("keyframeAnimationLabel")}</p>
				<div className="space-y-3">
					<Button
						variant="outline"
						size="sm"
						onClick={() => {
							setShowFadeIn(false);
							requestAnimationFrame(() => setShowFadeIn(true));
						}}
					>
						{t("triggerFadeIn")}
					</Button>
					{showFadeIn && (
						<div
							className="rounded-lg border bg-card p-4 text-sm"
							style={{
								animation: "demo-fade-in 0.6s ease-out forwards",
							}}
						>
							<p className="font-medium">{t("helloText")}</p>
							<p className="text-muted-foreground">{t("fadeInText")}</p>
						</div>
					)}
				</div>
				<style>{`
					@keyframes demo-fade-in {
						from {
							opacity: 0;
							transform: translateY(10px);
						}
						to {
							opacity: 1;
							transform: translateY(0);
						}
					}
				`}</style>
			</div>

			{/* Pulse Animation */}
			<div className="space-y-3">
				<p className="text-sm font-medium">{t("builtInTailwindLabel")}</p>
				<div className="flex gap-4 items-center">
					<div className="h-4 w-4 rounded-full bg-primary animate-pulse" />
					<span className="text-sm text-muted-foreground">animate-pulse</span>
				</div>
				<div className="flex gap-4 items-center">
					<div className="h-4 w-4 rounded-full bg-primary animate-bounce" />
					<span className="text-sm text-muted-foreground">animate-bounce</span>
				</div>
				<div className="flex gap-4 items-center">
					<div className="h-4 w-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />
					<span className="text-sm text-muted-foreground">animate-spin</span>
				</div>
			</div>

			{/* Reduced Motion */}
			<div className="space-y-3">
				<p className="text-sm font-medium">{t("accessibilityLabel")}</p>
				<div className="rounded-lg border bg-muted/30 p-4 text-sm space-y-2">
					<p className="text-muted-foreground">{t("accessibilityText")}</p>
					<code className="block text-xs bg-muted rounded px-2 py-1">
						motion-safe:animate-bounce
					</code>
					<code className="block text-xs bg-muted rounded px-2 py-1">
						motion-reduce:transition-none
					</code>
				</div>
			</div>
		</div>
	);
}
