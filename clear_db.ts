import { db, client } from "./src/db";
import { profiles } from "./src/db/schema";

async function clear() {
  try {
    await db.delete(profiles);
    console.log("Database cleared!");
  } catch (error) {
    console.error("Clear failed:", error);
  } finally {
    await client.end();
  }
}

clear();
