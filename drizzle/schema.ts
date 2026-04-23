import { pgTable, unique, uuid, varchar, real, integer, timestamp } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const profiles = pgTable("profiles", {
	id: uuid().primaryKey().notNull(),
	name: varchar().notNull(),
	gender: varchar(),
	genderProbability: real("gender_probability"),
	age: integer(),
	ageGroup: varchar("age_group"),
	countryId: varchar("country_id", { length: 2 }),
	countryName: varchar("country_name"),
	countryProbability: real("country_probability"),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
}, (table) => [
	unique("profiles_name_unique").on(table.name),
]);
