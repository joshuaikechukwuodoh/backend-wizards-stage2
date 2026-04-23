import { db, client } from "./db";
import { profiles } from "./db/schema";
import { sql } from "drizzle-orm";

async function checkColumns() {
  try {
    const res = await db.execute(sql`SELECT column_name FROM information_schema.columns WHERE table_name = 'profiles'`);
    console.log("Columns in 'profiles' table:", res.map(r => r.column_name));
  } catch (error) {
    console.error("Error checking columns:", error);
  } finally {
    await client.end();
  }
}

checkColumns();
