"use client";

import { Languages } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const COOKIE_NAME = "NEXT_LOCALE";

const LOCALES = [
	{ value: "zh-TW", label: "中文" },
	{ value: "en", label: "English" },
] as const;

type LocaleValue = (typeof LOCALES)[number]["value"];

function getLocaleFromCookie(): LocaleValue {
	if (typeof document === "undefined") return "zh-TW";
	const match = document.cookie.match(
		new RegExp(`(?:^|; )${COOKIE_NAME}=([^;]*)`),
	);
	const value = match ? decodeURIComponent(match[1]) : "zh-TW";
	return LOCALES.some((l) => l.value === value)
		? (value as LocaleValue)
		: "zh-TW";
}

export function LocaleSwitcher() {
	const router = useRouter();
	const [locale, setLocale] = useState<LocaleValue>("zh-TW");

	useEffect(() => {
		setLocale(getLocaleFromCookie());
	}, []);

	const switchLocale = useCallback(
		(next: string) => {
			if (next === locale) return;
			// biome-ignore lint/suspicious/noDocumentCookie: next-intl cookie-based locale pattern; Cookie Store API browser support is still limited
			document.cookie = `${COOKIE_NAME}=${next}; path=/; max-age=${60 * 60 * 24 * 365}`;
			setLocale(next as LocaleValue);
			router.refresh();
			toast(next === "zh-TW" ? "語系：中文" : "Language: English", {
				icon: <Languages className="size-4" />,
			});
		},
		[locale, router],
	);

	const current = LOCALES.find((l) => l.value === locale) ?? LOCALES[0];

	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				render={
					<Button
						variant="ghost"
						size="sm"
						className="h-8 px-2 text-xs font-medium"
					>
						{current.label}
					</Button>
				}
			/>
			<DropdownMenuContent align="end" className="min-w-32">
				<DropdownMenuRadioGroup value={locale} onValueChange={switchLocale}>
					{LOCALES.map((l) => (
						<DropdownMenuRadioItem key={l.value} value={l.value}>
							{l.label}
						</DropdownMenuRadioItem>
					))}
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
