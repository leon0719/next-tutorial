"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const contactSchema = z.object({
	name: z.string().min(2, "Name must be at least 2 characters"),
	email: z.string().email("Invalid email address"),
	subject: z.string().min(1, "Subject is required"),
	message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactFormDemo() {
	const t = useTranslations("data.forms");
	const [submitted, setSubmitted] = useState<ContactFormData | null>(null);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<ContactFormData>({
		resolver: zodResolver(contactSchema),
	});

	const onSubmit = (data: ContactFormData) => {
		setSubmitted(data);
	};

	return (
		<div className="grid gap-4 md:grid-cols-2">
			<Card>
				<CardHeader className="pb-2">
					<div className="flex items-center justify-between">
						<CardTitle className="text-base">{t("formTitle")}</CardTitle>
						<Badge variant="outline" className="text-xs">
							react-hook-form + zod
						</Badge>
					</div>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
						<div>
							<Input placeholder={t("namePlaceholder")} {...register("name")} />
							{errors.name && (
								<p className="text-xs text-destructive mt-1">
									{errors.name.message}
								</p>
							)}
						</div>
						<div>
							<Input
								placeholder={t("emailPlaceholder")}
								type="email"
								{...register("email")}
							/>
							{errors.email && (
								<p className="text-xs text-destructive mt-1">
									{errors.email.message}
								</p>
							)}
						</div>
						<div>
							<Input
								placeholder={t("subjectPlaceholder")}
								{...register("subject")}
							/>
							{errors.subject && (
								<p className="text-xs text-destructive mt-1">
									{errors.subject.message}
								</p>
							)}
						</div>
						<div>
							<textarea
								placeholder={t("messagePlaceholder")}
								{...register("message")}
								className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
							/>
							{errors.message && (
								<p className="text-xs text-destructive mt-1">
									{errors.message.message}
								</p>
							)}
						</div>
						<div className="flex gap-2">
							<Button type="submit" size="sm" disabled={isSubmitting}>
								{t("submit")}
							</Button>
							<Button
								type="button"
								variant="outline"
								size="sm"
								onClick={() => {
									reset();
									setSubmitted(null);
								}}
							>
								{t("reset")}
							</Button>
						</div>
					</form>
				</CardContent>
			</Card>

			<Card>
				<CardHeader className="pb-2">
					<CardTitle className="text-base">{t("resultTitle")}</CardTitle>
				</CardHeader>
				<CardContent>
					{submitted ? (
						<div className="space-y-2 text-sm">
							<div className="flex justify-between">
								<span className="text-muted-foreground">
									{t("namePlaceholder")}
								</span>
								<span>{submitted.name}</span>
							</div>
							<div className="flex justify-between">
								<span className="text-muted-foreground">
									{t("emailPlaceholder")}
								</span>
								<span>{submitted.email}</span>
							</div>
							<div className="flex justify-between">
								<span className="text-muted-foreground">
									{t("subjectPlaceholder")}
								</span>
								<span>{submitted.subject}</span>
							</div>
							<div className="border-t pt-2">
								<p className="text-muted-foreground text-xs">
									{t("messagePlaceholder")}
								</p>
								<p className="mt-1">{submitted.message}</p>
							</div>
						</div>
					) : (
						<p className="text-sm text-muted-foreground">{t("noSubmission")}</p>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
