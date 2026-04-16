"use client";

import { useActionState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { createPost } from "./actions";

export function PostForm() {
	const [state, formAction, isPending] = useActionState(createPost, null);

	return (
		<Card>
			<CardHeader className="pb-2">
				<div className="flex items-center justify-between">
					<CardTitle className="text-base">Create Post</CardTitle>
					<Badge variant="outline" className="text-xs">
						Server Action
					</Badge>
				</div>
			</CardHeader>
			<CardContent>
				<form action={formAction} className="space-y-3">
					<Input name="title" placeholder="Post title" required />
					<Input name="content" placeholder="Post content" required />
					<Input name="authorName" placeholder="Author name" required />
					<Button type="submit" size="sm" disabled={isPending}>
						{isPending ? "Creating..." : "Create Post"}
					</Button>
					{state?.message && (
						<p
							className={`text-sm ${state.success ? "text-green-600 dark:text-green-400" : "text-destructive"}`}
						>
							{state.message}
						</p>
					)}
				</form>
			</CardContent>
		</Card>
	);
}
