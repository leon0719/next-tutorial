"use client";

import { useState } from "react";
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
			{ title: "Search Params", href: "/routing/search-params" },
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
			{ title: "Forms", href: "/data/forms" },
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
			{ title: "URL State (nuqs)", href: "/rendering/url-state" },
			{ title: "Lazy Loading", href: "/rendering/lazy-loading" },
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
	const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() => {
		const initial: Record<string, boolean> = {};
		for (const group of navGroups) {
			initial[group.labelKey] = isGroupActive(group, pathname);
		}
		return initial;
	});

	return (
		<Sidebar>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton size="lg" render={<Link href="/" />} className="rounded-sm">
							<Home className="h-5 w-5" />
							<div className="flex flex-col gap-0.5 leading-none">
								<span className="font-heading font-bold uppercase tracking-wide text-sm">Next.js Learning Hub</span>
								<span className="text-xs text-muted-foreground font-mono">v16.2.4</span>
							</div>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>

			<SidebarContent>
				{navGroups.map((group) => {
					const active = isGroupActive(group, pathname);
					const isOpen = openGroups[group.labelKey] || active;
					return (
						<Collapsible.Root
							key={group.labelKey}
							open={isOpen}
							onOpenChange={(open) =>
								setOpenGroups((prev) => ({ ...prev, [group.labelKey]: open }))
							}
						>
							<SidebarGroup>
								<Collapsible.Trigger
									nativeButton={false}
									className="group/collapsible cursor-pointer"
									render={
										<SidebarGroupLabel className="font-heading uppercase tracking-wider text-xs font-bold">
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
														className={pathname === item.href ? "font-bold bg-brutal-orange text-white rounded-sm" : "rounded-sm hover:bg-foreground hover:text-background transition-colors duration-150"}
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

			<SidebarFooter className="border-t-3 border-foreground">
				<div className="flex items-center justify-between px-2">
					<LocaleSwitcher />
					<ThemeToggle />
				</div>
			</SidebarFooter>

			<SidebarRail />
		</Sidebar>
	);
}
