"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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
					<form onSubmit={handleSubmit(onSubmit)}>
						<FieldGroup>
							<Field data-invalid={!!errors.name || undefined}>
								<FieldLabel htmlFor="contact-name" className="sr-only">
									{t("namePlaceholder")}
								</FieldLabel>
								<Input
									id="contact-name"
									placeholder={t("namePlaceholder")}
									aria-invalid={!!errors.name || undefined}
									aria-describedby={
										errors.name ? "contact-name-error" : undefined
									}
									{...register("name")}
								/>
								<FieldError id="contact-name-error">
									{errors.name?.message}
								</FieldError>
							</Field>
							<Field data-invalid={!!errors.email || undefined}>
								<FieldLabel htmlFor="contact-email" className="sr-only">
									{t("emailPlaceholder")}
								</FieldLabel>
								<Input
									id="contact-email"
									type="email"
									placeholder={t("emailPlaceholder")}
									aria-invalid={!!errors.email || undefined}
									aria-describedby={
										errors.email ? "contact-email-error" : undefined
									}
									{...register("email")}
								/>
								<FieldError id="contact-email-error">
									{errors.email?.message}
								</FieldError>
							</Field>
							<Field data-invalid={!!errors.subject || undefined}>
								<FieldLabel htmlFor="contact-subject" className="sr-only">
									{t("subjectPlaceholder")}
								</FieldLabel>
								<Input
									id="contact-subject"
									placeholder={t("subjectPlaceholder")}
									aria-invalid={!!errors.subject || undefined}
									aria-describedby={
										errors.subject ? "contact-subject-error" : undefined
									}
									{...register("subject")}
								/>
								<FieldError id="contact-subject-error">
									{errors.subject?.message}
								</FieldError>
							</Field>
							<Field data-invalid={!!errors.message || undefined}>
								<FieldLabel htmlFor="contact-message" className="sr-only">
									{t("messagePlaceholder")}
								</FieldLabel>
								<Textarea
									id="contact-message"
									placeholder={t("messagePlaceholder")}
									aria-invalid={!!errors.message || undefined}
									aria-describedby={
										errors.message ? "contact-message-error" : undefined
									}
									{...register("message")}
								/>
								<FieldError id="contact-message-error">
									{errors.message?.message}
								</FieldError>
							</Field>
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
						</FieldGroup>
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
