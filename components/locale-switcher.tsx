"use client";

import { Languages } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useUI } from "@/lib/stores/ui";

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
	const pushToast = useUI((s) => s.pushToast);
	const [locale, setLocale] = useState("zh-TW");

	useEffect(() => {
		setLocale(getLocaleFromCookie());
	}, []);

	const switchLocale = useCallback(() => {
		const next = locale === "zh-TW" ? "en" : "zh-TW";
		// biome-ignore lint/suspicious/noDocumentCookie: next-intl cookie-based locale pattern; Cookie Store API browser support is still limited
		document.cookie = `${COOKIE_NAME}=${next}; path=/; max-age=${60 * 60 * 24 * 365}`;
		setLocale(next);
		router.refresh();
		pushToast({
			message: next === "zh-TW" ? "語系：中文" : "Language: English",
			kind: "info",
			icon: Languages,
		});
	}, [locale, router, pushToast]);

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
