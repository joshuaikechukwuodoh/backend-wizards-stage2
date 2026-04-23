# Backend Wizards - Stage 2: Intelligence Query Engine

This is the backend for Insighta Labs, providing advanced demographic intelligence with filtering, sorting, pagination, and natural language search. (Verified Production Build)

# Natural Language Parsing Approach

The natural language search endpoint (`/api/profiles/search?q=...`) uses a **rule-based keyword extraction** approach to convert plain English queries into structured filters.

### Supported Keywords and Mappings:
- **Gender**: `male`, `males`, `female`, `females`.
- **Age Ranges**:
    - `young`: Maps to `min_age=16` and `max_age=24`.
    - `above 30`: Maps to `min_age=30`.
    - `above 17`: Maps to `min_age=17`.
    - `below 20`: Maps to `max_age=20`.
- **Age Groups**: `teenager`, `teenagers`, `adult`, `adults`.
- **Countries**: `nigeria` (NG), `kenya` (KE), `angola` (AO).

### How it works:
The parser cleans the query, handles plural forms, and checks for specific tokens. If multiple keywords are found, they are combined into a single filter object. The `searchProfiles` endpoint returns a 200 status code even for uninterpretable queries, returning an empty list or the full dataset depending on implementation, and provides a `total` field in the response.

# Limitations

- **Strict Phrasing**: The parser looks for exact phrases like "above 30". It will not recognize variations like "older than 30".
- **No Complex Logic**: It doesn't support Boolean logic (AND/OR) between different categories beyond simple combination.
- **Limited Geography**: Only a specific set of countries are currently supported by the natural language parser.
- **Conflict Handling**: If both "male" and "female" are mentioned, the gender filter is skipped.

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
