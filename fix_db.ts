import { db, client } from "./src/db";
import { sql } from "drizzle-orm";

async function fix() {
  try {
    console.log("Checking tables and schemas...");
    const res = await db.execute(sql`SELECT table_schema, table_name, column_name FROM information_schema.columns WHERE table_name = 'profiles'`);
    console.log("Database Structure:", JSON.stringify(res, null, 2));

    const columns = res.map(r => r.column_name);
    if (!columns.includes("country_name")) {
      console.log("Adding country_name column to public.profiles...");
      await db.execute(sql`ALTER TABLE profiles ADD COLUMN IF NOT EXISTS country_name VARCHAR`);
      console.log("Successfully ran ALTER TABLE");
    } else {
      console.log("country_name column already exists in one of the schemas.");
    }
  } catch (error) {
    console.error("Failed to fix DB:", error);
  } finally {
    await client.end();
  }
}

fix();
