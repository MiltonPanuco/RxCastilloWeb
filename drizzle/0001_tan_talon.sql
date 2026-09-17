CREATE TABLE `contact_inquiries` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`phone` varchar(40) NOT NULL,
	`locality` varchar(80) NOT NULL,
	`service_required` varchar(80) NOT NULL,
	`message` text,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `contact_inquiries_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `coverage_areas` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(80) NOT NULL,
	`state` varchar(40) NOT NULL DEFAULT 'Nayarit',
	`description` text NOT NULL,
	`badge_text` varchar(50) DEFAULT 'Atención a domicilio',
	`display_order` int NOT NULL DEFAULT 0,
	`active` boolean NOT NULL DEFAULT true,
	CONSTRAINT `coverage_areas_id` PRIMARY KEY(`id`),
	CONSTRAINT `coverage_areas_name_unique` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE TABLE `faqs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`question` text NOT NULL,
	`answer` text NOT NULL,
	`display_order` int NOT NULL DEFAULT 0,
	`active` boolean NOT NULL DEFAULT true,
	CONSTRAINT `faqs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `services` (
	`id` int AUTO_INCREMENT NOT NULL,
	`slug` varchar(80) NOT NULL,
	`title` varchar(120) NOT NULL,
	`short_description` text NOT NULL,
	`full_description` text NOT NULL,
	`image_url` text NOT NULL,
	`icon_name` varchar(40) NOT NULL DEFAULT 'Activity',
	`features_json` text NOT NULL,
	`study_types_json` text,
	`display_order` int NOT NULL DEFAULT 0,
	`active` boolean NOT NULL DEFAULT true,
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `services_id` PRIMARY KEY(`id`),
	CONSTRAINT `services_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `site_settings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`business_name` varchar(120) NOT NULL DEFAULT 'RX Castillo Digital',
	`legal_name` varchar(150) DEFAULT 'RX Castillo Digital',
	`primary_slogan` text NOT NULL,
	`secondary_slogan` text NOT NULL,
	`whatsapp_number` varchar(40) DEFAULT '',
	`phone_number` varchar(40) DEFAULT '',
	`email` varchar(120) DEFAULT 'contacto@rxcastillodigital.com',
	`office_address` text NOT NULL,
	`availability_text` varchar(60) NOT NULL DEFAULT '24/7',
	`night_shift_notice` text NOT NULL,
	`pacs_software` varchar(60) DEFAULT 'Eden PACS',
	`facebook_url` text,
	`instagram_url` text,
	`logo_url` text,
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `site_settings_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `statistics` (
	`id` int AUTO_INCREMENT NOT NULL,
	`value` varchar(40) NOT NULL,
	`suffix` varchar(20) DEFAULT '',
	`label` varchar(80) NOT NULL,
	`description` text NOT NULL,
	`display_order` int NOT NULL DEFAULT 0,
	`active` boolean NOT NULL DEFAULT true,
	CONSTRAINT `statistics_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `role` varchar(20) NOT NULL DEFAULT 'admin';