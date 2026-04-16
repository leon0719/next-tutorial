import { getTranslations } from "next-intl/server";
import { CodeBlock, DemoBox, DemoPage, Section } from "@/components/demo-page";

export default async function DraftModePage() {
	const t = await getTranslations("advanced.draftMode");
	return (
		<DemoPage title={t("title")} description={t("description")}>
			<Section
				title={t("howItWorksTitle")}
				description={t("howItWorksDescription")}
			>
				<CodeBlock
					filename="app/api/draft/route.ts"
					language="tsx"
				>{`import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

// Enable draft mode: GET /api/draft?slug=/blog/my-post&secret=MY_SECRET
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')
  const slug = searchParams.get('slug')

  // Validate the secret token (shared with your CMS)
  if (secret !== process.env.DRAFT_SECRET) {
    return new Response('Invalid token', { status: 401 })
  }

  // Enable Draft Mode — sets the __prerender_bypass cookie
  const draft = await draftMode()
  draft.enable()

  // Redirect to the page being previewed
  redirect(slug || '/')
}`}</CodeBlock>
			</Section>

			<Section title={t("disablingTitle")}>
				<CodeBlock
					filename="app/api/draft/disable/route.ts"
					language="tsx"
				>{`import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

export async function GET() {
  const draft = await draftMode()
  draft.disable()
  redirect('/')
}`}</CodeBlock>
			</Section>

			<Section title={t("readingTitle")}>
				<p className="text-sm text-muted-foreground mb-3">{t("readingDesc")}</p>
				<CodeBlock
					filename="app/blog/[slug]/page.tsx"
					language="tsx"
				>{`import { draftMode } from 'next/headers'

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { isEnabled } = await draftMode()
  const { slug } = await params

  // Fetch draft or published content based on mode
  const post = isEnabled
    ? await cms.getPost(slug, { preview: true })
    : await cms.getPost(slug, { preview: false })

  return (
    <article>
      {isEnabled && (
        <div className="bg-yellow-100 p-2 text-sm">
          Draft Mode — <a href="/api/draft/disable">Exit Preview</a>
        </div>
      )}
      <h1>{post.title}</h1>
      <div>{post.content}</div>
    </article>
  )
}`}</CodeBlock>
			</Section>

			<Section title={t("cmsWorkflowTitle")}>
				<DemoBox title={t("typicalSetupTitle")}>
					<ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
						<li>{t("step1")}</li>
						<li>{t("step2")}</li>
						<li>{t("step3")}</li>
						<li>{t("step4")}</li>
					</ol>
				</DemoBox>
			</Section>

			<Section title={t("keyPointsTitle")}>
				<div className="grid gap-3 sm:grid-cols-2">
					<DemoBox title={t("cookieBasedTitle")}>
						<p className="text-sm text-muted-foreground">
							{t("cookieBasedDesc")}
						</p>
					</DemoBox>
					<DemoBox title={t("securityTitle")}>
						<p className="text-sm text-muted-foreground">{t("securityDesc")}</p>
					</DemoBox>
					<DemoBox title={t("dynamicRenderingTitle")}>
						<p className="text-sm text-muted-foreground">
							{t("dynamicRenderingDesc")}
						</p>
					</DemoBox>
					<DemoBox title={t("worksWithAnyCmsTitle")}>
						<p className="text-sm text-muted-foreground">
							{t("worksWithAnyCmsDesc")}
						</p>
					</DemoBox>
				</div>
			</Section>
		</DemoPage>
	);
}
