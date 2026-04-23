import { Hono } from "hono";
import { cors } from "hono/cors";
import { handle } from "hono/vercel";
import { getProfiles } from "./routes/profiles";
import { searchProfiles } from "./routes/search";

const app = new Hono();

app.use("*", cors());

// routes
app.get("/api/profiles", (c) => getProfiles(c));
app.get("/api/profiles/search", (c) => searchProfiles(c));

// Export for Bun
export default {
  port: 3000,
  fetch: app.fetch
};

// Export for Vercel (Node.js)
export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
export const PATCH = handle(app);