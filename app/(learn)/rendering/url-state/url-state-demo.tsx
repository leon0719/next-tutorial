"use client";

import { parseAsInteger, parseAsString, useQueryState } from "nuqs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function UrlStateDemo() {
	const [search, setSearch] = useQueryState("q", parseAsString.withDefault(""));
	const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
	const [sort, setSort] = useQueryState(
		"sort",
		parseAsString.withDefault("newest"),
	);

	return (
		<Card>
			<CardHeader className="pb-2">
				<div className="flex items-center justify-between">
					<CardTitle className="text-base">URL State Demo</CardTitle>
					<Badge variant="outline" className="font-mono text-xs">
						?q={search}&page={page}&sort={sort}
					</Badge>
				</div>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="space-y-2">
					<span className="text-sm font-medium">Search (q)</span>
					<Input
						value={search}
						onChange={(e) => setSearch(e.target.value || null)}
						placeholder="Type to update ?q= param"
					/>
				</div>
				<div className="space-y-2">
					<span className="text-sm font-medium">Page</span>
					<div className="flex items-center gap-2">
						<Button
							variant="outline"
							size="sm"
							onClick={() => setPage((p) => Math.max(1, (p ?? 1) - 1))}
						>
							Prev
						</Button>
						<span className="text-sm font-mono w-8 text-center">{page}</span>
						<Button
							variant="outline"
							size="sm"
							onClick={() => setPage((p) => (p ?? 1) + 1)}
						>
							Next
						</Button>
					</div>
				</div>
				<div className="space-y-2">
					<span className="text-sm font-medium">Sort</span>
					<div className="flex gap-2">
						{["newest", "oldest", "popular"].map((s) => (
							<Button
								key={s}
								variant={sort === s ? "default" : "outline"}
								size="sm"
								onClick={() => setSort(s)}
							>
								{s}
							</Button>
						))}
					</div>
				</div>
				<Button
					variant="ghost"
					size="sm"
					className="text-xs"
					onClick={() => {
						setSearch(null);
						setPage(null);
						setSort(null);
					}}
				>
					Reset All
				</Button>
			</CardContent>
		</Card>
	);
}
