import { Hono } from "hono";

export const helloRoute = new Hono();

helloRoute.get("/", (c) => {
  return c.json({
    message: "Hello from Hono + Next.js!",
    timestamp: new Date().toISOString(),
  });
});
