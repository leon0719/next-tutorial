"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { Collapsible } from "@base-ui/react/collapsible";
import {
	ChevronRight,
	Database,
	Home,
	Layers,
	Palette,
	Route,
	Server,
	Settings,
	Zap,
} from "lucide-react";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
} from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import { LocaleSwitcher } from "@/components/locale-switcher";
import type { LucideIcon } from "lucide-react";

interface NavItem {
	title: string;
	href: string;
}

interface NavGroup {
	labelKey: string;
	icon: LucideIcon;
	items: NavItem[];
}

const navGroups: NavGroup[] = [
	{
		labelKey: "routing",
		icon: Route,
		items: [
			{ title: "Overview", href: "/routing" },
			{ title: "Basics", href: "/routing/basics" },
			{ title: "Dynamic Routes", href: "/routing/dynamic/hello-world" },
			{ title: "Catch-all", href: "/routing/catch-all/a/b/c" },
			{ title: "Route Groups", href: "/routing/groups" },
			{ title: "Parallel Routes", href: "/routing/parallel" },
			{ title: "Intercepting", href: "/routing/intercepting" },
			{ title: "Error Pages", href: "/routing/not-found" },
		],
	},
	{
		labelKey: "data",
		icon: Database,
		items: [
			{ title: "Overview", href: "/data" },
			{ title: "Server Fetch", href: "/data/fetching" },
			{ title: "Client Fetch", href: "/data/client-fetch" },
			{ title: "Caching", href: "/data/caching" },
			{ title: "Revalidation", href: "/data/revalidation" },
			{ title: "Server Actions", href: "/data/server-actions" },
			{ title: "Streaming", href: "/data/streaming" },
		],
	},
	{
		labelKey: "rendering",
		icon: Layers,
		items: [
			{ title: "Overview", href: "/rendering" },
			{ title: "Server Components", href: "/rendering/server-components" },
			{ title: "Client Components", href: "/rendering/client-components" },
			{ title: "Composition", href: "/rendering/composition" },
			{ title: "State (Zustand)", href: "/rendering/state" },
		],
	},
	{
		labelKey: "ui",
		icon: Palette,
		items: [
			{ title: "Overview", href: "/ui" },
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
			{ title: "Overview", href: "/advanced" },
			{ title: "Middleware", href: "/advanced/middleware" },
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
			{ title: "Overview", href: "/config" },
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
			{ title: "Hello", href: "/api-docs/hello" },
			{ title: "Posts CRUD", href: "/api-docs/posts" },
			{ title: "OG Image", href: "/api-docs/og" },
			{ title: "Streaming", href: "/api-docs/stream" },
		],
	},
];

function isGroupActive(group: NavGroup, pathname: string): boolean {
	return group.items.some((item) => pathname === item.href);
}

export function AppSidebar() {
	const pathname = usePathname();
	const t = useTranslations("nav");

	return (
		<Sidebar>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton size="lg" render={<Link href="/" />}>
							<Home className="h-5 w-5" />
							<div className="flex flex-col gap-0.5 leading-none">
								<span className="font-semibold">Next.js Learning Hub</span>
								<span className="text-xs text-muted-foreground">v16.2.4</span>
							</div>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>

			<SidebarContent>
				{navGroups.map((group) => {
					const active = isGroupActive(group, pathname);
					return (
						<Collapsible.Root key={group.labelKey} defaultOpen={active}>
							<SidebarGroup>
								<Collapsible.Trigger
									className="group/collapsible cursor-pointer"
									render={
										<SidebarGroupLabel>
											<group.icon className="mr-2 h-4 w-4" />
											{t(group.labelKey)}
											<ChevronRight className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[panel-open]/collapsible:rotate-90" />
										</SidebarGroupLabel>
									}
								/>
								<Collapsible.Panel>
									<SidebarGroupContent>
										<SidebarMenu>
											{group.items.map((item) => (
												<SidebarMenuItem key={item.href}>
													<SidebarMenuButton
														isActive={pathname === item.href}
														render={<Link href={item.href} />}
													>
														{item.title}
													</SidebarMenuButton>
												</SidebarMenuItem>
											))}
										</SidebarMenu>
									</SidebarGroupContent>
								</Collapsible.Panel>
							</SidebarGroup>
						</Collapsible.Root>
					);
				})}
			</SidebarContent>

			<SidebarFooter>
				<div className="flex items-center justify-between px-2">
					<LocaleSwitcher />
					<ThemeToggle />
				</div>
			</SidebarFooter>

			<SidebarRail />
		</Sidebar>
	);
}
