import { db } from "../db";
import { profiles } from "../db/schema";
import { eq, and, gte, lte, asc, desc, sql } from "drizzle-orm";
import type { Context } from "hono";

export async function getProfiles(c: Context) {
  const q = c.req.query();

  let conditions = [];

  if (q.gender) {
    conditions.push(eq(profiles.gender, q.gender));
  }

  if (q.age_group) {
    conditions.push(eq(profiles.age_group, q.age_group));
  }

  if (q.country_id) {
    conditions.push(eq(profiles.country_id, q.country_id));
  }

  if (q.min_age) {
    conditions.push(gte(profiles.age, Number(q.min_age)));
  }

  if (q.max_age) {
    conditions.push(lte(profiles.age, Number(q.max_age)));
  }

  if (q.min_gender_probability) {
    conditions.push(
      gte(profiles.gender_probability, Number(q.min_gender_probability))
    );
  }

  if (q.min_country_probability) {
    conditions.push(
      gte(profiles.country_probability, Number(q.min_country_probability))
    );
  }

  const whereClause = conditions.length ? and(...conditions) : undefined;

  // sorting
  const sortBy = q.sort_by || "created_at";
  const order = q.order === "asc" ? asc : desc;

  const columnMap = {
    age: profiles.age,
    created_at: profiles.created_at,
    gender_probability: profiles.gender_probability
  };

  const orderBy =
    columnMap[sortBy as keyof typeof columnMap] || profiles.created_at;

  // pagination
  const page = Number(q.page || 1);
  const limit = Math.min(Number(q.limit || 10), 50);
  const offset = (page - 1) * limit;

  const data = await db
    .select()
    .from(profiles)
    .where(whereClause)
    .orderBy(order(orderBy))
    .limit(limit)
    .offset(offset);

  // correct total count
  const totalResult = await db
    .select({ count: sql<number>`count(*)` })
    .from(profiles)
    .where(whereClause);

  const total = totalResult[0]?.count ?? 0;

  return c.json({
    status: "success",
    page,
    limit,
    total,
    data
  });
}