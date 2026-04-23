# Backend Wizards - Stage 2: Intelligence Query Engine

This is the backend for Insighta Labs, providing advanced demographic intelligence with filtering, sorting, pagination, and natural language search.

## Natural Language Parsing Approach

The natural language search endpoint (`/api/profiles/search?q=...`) uses a **rule-based keyword extraction** approach to convert plain English queries into structured filters.

### Supported Keywords and Mappings:
- **Gender**:
    - `male` (if `female` is not also mentioned)
    - `female` (if `male` is not also mentioned)
- **Age Ranges**:
    - `young`: Maps to `min_age=16` and `max_age=24`.
    - `above 30`: Maps to `min_age=30`.
    - `above 17`: Maps to `min_age=17`.
    - `below 20`: Maps to `max_age=20`.
- **Age Groups**:
    - `teenager`: Maps to `age_group=teenager`.
    - `adult`: Maps to `age_group=adult`.
- **Countries**:
    - `nigeria`: Maps to `country_id=NG`.
    - `kenya`: Maps to `country_id=KE`.
    - `angola`: Maps to `country_id=AO`.

### How it works:
The parser converts the query to lowercase and checks for the presence of these specific tokens. If multiple keywords are found (e.g., "young males from nigeria"), they are combined into a single filter object (e.g., `{ gender: 'male', min_age: 16, max_age: 24, country_id: 'NG' }`).

## Limitations

- **Strict Phrasing**: The parser looks for exact phrases like "above 30". It will not recognize variations like "older than 30" or "30+".
- **No Complex Logic**: It doesn't support Boolean logic (AND/OR) between different categories beyond simple combination.
- **Limited Geography**: Only a specific set of countries (Nigeria, Kenya, Angola) are currently supported by the natural language parser.
- **Conflict Handling**: If both "male" and "female" are mentioned in a query, the gender filter is skipped to avoid ambiguous results.

---

## Setup and Running

To install dependencies:
```bash
bun install
```

To run the development server:
```bash
npm run dev
```

To seed the database with 2026 profiles:
```bash
bun run src/seed.ts
```
