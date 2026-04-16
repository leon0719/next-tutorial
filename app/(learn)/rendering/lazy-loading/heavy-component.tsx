"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
	{ label: "Jan", value: 65 },
	{ label: "Feb", value: 42 },
	{ label: "Mar", value: 78 },
	{ label: "Apr", value: 91 },
	{ label: "May", value: 56 },
	{ label: "Jun", value: 83 },
	{ label: "Jul", value: 70 },
	{ label: "Aug", value: 95 },
	{ label: "Sep", value: 48 },
	{ label: "Oct", value: 87 },
	{ label: "Nov", value: 62 },
	{ label: "Dec", value: 74 },
];

const maxValue = Math.max(...data.map((d) => d.value));

export function HeavyComponent() {
	return (
		<Card>
			<CardHeader className="pb-2">
				<div className="flex items-center justify-between">
					<CardTitle className="text-base">Monthly Revenue Chart</CardTitle>
					<Badge variant="outline" className="text-xs">
						Dynamically Loaded
					</Badge>
				</div>
			</CardHeader>
			<CardContent>
				<p className="text-sm text-muted-foreground mb-4">
					This component simulates a &quot;heavy&quot; charting library. It was
					loaded via next/dynamic and was not part of the initial page bundle.
				</p>
				<div className="flex items-end gap-1.5 h-40">
					{data.map((d) => (
						<div
							key={d.label}
							className="flex-1 flex flex-col items-center gap-1"
						>
							<span className="text-[10px] text-muted-foreground">
								{d.value}
							</span>
							<div
								className="w-full bg-primary/80 rounded-t transition-all hover:bg-primary"
								style={{ height: `${(d.value / maxValue) * 100}%` }}
							/>
							<span className="text-[10px] text-muted-foreground">
								{d.label}
							</span>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
