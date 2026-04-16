"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function InteractiveCard({
	title,
	badge,
	children,
}: {
	title: string;
	badge: string;
	children: React.ReactNode;
}) {
	const [expanded, setExpanded] = useState(true);

	return (
		<Card>
			<CardHeader className="pb-2">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<CardTitle className="text-base">{title}</CardTitle>
						<Badge variant="outline" className="text-xs">
							{badge}
						</Badge>
					</div>
					<Button
						variant="ghost"
						size="icon"
						className="h-7 w-7"
						onClick={() => setExpanded(!expanded)}
					>
						{expanded ? (
							<ChevronUp className="h-4 w-4" />
						) : (
							<ChevronDown className="h-4 w-4" />
						)}
					</Button>
				</div>
			</CardHeader>
			{expanded && <CardContent>{children}</CardContent>}
		</Card>
	);
}
