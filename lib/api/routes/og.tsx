import { Hono } from "hono";
import { ImageResponse } from "next/og";

export const ogRoute = new Hono();

ogRoute.get("/", (c) => {
  const title = c.req.query("title") || "Next.js Learning Hub";
  const description =
    c.req.query("description") || "Interactive feature showcase";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#09090b",
          color: "#fafafa",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div style={{ fontSize: 64, fontWeight: 700 }}>{title}</div>
          <div style={{ fontSize: 28, color: "#a1a1aa" }}>{description}</div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  ) as unknown as Response;
});
