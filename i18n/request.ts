import { cookies } from "next/headers";
import { getRequestConfig } from "next-intl/server";
import { type Messages, mergeMessages } from "./merge";
import { routing } from "./routing";

const SECTIONS = [
	"rendering",
	"overviews",
	"routing",
	"data",
	"ui",
	"config",
	"advanced",
	"api",
] as const;

export default getRequestConfig(async ({ requestLocale }) => {
	let locale = await requestLocale;

	if (!locale) {
		const cookieStore = await cookies();
		locale = cookieStore.get("NEXT_LOCALE")?.value;
	}

	if (!locale || !routing.locales.includes(locale as "zh-TW" | "en")) {
		locale = routing.defaultLocale;
	}

	const [base, ...sections] = await Promise.all([
		import(`../messages/${locale}.json`).then((m) => m.default as Messages),
		...SECTIONS.map((name) =>
			import(`../messages/sections/${name}.${locale}.json`).then(
				(m) => m.default as Messages,
			),
		),
	]);
	const extras = (await import(`../messages/sections/extras.${locale}.json`))
		.default as Messages;

	return { locale, messages: mergeMessages(base, sections, extras) };
});
