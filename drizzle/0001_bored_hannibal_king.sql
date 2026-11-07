CREATE TABLE `projects` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`owner_id` text NOT NULL,
	`owner_email` text NOT NULL,
	`description` text DEFAULT '' NOT NULL,
	`location` text DEFAULT '' NOT NULL,
	`address` text DEFAULT '' NOT NULL,
	`length_feet` integer DEFAULT 0 NOT NULL,
	`height_feet` integer DEFAULT 0 NOT NULL,
	`progress_percent` integer DEFAULT 0 NOT NULL,
	`pattis_delivered` integer DEFAULT 0 NOT NULL,
	`pattis_installed` integer DEFAULT 0 NOT NULL,
	`total_pattis` integer DEFAULT 0 NOT NULL,
	`pillars_delivered` integer DEFAULT 0 NOT NULL,
	`pillars_installed` integer DEFAULT 0 NOT NULL,
	`total_pillars` integer DEFAULT 0 NOT NULL,
	`photos` text DEFAULT '[]' NOT NULL,
	`videos` text DEFAULT '[]' NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`owner_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
ALTER TABLE `users` ADD `role` text DEFAULT 'customer' NOT NULL;