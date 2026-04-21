import { pgTable, uuid, varchar, integer, real, timestamp } from "drizzle-orm/pg-core";

export const profiles = pgTable("profiles", {
  id: uuid("id").primaryKey(),
  name: varchar("name").unique().notNull(),
  gender: varchar("gender"),
  gender_probability: real("gender_probability"),
  age: integer("age"),
  age_group: varchar("age_group"),
  country_id: varchar("country_id", { length: 2 }),
  country_name: varchar("country_name"),
  country_probability: real("country_probability"),
  created_at: timestamp("created_at").defaultNow()
});