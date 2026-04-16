"use client";

import { useTranslations } from "next-intl";
import { useActionState, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { createPost } from "./actions";

const TITLE_MAX = 100;
const CONTENT_MAX = 500;
const AUTHOR_MAX = 50;

function CharCount({ current, max }: { current: number; max: number }) {
	const isNear = current >= max * 0.8;
	const isAtLimit = current >= max;
	return (
		<span
			className={`text-xs ${isAtLimit ? "text-destructive" : isNear ? "text-yellow-600 dark:text-yellow-400" : "text-muted-foreground"}`}
		>
			{current}/{max}
		</span>
	);
}

export function PostForm() {
	const t = useTranslations("data.serverActions");
	const [state, formAction, isPending] = useActionState(createPost, null);
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [authorName, setAuthorName] = useState("");

	return (
		<Card>
			<CardHeader className="pb-2">
				<div className="flex items-center justify-between">
					<CardTitle className="text-base">{t("createPost")}</CardTitle>
					<Badge variant="outline" className="text-xs">
						{t("serverActionBadge")}
					</Badge>
				</div>
			</CardHeader>
			<CardContent>
				<form action={formAction} className="space-y-3">
					<div>
						<div className="flex items-center justify-between mb-1">
							<label htmlFor="title" className="text-sm font-medium">
								{t("titleLabel")}
							</label>
							<CharCount current={title.length} max={TITLE_MAX} />
						</div>
						<Input
							id="title"
							name="title"
							placeholder={t("titlePlaceholder")}
							maxLength={TITLE_MAX}
							required
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
					</div>
					<div>
						<div className="flex items-center justify-between mb-1">
							<label htmlFor="content" className="text-sm font-medium">
								{t("contentLabel")}
							</label>
							<CharCount current={content.length} max={CONTENT_MAX} />
						</div>
						<Input
							id="content"
							name="content"
							placeholder={t("contentPlaceholder")}
							maxLength={CONTENT_MAX}
							required
							value={content}
							onChange={(e) => setContent(e.target.value)}
						/>
					</div>
					<div>
						<div className="flex items-center justify-between mb-1">
							<label htmlFor="authorName" className="text-sm font-medium">
								{t("authorLabel")}
							</label>
							<CharCount current={authorName.length} max={AUTHOR_MAX} />
						</div>
						<Input
							id="authorName"
							name="authorName"
							placeholder={t("authorPlaceholder")}
							maxLength={AUTHOR_MAX}
							required
							value={authorName}
							onChange={(e) => setAuthorName(e.target.value)}
						/>
					</div>
					<Button type="submit" size="sm" disabled={isPending}>
						{isPending ? t("creating") : t("createPostButton")}
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
