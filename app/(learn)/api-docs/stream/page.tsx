import { getTranslations } from "next-intl/server";
import { CodeBlock, DemoBox, DemoPage, Section } from "@/components/demo-page";
import { StreamDemo } from "./stream-demo";

export default async function StreamApiPage() {
	const t = await getTranslations("api.stream");

	return (
		<DemoPage title={t("title")} description={t("description")}>
			<Section title={t("liveDemo")} description={t("liveDemoDesc")}>
				<StreamDemo />
			</Section>

			<Section title={t("routeCode")}>
				<CodeBlock
					filename="lib/api/routes/stream.ts"
					language="typescript"
				>{`import { Hono } from "hono";
import { streamText } from "hono/streaming";

export const streamRoute = new Hono();

streamRoute.get("/", (c) => {
  return streamText(c, async (stream) => {
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
  });
});`}</CodeBlock>
			</Section>

			<Section title={t("clientCode")}>
				<CodeBlock filename="stream-demo.tsx" language="tsx">{`"use client";
import { useState } from "react";

export function StreamDemo() {
  const [lines, setLines] = useState<string[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);

  async function startStream() {
    setLines([]);
    setIsStreaming(true);
    const res = await fetch("/api/stream");
    const reader = res.body?.getReader();
    const decoder = new TextDecoder();
    if (!reader) return;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const text = decoder.decode(value);
      const newLines = text.split("\\n").filter(Boolean);
      setLines((prev) => [...prev, ...newLines]);
    }
    setIsStreaming(false);
  }

  // ...render UI with lines
}`}</CodeBlock>
			</Section>

			<Section title={t("keyPoints")}>
				<div className="grid gap-3 sm:grid-cols-2">
					<DemoBox title={t("progressiveUI")}>
						<p className="text-sm text-muted-foreground">
							{t("progressiveUIDesc")}
						</p>
					</DemoBox>
					<DemoBox title={t("honoStream")}>
						<p className="text-sm text-muted-foreground">
							{t("honoStreamDesc")}
						</p>
					</DemoBox>
				</div>
			</Section>
		</DemoPage>
	);
}
