CREATE TABLE `batches` (
	`id` text PRIMARY KEY NOT NULL,
	`industry` text NOT NULL,
	`product` text NOT NULL,
	`code` text NOT NULL,
	`plan` real NOT NULL,
	`good` real DEFAULT 0 NOT NULL,
	`reject` real DEFAULT 0 NOT NULL,
	`remaining` real DEFAULT 0 NOT NULL,
	`status` text DEFAULT 'planned' NOT NULL,
	`stage` integer DEFAULT 0 NOT NULL,
	`responsible` text NOT NULL,
	`due` text NOT NULL,
	`expiry` text DEFAULT '' NOT NULL,
	`consumption` text DEFAULT '[]' NOT NULL,
	`cost` real DEFAULT 0 NOT NULL,
	`note` text DEFAULT '' NOT NULL,
	`created` text NOT NULL,
	CONSTRAINT "goods_nonnegative" CHECK("batches"."remaining" >= -0.000001)
);
--> statement-breakpoint
CREATE TABLE `expenses` (
	`id` text PRIMARY KEY NOT NULL,
	`industry` text NOT NULL,
	`name` text NOT NULL,
	`amount` real NOT NULL,
	`created` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `materials` (
	`id` text PRIMARY KEY NOT NULL,
	`industry` text NOT NULL,
	`name` text NOT NULL,
	`unit` text NOT NULL,
	`qty` real DEFAULT 0 NOT NULL,
	`price` real DEFAULT 0 NOT NULL,
	`minimum` real DEFAULT 0 NOT NULL,
	CONSTRAINT "stock_nonnegative" CHECK("materials"."qty" >= -0.000001)
);
--> statement-breakpoint
CREATE TABLE `operations` (
	`id` text PRIMARY KEY NOT NULL,
	`industry` text NOT NULL,
	`kind` text NOT NULL,
	`description` text NOT NULL,
	`created` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `orders` (
	`id` text PRIMARY KEY NOT NULL,
	`industry` text NOT NULL,
	`customer` text NOT NULL,
	`product` text NOT NULL,
	`qty` real NOT NULL,
	`due` text NOT NULL,
	`note` text DEFAULT '' NOT NULL,
	`status` text DEFAULT 'open' NOT NULL
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` text PRIMARY KEY NOT NULL,
	`industry` text NOT NULL,
	`name` text NOT NULL,
	`unit` text NOT NULL,
	`recipe` text NOT NULL,
	`stages` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `sales` (
	`id` text PRIMARY KEY NOT NULL,
	`industry` text NOT NULL,
	`batch` text NOT NULL,
	`customer` text NOT NULL,
	`qty` real NOT NULL,
	`price` real NOT NULL,
	`paid` real NOT NULL,
	`cost` real NOT NULL,
	`created` text NOT NULL
);
