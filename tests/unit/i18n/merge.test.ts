import { describe, expect, it } from "vitest";
import { mergeMessages } from "@/i18n/merge";

describe("mergeMessages", () => {
	it("shallow-merges base and sections", () => {
		const merged = mergeMessages({ a: 1 }, [{ b: 2 }, { c: 3 }], {});
		expect(merged).toEqual({ a: 1, b: 2, c: 3 });
	});

	it("later sections override earlier keys", () => {
		const merged = mergeMessages({ a: 1 }, [{ a: 2 }], {});
		expect(merged.a).toBe(2);
	});

	it("deep-merges extras into an existing namespace", () => {
		const merged = mergeMessages(
			{},
			[{ rendering: { title: "Rendering", intro: "old" } }],
			{ rendering: { intro: "new", extra: "x" } },
		);
		expect(merged.rendering).toEqual({
			title: "Rendering",
			intro: "new",
			extra: "x",
		});
	});

	it("adds new top-level keys from extras when namespace absent", () => {
		const merged = mergeMessages({}, [], { fresh: { a: 1 } });
		expect(merged.fresh).toEqual({ a: 1 });
	});

	it("overwrites non-object extras verbatim", () => {
		const merged = mergeMessages({ k: "old" }, [], { k: "new" });
		expect(merged.k).toBe("new");
	});
});
