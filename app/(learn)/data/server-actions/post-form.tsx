"use client";

import { useTranslations } from "next-intl";
import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { createPost } from "./actions";
import { AUTHOR_MAX, CONTENT_MAX, TITLE_MAX } from "./constants";

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

function SubmitButton() {
	const t = useTranslations("data.serverActions");
	const { pending } = useFormStatus();
	return (
		<Button type="submit" size="sm" disabled={pending}>
			{pending ? t("creating") : t("createPostButton")}
		</Button>
	);
}

const FIELDS = [
	{
		name: "title",
		labelKey: "titleLabel",
		placeholderKey: "titlePlaceholder",
		max: TITLE_MAX,
	},
	{
		name: "content",
		labelKey: "contentLabel",
		placeholderKey: "contentPlaceholder",
		max: CONTENT_MAX,
	},
	{
		name: "authorName",
		labelKey: "authorLabel",
		placeholderKey: "authorPlaceholder",
		max: AUTHOR_MAX,
	},
] as const;

export function PostForm() {
	const t = useTranslations("data.serverActions");
	const [state, formAction] = useActionState(createPost, null);
	const [values, setValues] = useState({
		title: "",
		content: "",
		authorName: "",
	});

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
				<form action={formAction}>
					<FieldGroup>
						{FIELDS.map((field) => (
							<Field key={field.name}>
								<div className="flex items-center justify-between">
									<FieldLabel htmlFor={field.name}>
										{t(field.labelKey)}
									</FieldLabel>
									<CharCount
										current={values[field.name].length}
										max={field.max}
									/>
								</div>
								<Input
									id={field.name}
									name={field.name}
									placeholder={t(field.placeholderKey)}
									maxLength={field.max}
									required
									value={values[field.name]}
									onChange={(e) =>
										setValues((prev) => ({
											...prev,
											[field.name]: e.target.value,
										}))
									}
								/>
							</Field>
						))}
						<SubmitButton />
						{state?.message && (
							<p
								role="status"
								aria-live="polite"
								className={`text-sm ${state.success ? "text-green-600 dark:text-green-400" : "text-destructive"}`}
							>
								{state.message}
							</p>
						)}
					</FieldGroup>
				</form>
			</CardContent>
		</Card>
	);
}
