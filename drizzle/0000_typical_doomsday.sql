-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE "profiles" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"gender" varchar,
	"gender_probability" real,
	"age" integer,
	"age_group" varchar,
	"country_id" varchar(2),
	"country_name" varchar,
	"country_probability" real,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "profiles_name_unique" UNIQUE("name")
);

*/