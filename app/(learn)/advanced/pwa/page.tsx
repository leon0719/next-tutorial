import {
	CodeBlock,
	DemoBox,
	DemoPage,
	FileTree,
	Section,
} from "@/components/demo-page";
import { Badge } from "@/components/ui/badge";

export default function PwaPage() {
	return (
		<DemoPage
			title="Progressive Web App (PWA)"
			description="Make your Next.js app installable and offline-capable with web manifests, service workers, and PWA libraries like @serwist/next."
		>
			<Section
				title="What Makes a PWA?"
				description="A Progressive Web App needs three things: a web manifest for installability, a service worker for offline support, and HTTPS."
			>
				<div className="grid gap-3 sm:grid-cols-3">
					<DemoBox title="Web Manifest">
						<p className="text-sm text-muted-foreground">
							JSON file declaring app name, icons, theme color, and display mode
							so the browser can install it.
						</p>
					</DemoBox>
					<DemoBox title="Service Worker">
						<p className="text-sm text-muted-foreground">
							Background script that intercepts network requests, enabling
							offline access and caching strategies.
						</p>
					</DemoBox>
					<DemoBox title="HTTPS">
						<p className="text-sm text-muted-foreground">
							Required for service workers and secure context APIs. Vercel and
							most hosts provide this automatically.
						</p>
					</DemoBox>
				</div>
			</Section>

			<Section title="Web Manifest">
				<p className="text-sm text-muted-foreground mb-3">
					In the App Router, you can generate a manifest using a manifest.ts
					file or place a static manifest.json in the app directory.
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

			<Section title="@serwist/next Setup">
				<p className="text-sm text-muted-foreground mb-3">
					@serwist/next (successor to next-pwa) provides automatic service
					worker generation with Workbox under the hood.
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

			<Section title="Caching Strategies">
				<DemoBox>
					<div className="space-y-3">
						<div className="flex items-start gap-3">
							<Badge variant="secondary" className="mt-0.5 shrink-0">
								Cache First
							</Badge>
							<p className="text-sm text-muted-foreground">
								Serve from cache, fall back to network. Best for static assets
								like images, fonts, and CSS.
							</p>
						</div>
						<div className="flex items-start gap-3">
							<Badge variant="secondary" className="mt-0.5 shrink-0">
								Network First
							</Badge>
							<p className="text-sm text-muted-foreground">
								Try network first, fall back to cache. Best for API responses
								and pages that need fresh data.
							</p>
						</div>
						<div className="flex items-start gap-3">
							<Badge variant="secondary" className="mt-0.5 shrink-0">
								Stale While Revalidate
							</Badge>
							<p className="text-sm text-muted-foreground">
								Serve from cache immediately while fetching an update in the
								background. Balances speed and freshness.
							</p>
						</div>
					</div>
				</DemoBox>
			</Section>

			<Section title="File Structure">
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

			<Section title="Key Points">
				<div className="grid gap-3 sm:grid-cols-2">
					<DemoBox title="Dev vs Production">
						<p className="text-sm text-muted-foreground">
							Service workers are typically disabled in development. Test PWA
							features with a production build using next build && next start.
						</p>
					</DemoBox>
					<DemoBox title="App Shell Pattern">
						<p className="text-sm text-muted-foreground">
							Pre-cache the app shell (layout, navigation) so the app loads
							instantly even offline, then fetch dynamic content.
						</p>
					</DemoBox>
					<DemoBox title="Update Flow">
						<p className="text-sm text-muted-foreground">
							Service workers update in the background. Use skipWaiting and
							clientsClaim for immediate activation, or prompt users to refresh.
						</p>
					</DemoBox>
					<DemoBox title="Lighthouse Audit">
						<p className="text-sm text-muted-foreground">
							Use Chrome DevTools Lighthouse to audit your PWA score. It checks
							manifest, service worker, HTTPS, and offline capability.
						</p>
					</DemoBox>
				</div>
			</Section>
		</DemoPage>
	);
}
