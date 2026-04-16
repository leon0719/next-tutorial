"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

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

	return (
		<Button
			variant="ghost"
			size="sm"
			className="h-8 px-2 text-xs font-medium"
			onClick={switchLocale}
		>
			{locale === "zh-TW" ? "中文" : "EN"}
		</Button>
	);
}
