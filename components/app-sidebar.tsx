"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Route,
  Database,
  Layers,
  Palette,
  Zap,
  Settings,
  Server,
  Home,
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

const navGroups = [
  {
    label: "Routing",
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
    label: "Data",
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
    label: "Rendering",
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
    label: "UI & Assets",
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
    label: "Advanced",
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
    label: "Config",
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
    label: "API (Hono)",
    icon: Server,
    items: [
      { title: "Hello", href: "/api/hello" },
      { title: "Posts CRUD", href: "/api/posts" },
      { title: "OG Image", href: "/api/og" },
      { title: "Streaming", href: "/api/stream" },
    ],
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              render={<Link href="/" />}
            >
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
        {navGroups.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>
              <group.icon className="mr-2 h-4 w-4" />
              {group.label}
            </SidebarGroupLabel>
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
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <div className="flex items-center justify-between px-2">
          <span className="text-xs text-muted-foreground">Theme</span>
          <div className="flex items-center gap-1">
            <LocaleSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
