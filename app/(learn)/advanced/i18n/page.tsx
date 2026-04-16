import { getTranslations } from "next-intl/server";
import {
	CodeBlock,
	DemoBox,
	DemoPage,
	FileTree,
	Section,
} from "@/components/demo-page";

export default async function I18nPage() {
	const t = await getTranslations("advanced.i18n");
	return (
		<DemoPage title={t("title")} description={t("description")}>
			<Section
				title={t("routingStrategiesTitle")}
				description={t("routingStrategiesDescription")}
			>
				<div className="grid gap-3 sm:grid-cols-2">
					<DemoBox title={t("localePrefixTitle")}>
						<p className="text-sm text-muted-foreground">
							{t("localePrefixDesc")}
						</p>
					</DemoBox>
					<DemoBox title={t("cookieBasedTitle")}>
						<p className="text-sm text-muted-foreground">
							{t("cookieBasedDesc")}
						</p>
					</DemoBox>
				</div>
			</Section>

			<Section title={t("translationFilesTitle")}>
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

			<Section title={t("serverComponentsTitle")}>
				<p className="text-sm text-muted-foreground mb-3">
					{t("serverComponentsDesc")}
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

			<Section title={t("clientComponentsTitle")}>
				<p className="text-sm text-muted-foreground mb-3">
					{t("clientComponentsDesc")}
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

			<Section title={t("providerSetupTitle")}>
				<p className="text-sm text-muted-foreground mb-3">
					{t("providerSetupDesc")}
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

			<Section title={t("keyPointsTitle")}>
				<div className="grid gap-3 sm:grid-cols-2">
					<DemoBox title={t("tryItNowTitle")}>
						<p className="text-sm text-muted-foreground">{t("tryItNowDesc")}</p>
					</DemoBox>
					<DemoBox title={t("typeSafetyTitle")}>
						<p className="text-sm text-muted-foreground">
							{t("typeSafetyDesc")}
						</p>
					</DemoBox>
				</div>
			</Section>
		</DemoPage>
	);
}
