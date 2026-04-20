import { createHighlighter } from "shiki";

// Preload only the most frequently used languages to keep the initial
// highlighter payload small. Everything else is loaded on demand via
// `loadLanguage()` the first time a code block asks for it.
const CORE_LANGS = ["tsx", "bash", "json", "css", "text"] as const;

const LAZY_LANGS = new Set([
	"typescript",
	"jsx",
	"javascript",
	"html",
	"mdx",
	"yaml",
	"markdown",
]);

const langMap: Record<string, string> = {
	ts: "typescript",
	js: "javascript",
	sh: "bash",
	shell: "bash",
};

const highlighterPromise = createHighlighter({
	themes: ["github-dark", "github-light"],
	langs: [...CORE_LANGS],
});

export async function highlight(
	code: string,
	lang: string = "text",
): Promise<string> {
	const highlighter = await highlighterPromise;
	const mapped = langMap[lang] || lang;

	let resolvedLang = "text";
	const loaded = highlighter.getLoadedLanguages();
	if (loaded.includes(mapped)) {
		resolvedLang = mapped;
	} else if (LAZY_LANGS.has(mapped)) {
		try {
			await highlighter.loadLanguage(
				mapped as Parameters<typeof highlighter.loadLanguage>[0],
			);
			resolvedLang = mapped;
		} catch {
			resolvedLang = "text";
		}
	}

	return highlighter.codeToHtml(code, {
		lang: resolvedLang,
		themes: {
			dark: "github-dark",
			light: "github-light",
		},
		defaultColor: false,
	});
}
