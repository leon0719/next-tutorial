import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { CodeBlock, DemoBox, DemoPage, Section } from "@/components/demo-page";

export default async function HelloApiPage() {
	const t = await getTranslations("api.hello");

	return (
		<DemoPage title={t("title")} description={t("description")}>
			<Section title={t("setup")} description={t("setupDesc")}>
				<CodeBlock
					filename="app/(api-demo)/api/[...route]/route.ts"
					language="typescript"
				>{`import { handle } from "hono/vercel";
import app from "@/lib/api";

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);`}</CodeBlock>
			</Section>

			<Section title={t("routeCode")}>
				<CodeBlock
					filename="lib/api/routes/hello.ts"
					language="typescript"
				>{`import { Hono } from "hono";

export const helloRoute = new Hono();

helloRoute.get("/", (c) => {
  return c.json({
    message: "Hello from Hono + Next.js!",
    timestamp: new Date().toISOString(),
  });
});`}</CodeBlock>
			</Section>

			<Section title={t("tryIt")} description={t("tryItDesc")}>
				<DemoBox>
					<Link
						href="/api/hello"
						target="_blank"
						className="inline-flex items-center gap-2 text-sm font-medium text-primary underline-offset-4 hover:underline"
					>
						GET /api/hello →
					</Link>
				</DemoBox>
			</Section>

			<Section title={t("keyPoints")}>
				<div className="grid gap-3 sm:grid-cols-2">
					<DemoBox title={t("honoIntegration")}>
						<p className="text-sm text-muted-foreground">
							{t("honoIntegrationDesc")}
						</p>
					</DemoBox>
					<DemoBox title={t("middleware")}>
						<p className="text-sm text-muted-foreground">
							{t("middlewareDesc")}
						</p>
					</DemoBox>
				</div>
			</Section>
		</DemoPage>
	);
}
