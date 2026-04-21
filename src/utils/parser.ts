export function parseQuery(q: string) {
  q = q.toLowerCase();

  const filters: any = {};

  // gender
  if (q.includes("male") && !q.includes("female")) filters.gender = "male";
  if (q.includes("female") && !q.includes("male")) filters.gender = "female";

  // age
  if (q.includes("young")) {
    filters.min_age = 16;
    filters.max_age = 24;
  }

  if (q.includes("above 30")) filters.min_age = 30;
  if (q.includes("above 17")) filters.min_age = 17;
  if (q.includes("below 20")) filters.max_age = 20;

  // age group
  if (q.includes("teenager")) filters.age_group = "teenager";
  if (q.includes("adult")) filters.age_group = "adult";

  // countries
  const countries: Record<string, string> = {
    nigeria: "NG",
    kenya: "KE",
    angola: "AO"
  };

  for (const c in countries) {
    if (q.includes(c)) {
      filters.country_id = countries[c];
    }
  }

  return filters;
}