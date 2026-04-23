export function parseQuery(query: string) {
  const words = query.toLowerCase().split(/\W+/);
  const filters: any = {};

  // gender - check female first or use whole word matching
  if (words.includes("female") || words.includes("females")) {
    filters.gender = "female";
  } else if (words.includes("male") || words.includes("males")) {
    filters.gender = "male";
  }

  // Conflict: if both are present, remove gender filter
  if ((words.includes("female") || words.includes("females")) && (words.includes("male") || words.includes("males"))) {
    delete filters.gender;
  }

  // age ranges
  if (words.includes("young")) {
    filters.min_age = 16;
    filters.max_age = 24;
  }

  const qStr = " " + query.toLowerCase() + " ";
  if (qStr.includes(" above 30 ")) {
    filters.min_age = 30;
  } else if (qStr.includes(" above 17 ")) {
    filters.min_age = 17;
  }

  if (qStr.includes(" below 20 ")) {
    filters.max_age = 20;
  }

  // age groups
  if (words.includes("teenager") || words.includes("teenagers")) {
    filters.age_group = "teenager";
  }
  if (words.includes("adult") || words.includes("adults")) {
    filters.age_group = "adult";
  }

  // countries
  const countries: Record<string, string> = {
    nigeria: "NG",
    kenya: "KE",
    angola: "AO"
  };

  for (const [name, id] of Object.entries(countries)) {
    if (words.includes(name)) {
      filters.country_id = id;
    }
  }

  return filters;
}