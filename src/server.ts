import { Hono } from "hono";
import { cors } from "hono/cors";
import { getProfiles } from "./routes/profiles";
import { searchProfiles } from "./routes/search";

const app = new Hono();

app.use("*", cors());

// routes
app.get("/api/profiles", (c) => getProfiles(c));
app.get("/api/profiles/search", (c) => searchProfiles(c));

export default {
  port: 3000,
  fetch: app.fetch
};