"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

const allPages = [
  // Routing
  { href: "/routing", label: "Routing" },
  { href: "/routing/basics", label: "Basics" },
  { href: "/routing/dynamic/hello-world", label: "Dynamic Routes" },
  { href: "/routing/catch-all/a/b/c", label: "Catch-all" },
  { href: "/routing/groups", label: "Route Groups" },
  { href: "/routing/parallel", label: "Parallel Routes" },
  { href: "/routing/intercepting", label: "Intercepting" },
  { href: "/routing/not-found", label: "Error Pages" },
  { href: "/routing/search-params", label: "Search Params" },
  // Data
  { href: "/data", label: "Data" },
  { href: "/data/fetching", label: "Server Fetch" },
  { href: "/data/client-fetch", label: "Client Fetch" },
  { href: "/data/caching", label: "Caching" },
  { href: "/data/revalidation", label: "Revalidation" },
  { href: "/data/server-actions", label: "Server Actions" },
  { href: "/data/streaming", label: "Streaming" },
  { href: "/data/forms", label: "Forms" },
  // Rendering
  { href: "/rendering", label: "Rendering" },
  { href: "/rendering/server-components", label: "Server Components" },
  { href: "/rendering/client-components", label: "Client Components" },
  { href: "/rendering/composition", label: "Composition" },
  { href: "/rendering/state", label: "State (Zustand)" },
  { href: "/rendering/url-state", label: "URL State (nuqs)" },
  { href: "/rendering/lazy-loading", label: "Lazy Loading" },
  // UI
  { href: "/ui", label: "UI & Assets" },
  { href: "/ui/css", label: "CSS" },
  { href: "/ui/images", label: "Images" },
  { href: "/ui/fonts", label: "Fonts" },
  { href: "/ui/metadata", label: "Metadata & SEO" },
  { href: "/ui/animations", label: "Animations" },
  { href: "/ui/themes", label: "Themes" },
  // Advanced
  { href: "/advanced", label: "Advanced" },
  { href: "/advanced/middleware", label: "Middleware" },
  { href: "/advanced/i18n", label: "i18n" },
  { href: "/advanced/auth", label: "Auth" },
  { href: "/advanced/draft-mode", label: "Draft Mode" },
  { href: "/advanced/edge-runtime", label: "Edge Runtime" },
  { href: "/advanced/error-handling", label: "Error Handling" },
  { href: "/advanced/mdx", label: "MDX" },
  { href: "/advanced/instrumentation", label: "Instrumentation" },
  { href: "/advanced/pwa", label: "PWA" },
  { href: "/advanced/dates", label: "Dates" },
  // Config
  { href: "/config", label: "Config" },
  { href: "/config/env", label: "Env Variables" },
  { href: "/config/redirects", label: "Redirects" },
  { href: "/config/headers", label: "Headers & CSP" },
  { href: "/config/bundle", label: "Bundle Analyzer" },
  // API
  { href: "/api-docs/hello", label: "API Hello" },
  { href: "/api-docs/posts", label: "API Posts" },
  { href: "/api-docs/og", label: "API OG Image" },
  { href: "/api-docs/stream", label: "API Streaming" },
];

export function PageNav() {
  const pathname = usePathname();
  const currentIndex = allPages.findIndex((p) => p.href === pathname);

  if (currentIndex === -1) return null;

  const prev = currentIndex > 0 ? allPages[currentIndex - 1] : null;
  const next =
    currentIndex < allPages.length - 1 ? allPages[currentIndex + 1] : null;

  return (
    <nav className="flex items-center justify-between border-t pt-6 mt-10">
      {prev ? (
        <Link
          href={prev.href}
          className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          <div>
            <div className="text-xs text-muted-foreground">Previous</div>
            <div className="font-medium">{prev.label}</div>
          </div>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={next.href}
          className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors text-right"
        >
          <div>
            <div className="text-xs text-muted-foreground">Next</div>
            <div className="font-medium">{next.label}</div>
          </div>
          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}
