import { createHighlighter } from "shiki";

const highlighterPromise = createHighlighter({
	themes: ["github-dark", "github-light"],
	langs: [
		"tsx",
		"typescript",
		"jsx",
		"javascript",
		"json",
		"bash",
		"css",
		"html",
		"mdx",
		"yaml",
		"markdown",
		"text",
	],
});

export async function highlight(code: string, lang: string = "text"): Promise<string> {
	const highlighter = await highlighterPromise;

	// Normalize language aliases
	const langMap: Record<string, string> = {
		ts: "typescript",
		js: "javascript",
		sh: "bash",
		shell: "bash",
	};
	const mapped = langMap[lang] || lang;
	const loaded = highlighter.getLoadedLanguages();
	const resolvedLang = loaded.includes(mapped) ? mapped : "text";

	return highlighter.codeToHtml(code, {
		lang: resolvedLang,
		themes: {
			dark: "github-dark",
			light: "github-light",
		},
		defaultColor: false,
	});
}
