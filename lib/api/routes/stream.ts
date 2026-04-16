import { Hono } from "hono";
import { streamText } from "hono/streaming";

export const streamRoute = new Hono();

streamRoute.get("/", (c) => {
  return streamText(c, async (stream) => {
    try {
      const messages = [
        "Starting stream...",
        "Loading Next.js features...",
        "Routing ✓",
        "Rendering ✓",
        "Data Fetching ✓",
        "Caching ✓",
        "Middleware ✓",
        "All features loaded!",
        "Stream complete. 🎉",
      ];

      for (const message of messages) {
        await stream.writeln(message);
        await stream.sleep(500);
      }
    } catch (e) {
      console.error("Stream error:", e);
      await stream.writeln("Stream error occurred.");
    }
  });
});
