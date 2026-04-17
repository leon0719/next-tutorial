export type Messages = Record<string, unknown>;

// `extras` is deep-merged one level because it patches existing namespaces
// (e.g. rendering.*, routing.*) rather than introducing new top-level keys.
export function mergeMessages(
	base: Messages,
	sections: Messages[],
	extras: Messages,
): Messages {
	const merged: Messages = Object.assign({}, base, ...sections);

	for (const [key, value] of Object.entries(extras)) {
		const existing = merged[key];
		if (
			existing &&
			typeof existing === "object" &&
			value &&
			typeof value === "object"
		) {
			merged[key] = { ...existing, ...(value as Messages) };
		} else {
			merged[key] = value;
		}
	}

	return merged;
}
