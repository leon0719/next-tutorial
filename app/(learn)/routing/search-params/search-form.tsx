"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function SearchForm() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [key, setKey] = useState("");
	const [value, setValue] = useState("");

	function handleAdd() {
		if (!key.trim()) return;
		const params = new URLSearchParams(searchParams.toString());
		params.set(key.trim(), value);
		router.push(`?${params.toString()}`);
		setKey("");
		setValue("");
	}

	function handleClear() {
		router.push("?");
	}

	return (
		<Card>
			<CardHeader className="pb-2">
				<CardTitle className="text-base">Add Search Params</CardTitle>
			</CardHeader>
			<CardContent className="space-y-3">
				<div className="flex gap-2">
					<Input
						placeholder="key"
						value={key}
						onChange={(e) => setKey(e.target.value)}
						className="flex-1"
					/>
					<Input
						placeholder="value"
						value={value}
						onChange={(e) => setValue(e.target.value)}
						className="flex-1"
					/>
					<Button size="sm" onClick={handleAdd}>
						Add
					</Button>
				</div>
				<div className="flex gap-2">
					<Button
						variant="outline"
						size="sm"
						onClick={() => {
							const params = new URLSearchParams(searchParams.toString());
							params.set("q", "hello");
							params.set("page", "2");
							router.push(`?${params.toString()}`);
						}}
					>
						?q=hello&page=2
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() => {
							const params = new URLSearchParams();
							params.append("color", "red");
							params.append("color", "blue");
							router.push(`?${params.toString()}`);
						}}
					>
						?color=red&color=blue
					</Button>
					<Button variant="ghost" size="sm" onClick={handleClear}>
						Clear All
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
