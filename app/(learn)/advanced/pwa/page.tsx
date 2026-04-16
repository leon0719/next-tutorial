import { getTranslations } from "next-intl/server";
import {
	CodeBlock,
	DemoBox,
	DemoPage,
	FileTree,
	Section,
} from "@/components/demo-page";
import { Badge } from "@/components/ui/badge";

export default async function PwaPage() {
	const t = await getTranslations("advanced.pwa");
	return (
		<DemoPage title={t("title")} description={t("description")}>
			<Section
				title={t("whatMakesPwaTitle")}
				description={t("whatMakesPwaDescription")}
			>
				<div className="grid gap-3 sm:grid-cols-3">
					<DemoBox title={t("webManifestTitle")}>
						<p className="text-sm text-muted-foreground">
							{t("webManifestBoxDesc")}
						</p>
					</DemoBox>
					<DemoBox title={t("serviceWorkerTitle")}>
						<p className="text-sm text-muted-foreground">
							{t("serviceWorkerBoxDesc")}
						</p>
					</DemoBox>
					<DemoBox title={t("httpsTitle")}>
						<p className="text-sm text-muted-foreground">{t("httpsBoxDesc")}</p>
					</DemoBox>
				</div>
			</Section>

			<Section title={t("webManifestSectionTitle")}>
				<p className="text-sm text-muted-foreground mb-3">
					{t("webManifestSectionDesc")}
				</p>
				<CodeBlock
					filename="app/manifest.ts"
					language="tsx"
				>{`import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'My Next.js App',
    short_name: 'MyApp',
    description: 'A progressive web application built with Next.js',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}`}</CodeBlock>
			</Section>

			<Section title={t("serwistSetupTitle")}>
				<p className="text-sm text-muted-foreground mb-3">
					{t("serwistSetupDesc")}
				</p>
				<CodeBlock
					filename="next.config.ts"
					language="tsx"
				>{`import withSerwistInit from '@serwist/next'

const withSerwist = withSerwistInit({
  swSrc: 'app/sw.ts',
  swDest: 'public/sw.js',
})

export default withSerwist({
  // Your existing Next.js config
})`}</CodeBlock>
				<CodeBlock
					filename="app/sw.ts"
					language="tsx"
				>{`import { defaultCache } from '@serwist/next/worker'
import type { PrecacheEntry, SerwistGlobalConfig } from 'serwist'
import { Serwist } from 'serwist'

declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined
  }
}

declare const self: ServiceWorkerGlobalScope

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: defaultCache,
})

serwist.addEventListeners()`}</CodeBlock>
			</Section>

			<Section title={t("cachingStrategiesTitle")}>
				<DemoBox>
					<div className="space-y-3">
						<div className="flex items-start gap-3">
							<Badge variant="secondary" className="mt-0.5 shrink-0">
								{t("cacheFirstBadge")}
							</Badge>
							<p className="text-sm text-muted-foreground">
								{t("cacheFirstDesc")}
							</p>
						</div>
						<div className="flex items-start gap-3">
							<Badge variant="secondary" className="mt-0.5 shrink-0">
								{t("networkFirstBadge")}
							</Badge>
							<p className="text-sm text-muted-foreground">
								{t("networkFirstDesc")}
							</p>
						</div>
						<div className="flex items-start gap-3">
							<Badge variant="secondary" className="mt-0.5 shrink-0">
								{t("staleWhileRevalidateBadge")}
							</Badge>
							<p className="text-sm text-muted-foreground">
								{t("staleWhileRevalidateDesc")}
							</p>
						</div>
					</div>
				</DemoBox>
			</Section>

			<Section title={t("fileStructureTitle")}>
				<FileTree>{`project-root/
├── app/
│   ├── manifest.ts        ← web manifest (installability)
│   ├── sw.ts              ← service worker source
│   └── layout.tsx
├── public/
│   ├── sw.js              ← compiled service worker (generated)
│   ├── icon-192x192.png
│   └── icon-512x512.png
└── next.config.ts         ← @serwist/next plugin`}</FileTree>
			</Section>

			<Section title={t("keyPointsTitle")}>
				<div className="grid gap-3 sm:grid-cols-2">
					<DemoBox title={t("devVsProdTitle")}>
						<p className="text-sm text-muted-foreground">
							{t("devVsProdDesc")}
						</p>
					</DemoBox>
					<DemoBox title={t("appShellTitle")}>
						<p className="text-sm text-muted-foreground">{t("appShellDesc")}</p>
					</DemoBox>
					<DemoBox title={t("updateFlowTitle")}>
						<p className="text-sm text-muted-foreground">
							{t("updateFlowDesc")}
						</p>
					</DemoBox>
					<DemoBox title={t("lighthouseTitle")}>
						<p className="text-sm text-muted-foreground">
							{t("lighthouseDesc")}
						</p>
					</DemoBox>
				</div>
			</Section>
		</DemoPage>
	);
}
