import { describe, expect, it } from "vitest";
import { highlight } from "@/lib/shiki";

describe("highlight", () => {
	it("highlights a known language (tsx)", async () => {
		const html = await highlight("const x = 1;", "tsx");
		expect(html).toContain("<pre");
		expect(html).toContain("shiki");
	});

	it("maps ts → typescript", async () => {
		const html = await highlight("const x: number = 1;", "ts");
		expect(html).toContain("<pre");
	});

	it("falls back to text for unknown languages", async () => {
		const html = await highlight("some content", "klingon");
		expect(html).toContain("<pre");
		expect(html).toContain("some content");
	});

	it("defaults to text when lang is omitted", async () => {
		const html = await highlight("plain text");
		expect(html).toContain("<pre");
	});
});
