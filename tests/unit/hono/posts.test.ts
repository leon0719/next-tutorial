import { describe, expect, it } from "vitest";
import app from "@/lib/api";

async function json(res: Response) {
	return res.json() as Promise<Record<string, unknown>>;
}

async function createPost(body: Record<string, unknown>) {
	return app.request("/api/posts", {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify(body),
	});
}

describe("POST /api/posts", () => {
	it("creates a post with defaults", async () => {
		const res = await createPost({ title: "T1", content: "C1" });
		expect(res.status).toBe(201);
		const body = (await json(res)) as {
			id: number;
			title: string;
			authorName: string;
		};
		expect(body.id).toBeGreaterThan(0);
		expect(body.title).toBe("T1");
		expect(body.authorName).toBe("Anonymous");
	});

	it("rejects missing title", async () => {
		const res = await createPost({ content: "C1" });
		expect(res.status).toBe(400);
	});

	it("rejects empty content", async () => {
		const res = await createPost({ title: "T1", content: "" });
		expect(res.status).toBe(400);
	});
});

describe("GET /api/posts", () => {
	it("returns empty array when none", async () => {
		const res = await app.request("/api/posts");
		expect(res.status).toBe(200);
		expect(await res.json()).toEqual([]);
	});

	it("returns all posts", async () => {
		await createPost({ title: "A", content: "a" });
		await createPost({ title: "B", content: "b" });
		const res = await app.request("/api/posts");
		const body = (await res.json()) as { title: string }[];
		expect(body).toHaveLength(2);
		expect(body.map((p) => p.title).sort()).toEqual(["A", "B"]);
	});
});

describe("GET /api/posts/:id", () => {
	it("returns a post by id", async () => {
		const created = (await json(
			await createPost({ title: "X", content: "x" }),
		)) as { id: number };
		const res = await app.request(`/api/posts/${created.id}`);
		expect(res.status).toBe(200);
		const body = (await res.json()) as { title: string };
		expect(body.title).toBe("X");
	});

	it("404 when not found", async () => {
		const res = await app.request("/api/posts/9999");
		expect(res.status).toBe(404);
	});

	it("400 when id is not a positive integer", async () => {
		const res = await app.request("/api/posts/abc");
		expect(res.status).toBe(400);
	});
});

describe("PUT /api/posts/:id", () => {
	it("updates a post", async () => {
		const created = (await json(
			await createPost({ title: "old", content: "old" }),
		)) as { id: number };
		const res = await app.request(`/api/posts/${created.id}`, {
			method: "PUT",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({ title: "new" }),
		});
		expect(res.status).toBe(200);
		const body = (await res.json()) as { title: string; content: string };
		expect(body.title).toBe("new");
		expect(body.content).toBe("old");
	});

	it("404 when updating missing post", async () => {
		const res = await app.request("/api/posts/9999", {
			method: "PUT",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({ title: "x" }),
		});
		expect(res.status).toBe(404);
	});
});

describe("DELETE /api/posts/:id", () => {
	it("deletes a post", async () => {
		const created = (await json(
			await createPost({ title: "D", content: "d" }),
		)) as { id: number };
		const res = await app.request(`/api/posts/${created.id}`, {
			method: "DELETE",
		});
		expect(res.status).toBe(200);
		const follow = await app.request(`/api/posts/${created.id}`);
		expect(follow.status).toBe(404);
	});

	it("404 when deleting missing post", async () => {
		const res = await app.request("/api/posts/9999", { method: "DELETE" });
		expect(res.status).toBe(404);
	});
});
