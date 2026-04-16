import { CodeBlock, DemoBox, DemoPage, Section } from "@/components/demo-page";

export default function DraftModePage() {
	return (
		<DemoPage
			title="Draft Mode"
			description="Draft Mode lets you bypass static rendering to preview unpublished content from your CMS. When enabled, pages are rendered dynamically on each request."
		>
			<Section
				title="How It Works"
				description="Draft Mode sets a special cookie that tells Next.js to render pages dynamically instead of serving the static version. This is perfect for CMS preview workflows."
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

			<Section title="Disabling Draft Mode">
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

			<Section title="Reading Draft Mode in Pages">
				<p className="text-sm text-muted-foreground mb-3">
					Check whether draft mode is active in any Server Component to
					conditionally fetch published or draft content.
				</p>
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

			<Section title="CMS Preview Workflow">
				<DemoBox title="Typical Setup">
					<ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
						<li>
							Configure your CMS to generate a preview URL:
							<code className="text-xs bg-muted px-1 py-0.5 rounded ml-1">
								/api/draft?secret=MY_SECRET&slug=/blog/my-post
							</code>
						</li>
						<li>
							The API route validates the secret, calls draftMode().enable(),
							and redirects to the target page.
						</li>
						<li>
							The page detects draft mode and fetches unpublished content from
							the CMS.
						</li>
						<li>
							The editor reviews the preview and can exit by hitting the disable
							endpoint.
						</li>
					</ol>
				</DemoBox>
			</Section>

			<Section title="Key Points">
				<div className="grid gap-3 sm:grid-cols-2">
					<DemoBox title="Cookie-Based">
						<p className="text-sm text-muted-foreground">
							Draft mode uses a special __prerender_bypass cookie. It persists
							across page navigations until explicitly disabled or the cookie
							expires.
						</p>
					</DemoBox>
					<DemoBox title="Security">
						<p className="text-sm text-muted-foreground">
							Always validate a secret token before enabling draft mode. Without
							it, anyone could access unpublished content by hitting your API
							route directly.
						</p>
					</DemoBox>
					<DemoBox title="Dynamic Rendering">
						<p className="text-sm text-muted-foreground">
							When draft mode is enabled, the page is rendered dynamically on
							every request. Static caching is bypassed completely for that
							user.
						</p>
					</DemoBox>
					<DemoBox title="Works with Any CMS">
						<p className="text-sm text-muted-foreground">
							Contentful, Sanity, Strapi, WordPress, or any headless CMS that
							supports preview URLs can integrate with Next.js draft mode.
						</p>
					</DemoBox>
				</div>
			</Section>
		</DemoPage>
	);
}
