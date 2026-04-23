import { db } from "../db";
import { profiles } from "../db/schema";
import { eq, and, gte, lte, asc, desc, sql } from "drizzle-orm";
import type { Context } from "hono";

export async function getProfiles(c: Context, filters?: any) {
  try {
    const q = filters || c.req.query();

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
      const minAge = Number(q.min_age);
      if (!isNaN(minAge)) {
        conditions.push(gte(profiles.age, minAge));
      }
    }

    if (q.max_age) {
      const maxAge = Number(q.max_age);
      if (!isNaN(maxAge)) {
        conditions.push(lte(profiles.age, maxAge));
      }
    }

    if (q.min_gender_probability) {
      const minProb = Number(q.min_gender_probability);
      if (!isNaN(minProb)) {
        conditions.push(gte(profiles.gender_probability, minProb));
      }
    }

    if (q.min_country_probability) {
      const minProb = Number(q.min_country_probability);
      if (!isNaN(minProb)) {
        conditions.push(gte(profiles.country_probability, minProb));
      }
    }

    const whereClause = conditions.length ? and(...conditions) : undefined;

    // sorting
    const sortBy = q.sort_by || "created_at";
    const order = q.order === "asc" ? asc : desc;

    const columnMap = {
      age: profiles.age,
      created_at: profiles.created_at,
      gender_probability: profiles.gender_probability,
      country_probability: profiles.country_probability
    };

    const orderBy =
      columnMap[sortBy as keyof typeof columnMap] || profiles.created_at;

    // pagination
    let page = Number(q.page || 1);
    if (isNaN(page) || page < 1) page = 1;

    let limit = Number(q.limit || 10);
    if (isNaN(limit) || limit < 1) limit = 10;
    limit = Math.min(limit, 50);

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
      .select({ count: sql<string>`count(*)` })
      .from(profiles)
      .where(whereClause);

    // Ensure count is a number
    const total = Number(totalResult[0]?.count ?? 0);

    return c.json({
      status: "success",
      page,
      limit,
      total,
      data
    });
  } catch (error: any) {
    console.error("Error fetching profiles:", error);
    return c.json(
      {
        status: "error",
        message: "Internal server error",
        error: process.env.NODE_ENV === "development" ? error.message : undefined
      },
      { status: 500 }
    );
  }
}