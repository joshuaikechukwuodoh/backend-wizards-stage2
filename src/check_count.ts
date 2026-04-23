import { db, client } from "./db";
import { profiles } from "./db/schema";
import { sql } from "drizzle-orm";

async function checkCount() {
  try {
    const res = await db.select({ count: sql<string>`count(*)` }).from(profiles);
    console.log("Profile Count:", res[0].count);
  } catch (error) {
    console.error("Error checking count:", error);
  } finally {
    await client.end();
  }
}

checkCount();
