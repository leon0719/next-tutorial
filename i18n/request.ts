import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
	let locale = await requestLocale;

	// Also check cookie for locale preference
	if (!locale) {
		const cookieStore = await cookies();
		locale = cookieStore.get("NEXT_LOCALE")?.value;
	}

	if (!locale || !routing.locales.includes(locale as "zh-TW" | "en")) {
		locale = routing.defaultLocale;
	}

	const base = (await import(`../messages/${locale}.json`)).default;
	const rendering = (
		await import(`../messages/sections/rendering.${locale}.json`)
	).default;
	const overviews = (
		await import(`../messages/sections/overviews.${locale}.json`)
	).default;
	const routingMessages = (
		await import(`../messages/sections/routing.${locale}.json`)
	).default;
	const data = (
		await import(`../messages/sections/data.${locale}.json`)
	).default;
	const ui = (await import(`../messages/sections/ui.${locale}.json`)).default;
	const config = (
		await import(`../messages/sections/config.${locale}.json`)
	).default;
	const advanced = (
		await import(`../messages/sections/advanced.${locale}.json`)
	).default;
	const api = (await import(`../messages/sections/api.${locale}.json`))
		.default;

	return {
		locale,
		messages: {
			...base,
			...rendering,
			...overviews,
			...routingMessages,
			...data,
			...ui,
			...config,
			...advanced,
			...api,
		},
	};
});
