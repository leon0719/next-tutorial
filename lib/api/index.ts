import { Hono } from "hono";
import { logger } from "hono/logger";
import { helloRoute } from "./routes/hello";
import { ogRoute } from "./routes/og";
import { postsRoute } from "./routes/posts";
import { streamRoute } from "./routes/stream";

const app = new Hono().basePath("/api");

// Global middleware
app.use("*", logger());

// Mount routes
app.route("/hello", helloRoute);
app.route("/posts", postsRoute);
app.route("/og", ogRoute);
app.route("/stream", streamRoute);

export default app;
