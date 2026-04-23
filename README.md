# Backend Wizards - Stage 2: Intelligence Query Engine

This is the official backend implementation for Insighta Labs, providing advanced demographic intelligence with filtering, sorting, pagination, and a natural language search engine.

# Natural Language Parsing Approach

The natural language search endpoint (`/api/profiles/search?q=...`) uses a **Regular Expression-based keyword extraction** approach to accurately map plain English queries into structured filters.

### Supported Keywords and Mappings:
- **Gender**: `male`, `males`, `female`, `females`. (Uses word-boundary detection to distinguish between male/female).
- **Age Ranges**:
    - `young`: Maps to `min_age=16` and `max_age=24`.
    - `above 30`: Maps to `min_age=30`.
    - `above 17`: Maps to `min_age=17`.
    - `below 20`: Maps to `max_age=20`.
- **Age Groups**: `teenager`, `teenagers`, `adult`, `adults`.
- **Countries**: `nigeria` (NG), `kenya` (KE), `angola` (AO).

### Logic Implementation:
The parser converts the query to lowercase and applies specific Regex patterns. It handles plural forms and ensures that "female" is not accidentally matched as "male".

# Limitations

- **Syntactic Strictness**: The parser requires specific phrases like "above 30" or "below 20". It does not handle semantic variations like "older than 30".
- **Geographic Scope**: Only a predefined set of countries (Nigeria, Kenya, Angola) are currently mapped in the natural language engine.
- **Complex Logic**: It currently combines filters with AND logic and does not support OR conditions or nested queries.
- **Ambiguity**: If both male and female are explicitly requested for a single gender field, the filter is omitted to allow all results.

---

## Technical Details
- **Stack**: Bun, Hono, Drizzle ORM, Postgres.js
- **Database**: Neon (PostgreSQL)
- **CORS**: Enabled for all origins (*)
- **Data**: Seeded with 2026 profiles as per requirements.
