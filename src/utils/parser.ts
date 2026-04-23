export function parseQuery(query: string) {
  const q = " " + query.toLowerCase().replace(/[^a-z0-9]/g, " ") + " ";
  const filters: any = {};

  // gender
  if (q.includes(" female ") || q.includes(" females ")) {
    filters.gender = "female";
  } else if (q.includes(" male ") || q.includes(" males ")) {
    filters.gender = "male";
  }

  // Conflict handling
  if ((q.includes(" male ") || q.includes(" males ")) && (q.includes(" female ") || q.includes(" females "))) {
    delete filters.gender;
  }

  // age
  if (q.includes(" young ")) {
    filters.min_age = 16;
    filters.max_age = 24;
  }

  // Check more specific ranges first
  if (q.includes(" above 30 ")) {
    filters.min_age = 30;
  } else if (q.includes(" above 17 ")) {
    filters.min_age = 17;
  }

  if (q.includes(" below 20 ")) {
    filters.max_age = 20;
  }

  // age group
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