import {
	CodeBlock,
	DemoBox,
	DemoPage,
	FileTree,
	Section,
} from "@/components/demo-page";

export default function I18nPage() {
	return (
		<DemoPage
			title="Internationalization (i18n)"
			description="This project uses next-intl for internationalization with a cookie-based locale strategy. Switch languages using the locale switcher in the sidebar footer."
		>
			<Section
				title="Routing Strategies"
				description="next-intl supports multiple strategies for determining the active locale."
			>
				<div className="grid gap-3 sm:grid-cols-2">
					<DemoBox title="[locale] Prefix (Common)">
						<p className="text-sm text-muted-foreground">
							URLs include the locale: /en/about, /zh-TW/about. Requires a
							[locale] dynamic segment wrapping your routes. Best for SEO and
							shareable localized URLs.
						</p>
					</DemoBox>
					<DemoBox title="Cookie-Based (This Project)">
						<p className="text-sm text-muted-foreground">
							The locale is stored in a cookie. URLs stay clean (/about) and the
							server reads the cookie to determine which translations to load.
							Simpler routing, no URL prefixes needed.
						</p>
					</DemoBox>
				</div>
			</Section>

			<Section title="Translation Files">
				<FileTree>{`messages/
  en.json          # English translations
  zh-TW.json       # Traditional Chinese translations`}</FileTree>
				<CodeBlock filename="messages/en.json" language="json">{`{
  "common": {
    "title": "Next.js Learning Hub",
    "description": "Interactive learning platform"
  },
  "nav": {
    "routing": "Routing",
    "rendering": "Rendering",
    "data": "Data Fetching"
  }
}`}</CodeBlock>
			</Section>

			<Section title="Server Components: getTranslations">
				<p className="text-sm text-muted-foreground mb-3">
					In Server Components, use the async getTranslations function to access
					translations without client-side JavaScript.
				</p>
				<CodeBlock
					filename="app/page.tsx"
					language="tsx"
				>{`import { getTranslations } from 'next-intl/server'

export default async function HomePage() {
  const t = await getTranslations('common')

  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
    </div>
  )
}`}</CodeBlock>
			</Section>

			<Section title="Client Components: useTranslations">
				<p className="text-sm text-muted-foreground mb-3">
					In Client Components, use the useTranslations hook. The component must
					be wrapped by NextIntlClientProvider (set up in providers).
				</p>
				<CodeBlock filename="components/nav.tsx" language="tsx">{`'use client'

import { useTranslations } from 'next-intl'

export function Nav() {
  const t = useTranslations('nav')

  return (
    <nav>
      <a href="/routing">{t('routing')}</a>
      <a href="/rendering">{t('rendering')}</a>
      <a href="/data">{t('data')}</a>
    </nav>
  )
}`}</CodeBlock>
			</Section>

			<Section title="Provider Setup">
				<p className="text-sm text-muted-foreground mb-3">
					The NextIntlClientProvider in the root layout passes messages and
					locale to all client components.
				</p>
				<CodeBlock
					filename="app/layout.tsx"
					language="tsx"
				>{`import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'

export default async function RootLayout({ children }) {
  const locale = await getLocale()
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}`}</CodeBlock>
			</Section>

			<Section title="Key Points">
				<div className="grid gap-3 sm:grid-cols-2">
					<DemoBox title="Try It Now">
						<p className="text-sm text-muted-foreground">
							Use the locale switcher in the sidebar footer to toggle between
							English and Traditional Chinese. Watch the UI update instantly.
						</p>
					</DemoBox>
					<DemoBox title="Type Safety">
						<p className="text-sm text-muted-foreground">
							next-intl supports TypeScript autocompletion for translation keys.
							Define your message types to catch missing translations at build
							time.
						</p>
					</DemoBox>
				</div>
			</Section>
		</DemoPage>
	);
}
