CREATE INDEX `batches_industry` ON `batches` (`industry`);--> statement-breakpoint
CREATE INDEX `materials_industry` ON `materials` (`industry`);--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_sales` (
	`id` text PRIMARY KEY NOT NULL,
	`industry` text NOT NULL,
	`batch` text NOT NULL,
	`customer` text NOT NULL,
	`qty` real NOT NULL,
	`price` real NOT NULL,
	`paid` real NOT NULL,
	`cost` real NOT NULL,
	`created` text NOT NULL,
	CONSTRAINT "payment_bound" CHECK("__new_sales"."paid" >= 0 AND "__new_sales"."paid" <= "__new_sales"."qty" * "__new_sales"."price")
);
--> statement-breakpoint
INSERT INTO `__new_sales`("id", "industry", "batch", "customer", "qty", "price", "paid", "cost", "created") SELECT "id", "industry", "batch", "customer", "qty", "price", "paid", "cost", "created" FROM `sales`;--> statement-breakpoint
DROP TABLE `sales`;--> statement-breakpoint
ALTER TABLE `__new_sales` RENAME TO `sales`;--> statement-breakpoint
PRAGMA foreign_keys=ON;