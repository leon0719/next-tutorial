import type { LucideIcon } from "lucide-react";
import {
	Database,
	Layers,
	Palette,
	Route,
	Server,
	Settings,
	Zap,
} from "lucide-react";

export interface NavItem {
	title: string;
	href: string;
	label?: string;
}

export interface NavGroup {
	labelKey: string;
	icon: LucideIcon;
	items: NavItem[];
}

export const navGroups: NavGroup[] = [
	{
		labelKey: "routing",
		icon: Route,
		items: [
			{ title: "Overview", label: "Routing", href: "/routing" },
			{ title: "Basics", href: "/routing/basics" },
			{ title: "Dynamic Routes", href: "/routing/dynamic/hello-world" },
			{ title: "Catch-all", href: "/routing/catch-all/a/b/c" },
			{ title: "Route Groups", href: "/routing/groups" },
			{ title: "Parallel Routes", href: "/routing/parallel" },
			{ title: "Intercepting", href: "/routing/intercepting" },
			{ title: "Error Pages", href: "/routing/not-found" },
			{ title: "Search Params", href: "/routing/search-params" },
		],
	},
	{
		labelKey: "data",
		icon: Database,
		items: [
			{ title: "Overview", label: "Data", href: "/data" },
			{ title: "Server Fetch", href: "/data/fetching" },
			{ title: "Client Fetch", href: "/data/client-fetch" },
			{ title: "Caching", href: "/data/caching" },
			{ title: "Revalidation", href: "/data/revalidation" },
			{ title: "Server Actions", href: "/data/server-actions" },
			{ title: "Streaming", href: "/data/streaming" },
			{ title: "Forms", href: "/data/forms" },
		],
	},
	{
		labelKey: "rendering",
		icon: Layers,
		items: [
			{ title: "Overview", label: "Rendering", href: "/rendering" },
			{ title: "Server Components", href: "/rendering/server-components" },
			{ title: "Client Components", href: "/rendering/client-components" },
			{ title: "Composition", href: "/rendering/composition" },
			{ title: "State (Zustand)", href: "/rendering/state" },
			{ title: "URL State (nuqs)", href: "/rendering/url-state" },
			{ title: "Lazy Loading", href: "/rendering/lazy-loading" },
		],
	},
	{
		labelKey: "ui",
		icon: Palette,
		items: [
			{ title: "Overview", label: "UI & Assets", href: "/ui" },
			{ title: "CSS", href: "/ui/css" },
			{ title: "Images", href: "/ui/images" },
			{ title: "Fonts", href: "/ui/fonts" },
			{ title: "Metadata & SEO", href: "/ui/metadata" },
			{ title: "Animations", href: "/ui/animations" },
			{ title: "Themes", href: "/ui/themes" },
		],
	},
	{
		labelKey: "advanced",
		icon: Zap,
		items: [
			{ title: "Overview", label: "Advanced", href: "/advanced" },
			{ title: "Proxy", href: "/advanced/proxy" },
			{ title: "i18n", href: "/advanced/i18n" },
			{ title: "Auth", href: "/advanced/auth" },
			{ title: "Draft Mode", href: "/advanced/draft-mode" },
			{ title: "Edge Runtime", href: "/advanced/edge-runtime" },
			{ title: "Error Handling", href: "/advanced/error-handling" },
			{ title: "MDX", href: "/advanced/mdx" },
			{ title: "Instrumentation", href: "/advanced/instrumentation" },
			{ title: "PWA", href: "/advanced/pwa" },
			{ title: "Dates", href: "/advanced/dates" },
		],
	},
	{
		labelKey: "config",
		icon: Settings,
		items: [
			{ title: "Overview", label: "Config", href: "/config" },
			{ title: "Env Variables", href: "/config/env" },
			{ title: "Redirects", href: "/config/redirects" },
			{ title: "Headers & CSP", href: "/config/headers" },
			{ title: "Bundle Analyzer", href: "/config/bundle" },
		],
	},
	{
		labelKey: "api",
		icon: Server,
		items: [
			{ title: "Hello", label: "API Hello", href: "/api-docs/hello" },
			{ title: "Posts CRUD", label: "API Posts", href: "/api-docs/posts" },
			{ title: "OG Image", label: "API OG Image", href: "/api-docs/og" },
			{ title: "Streaming", label: "API Streaming", href: "/api-docs/stream" },
		],
	},
];

export const allPages: NavItem[] = navGroups.flatMap((g) => g.items);

export const NEXT_VERSION = "16.2.4";
export const NEXT_DOCS_BASE = "https://nextjs.org/docs";
