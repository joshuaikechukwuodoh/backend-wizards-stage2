import { parseQuery } from "../utils/parser";
import { getProfiles } from "./profiles";
import type { Context } from "hono";

export async function searchProfiles(c: Context) {
  const q = c.req.query("q");

  if (!q) {
    return c.json(
      { status: "error", message: "Missing query" },
      { status: 400 }
    );
  }

  const filters = parseQuery(q);

  if (Object.keys(filters).length === 0) {
    return c.json(
      { status: "error", message: "Unable to interpret query" },
      { status: 400 }
    );
  }

  // update context req query with new filters
  Object.entries(filters).forEach(([key, value]) => {
    c.req.query()[key] = String(value);
  });

  return getProfiles(c);
}