"use client";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

dayjs.extend(relativeTime);

export function DateDemo() {
	const [now, setNow] = useState(dayjs());

	return (
		<Card>
			<CardHeader className="pb-2">
				<div className="flex items-center justify-between">
					<CardTitle className="text-base">dayjs Live Demo</CardTitle>
					<Button variant="outline" size="sm" onClick={() => setNow(dayjs())}>
						Refresh
					</Button>
				</div>
			</CardHeader>
			<CardContent>
				<div className="space-y-2 text-sm">
					<div className="flex justify-between">
						<span className="text-muted-foreground">Format</span>
						<code>{now.format("YYYY-MM-DD HH:mm:ss")}</code>
					</div>
					<div className="flex justify-between">
						<span className="text-muted-foreground">Relative</span>
						<code>{now.fromNow()}</code>
					</div>
					<div className="flex justify-between">
						<span className="text-muted-foreground">ISO</span>
						<code>{now.toISOString()}</code>
					</div>
					<div className="flex justify-between">
						<span className="text-muted-foreground">Unix</span>
						<code>{now.unix()}</code>
					</div>
					<div className="flex justify-between">
						<span className="text-muted-foreground">Day of week</span>
						<code>{now.format("dddd")}</code>
					</div>
					<div className="flex justify-between">
						<span className="text-muted-foreground">Start of month</span>
						<code>{now.startOf("month").format("YYYY-MM-DD")}</code>
					</div>
					<div className="flex justify-between">
						<span className="text-muted-foreground">Add 7 days</span>
						<code>{now.add(7, "day").format("YYYY-MM-DD")}</code>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
