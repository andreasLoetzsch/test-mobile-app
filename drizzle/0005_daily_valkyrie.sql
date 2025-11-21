CREATE TABLE `todo_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_by` integer NOT NULL,
	`text` text NOT NULL,
	`completed` integer DEFAULT 0 NOT NULL
);
