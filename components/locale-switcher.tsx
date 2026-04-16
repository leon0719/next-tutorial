"use client";

import { useCallback, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";

const COOKIE_NAME = "NEXT_LOCALE";

function getLocaleFromCookie(): string {
	if (typeof document === "undefined") return "zh-TW";
	const match = document.cookie.match(
		new RegExp(`(?:^|; )${COOKIE_NAME}=([^;]*)`),
	);
	return match ? decodeURIComponent(match[1]) : "zh-TW";
}

export function LocaleSwitcher() {
	const router = useRouter();
	const [locale, setLocale] = useState("zh-TW");

	useEffect(() => {
		setLocale(getLocaleFromCookie());
	}, []);

	const switchLocale = useCallback(() => {
		const next = locale === "zh-TW" ? "en" : "zh-TW";
		document.cookie = `${COOKIE_NAME}=${next}; path=/; max-age=${60 * 60 * 24 * 365}`;
		setLocale(next);
		router.refresh();
	}, [locale, router]);

	const nextLabel = locale === "zh-TW" ? "EN" : "中文";

	return (
		<Button
			variant="ghost"
			size="icon"
			onClick={switchLocale}
			title={`Switch to ${nextLabel}`}
		>
			<Languages className="h-4 w-4" />
			<span className="sr-only">Switch to {nextLabel}</span>
		</Button>
	);
}
