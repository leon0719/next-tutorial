CREATE TABLE `posts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`content` text NOT NULL,
	`author_name` text DEFAULT 'Anonymous' NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
