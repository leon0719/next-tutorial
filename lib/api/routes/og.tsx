import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { ImageResponse } from "next/og";
import { z } from "zod";

export const ogRoute = new Hono();

const ogQuerySchema = z.object({
	title: z.string().max(100).default("Next.js Learning Hub"),
	description: z.string().max(200).default("Interactive feature showcase"),
});

ogRoute.get("/", zValidator("query", ogQuerySchema), (c) => {
	const { title, description } = c.req.valid("query");

	return new ImageResponse(
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
		</div>,
		{
			width: 1200,
			height: 630,
		},
	) as unknown as Response;
});
