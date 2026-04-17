import { db } from "./index";
import { posts } from "./schema";

const seedPosts = [
	{
		title: "Getting Started with Next.js 16",
		content:
			"Next.js 16 brings exciting new features including React 19 support, Turbopack as default bundler, and improved caching with cache components.",
		authorName: "Alice",
	},
	{
		title: "Understanding Server Components",
		content:
			"React Server Components allow you to render components on the server, reducing the JavaScript bundle sent to the client.",
		authorName: "Bob",
	},
	{
		title: "Drizzle ORM with SQLite",
		content:
			"Drizzle ORM provides a type-safe, SQL-first approach to database access. Combined with better-sqlite3, it offers zero-config local development.",
		authorName: "Charlie",
	},
	{
		title: "Building APIs with Hono",
		content:
			"Hono is a lightweight web framework that integrates beautifully with Next.js route handlers, providing Express-like middleware patterns.",
		authorName: "David",
	},
	{
		title: "Tailwind CSS v4 Changes",
		content:
			"Tailwind CSS v4 introduces a new PostCSS plugin approach and CSS-first configuration, replacing the JavaScript config file.",
		authorName: "Eve",
	},
];

function seed() {
	console.log("Seeding database...");
	db.delete(posts).run();
	for (const post of seedPosts) {
		db.insert(posts).values(post).run();
	}
	console.log(`Seeded ${seedPosts.length} posts`);
}

seed();
