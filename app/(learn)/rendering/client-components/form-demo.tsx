"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function FormDemo() {
	const [name, setName] = useState("");
	const [submitted, setSubmitted] = useState<string | null>(null);

	return (
		<Card>
			<CardHeader className="pb-2">
				<div className="flex items-center justify-between">
					<CardTitle className="text-base">Form Input</CardTitle>
					<Badge variant="outline" className="text-xs">
						use client
					</Badge>
				</div>
			</CardHeader>
			<CardContent className="space-y-3">
				<p className="text-sm text-muted-foreground">
					onChange + onSubmit — controlled form state.
				</p>
				<form
					className="flex gap-2"
					onSubmit={(e) => {
						e.preventDefault();
						setSubmitted(name);
						setName("");
					}}
				>
					<Input
						placeholder="Type your name..."
						value={name}
						onChange={(e) => setName(e.target.value)}
						className="flex-1"
					/>
					<Button type="submit" size="sm" disabled={!name.trim()}>
						Submit
					</Button>
				</form>
				{submitted && (
					<p className="text-sm">
						Hello, <span className="font-semibold">{submitted}</span>!
					</p>
				)}
			</CardContent>
		</Card>
	);
}
