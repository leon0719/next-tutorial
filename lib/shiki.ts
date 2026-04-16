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
		"text",
	],
});

export async function highlight(code: string, lang: string = "text") {
	const highlighter = await highlighterPromise;

	// Normalize language aliases
	const langMap: Record<string, string> = {
		ts: "typescript",
		js: "javascript",
		sh: "bash",
		shell: "bash",
	};
	const resolvedLang = langMap[lang] || lang;

	return highlighter.codeToHtml(code, {
		lang: resolvedLang,
		themes: {
			dark: "github-dark",
			light: "github-light",
		},
		defaultColor: false,
	});
}
