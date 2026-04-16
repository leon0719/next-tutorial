"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function AnimationDemo() {
	const [showFadeIn, setShowFadeIn] = useState(false);

	return (
		<div className="grid gap-6 sm:grid-cols-2">
			{/* Hover Transitions */}
			<div className="space-y-3">
				<p className="text-sm font-medium">CSS Transitions (hover)</p>
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
				<p className="text-sm font-medium">Keyframe Animation</p>
				<div className="space-y-3">
					<Button
						variant="outline"
						size="sm"
						onClick={() => {
							setShowFadeIn(false);
							requestAnimationFrame(() => setShowFadeIn(true));
						}}
					>
						Trigger Fade In
					</Button>
					{showFadeIn && (
						<div
							className="rounded-lg border bg-card p-4 text-sm"
							style={{
								animation: "demo-fade-in 0.6s ease-out forwards",
							}}
						>
							<p className="font-medium">Hello!</p>
							<p className="text-muted-foreground">
								This content faded in with a CSS keyframe animation.
							</p>
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
				<p className="text-sm font-medium">Built-in Tailwind Animations</p>
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
				<p className="text-sm font-medium">Accessibility</p>
				<div className="rounded-lg border bg-muted/30 p-4 text-sm space-y-2">
					<p className="text-muted-foreground">
						Use Tailwind&apos;s motion variants to respect user preferences:
					</p>
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
