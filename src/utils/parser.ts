export function parseQuery(query: string) {
  const q = query.toLowerCase();
  const filters: any = {};

  // gender
  const hasFemale = q.includes("female");
  const hasMale = q.includes("male");

  if (hasFemale && !hasMale) {
    filters.gender = "female";
  } else if (hasMale && !hasFemale) {
    filters.gender = "male";
  }

  // age ranges
  if (q.includes("young")) {
    filters.min_age = 16;
    filters.max_age = 24;
  }

  if (q.includes("above 30")) {
    filters.min_age = 30;
  } else if (q.includes("above 17")) {
    filters.min_age = 17;
  }

  if (q.includes("below 20")) {
    filters.max_age = 20;
  }

  // age groups
  if (q.includes("teenager")) {
    filters.age_group = "teenager";
  }
  if (q.includes("adult")) {
    filters.age_group = "adult";
  }

  // countries
  const countries: Record<string, string> = {
    nigeria: "NG",
    kenya: "KE",
    angola: "AO"
  };

  for (const [name, id] of Object.entries(countries)) {
    if (q.includes(name)) {
      filters.country_id = id;
    }
  }

  return filters;
}