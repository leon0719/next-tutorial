"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function CounterDemo() {
	const [count, setCount] = useState(0);

	return (
		<Card>
			<CardHeader className="pb-2">
				<div className="flex items-center justify-between">
					<CardTitle className="text-base">Counter</CardTitle>
					<Badge variant="outline" className="text-xs">
						use client
					</Badge>
				</div>
			</CardHeader>
			<CardContent className="space-y-3">
				<p className="text-sm text-muted-foreground">
					useState + onClick — only possible in Client Components.
				</p>
				<div className="flex items-center gap-3">
					<Button
						variant="outline"
						size="sm"
						onClick={() => setCount((c) => c - 1)}
					>
						-
					</Button>
					<span className="text-2xl font-bold tabular-nums w-12 text-center">
						{count}
					</span>
					<Button
						variant="outline"
						size="sm"
						onClick={() => setCount((c) => c + 1)}
					>
						+
					</Button>
				</div>
				<Button
					variant="ghost"
					size="sm"
					className="text-xs"
					onClick={() => setCount(0)}
				>
					Reset
				</Button>
			</CardContent>
		</Card>
	);
}
