PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_session` (
	`id` integer PRIMARY KEY NOT NULL,
	`user_id` integer
);
--> statement-breakpoint
INSERT INTO `__new_session`("id", "user_id") SELECT "id", "user_id" FROM `session`;--> statement-breakpoint
DROP TABLE `session`;--> statement-breakpoint
ALTER TABLE `__new_session` RENAME TO `session`;--> statement-breakpoint
PRAGMA foreign_keys=ON;