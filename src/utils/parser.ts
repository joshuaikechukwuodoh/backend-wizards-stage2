export function parseQuery(query: string) {
  // Clean query: lowercase and remove special characters
  const cleanQ = query.toLowerCase().replace(/[^a-z0-9]/g, " ");
  const q = " " + cleanQ.replace(/\s+/g, " ") + " ";
  const filters: any = {};

  // gender
  const hasFemale = q.includes(" female ") || q.includes(" females ");
  const hasMale = q.includes(" male ") || q.includes(" males ");

  if (hasFemale && !hasMale) {
    filters.gender = "female";
  } else if (hasMale && !hasFemale) {
    filters.gender = "male";
  }
  // If both are present, gender filter is skipped as per mapping rules

  // age ranges
  if (q.includes(" young ")) {
    filters.min_age = 16;
    filters.max_age = 24;
  }

  // Check most specific ranges first
  if (q.includes(" above 30 ")) {
    filters.min_age = 30;
  } else if (q.includes(" above 17 ")) {
    filters.min_age = 17;
  }

  if (q.includes(" below 20 ")) {
    filters.max_age = 20;
  }

  // age groups
  if (q.includes(" teenager ") || q.includes(" teenagers ")) {
    filters.age_group = "teenager";
  }
  if (q.includes(" adult ") || q.includes(" adults ")) {
    filters.age_group = "adult";
  }

  // countries
  const countries: Record<string, string> = {
    nigeria: "NG",
    kenya: "KE",
    angola: "AO"
  };

  for (const [name, id] of Object.entries(countries)) {
    if (q.includes(` ${name} `)) {
      filters.country_id = id;
    }
  }

  return filters;
}