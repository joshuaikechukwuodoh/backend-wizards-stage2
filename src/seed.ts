import { db, client } from "./db";
import { profiles } from "./db/schema";
import { uuidv7 } from "uuidv7";
import data from "./data.json";

async function seed() {
  for (const p of data) {
    await db
      .insert(profiles)
      .values({
        id: uuidv7(),
        name: p.name,
        gender: p.gender,
        gender_probability: p.gender_probability,
        age: p.age,
        age_group: p.age_group,
        country_id: p.country_id,
        country_name: p.country_name,
        country_probability: p.country_probability
      })
      .onConflictDoNothing();
  }
  console.log("Seeding complete!");
  await client.end();
}

seed();