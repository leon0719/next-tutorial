"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function StreamDemo() {
	const [lines, setLines] = useState<string[]>([]);
	const [isStreaming, setIsStreaming] = useState(false);

	async function startStream() {
		setLines([]);
		setIsStreaming(true);
		const res = await fetch("/api/stream");
		const reader = res.body?.getReader();
		const decoder = new TextDecoder();
		if (!reader) return;

		while (true) {
			const { done, value } = await reader.read();
			if (done) break;
			const text = decoder.decode(value);
			const newLines = text.split("\n").filter(Boolean);
			setLines((prev) => [...prev, ...newLines]);
		}
		setIsStreaming(false);
	}

	return (
		<Card>
			<CardHeader className="pb-2">
				<div className="flex items-center justify-between">
					<CardTitle className="text-base">Stream Demo</CardTitle>
					<Button
						variant="outline"
						size="sm"
						onClick={startStream}
						disabled={isStreaming}
					>
						{isStreaming ? "Streaming..." : "Start Stream"}
					</Button>
				</div>
			</CardHeader>
			<CardContent>
				<div className="min-h-50 rounded bg-muted/50 p-3 font-mono text-sm">
					{lines.length === 0 ? (
						<p className="text-muted-foreground">
							Click &quot;Start Stream&quot; to begin...
						</p>
					) : (
						lines.map((line, i) => (
							// biome-ignore lint/suspicious/noArrayIndexKey: stream lines can duplicate, index is only stable key
							<div key={i} className="py-0.5">
								{line}
							</div>
						))
					)}
					{isStreaming && <span className="animate-pulse">&#9610;</span>}
				</div>
			</CardContent>
		</Card>
	);
}
