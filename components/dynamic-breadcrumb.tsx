"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Fragment } from "react";

const labelMap: Record<string, string> = {
  routing: "Routing",
  data: "Data",
  rendering: "Rendering",
  ui: "UI & Assets",
  advanced: "Advanced",
  config: "Config",
  "api-docs": "API",
  basics: "Basics",
  dynamic: "Dynamic Routes",
  "catch-all": "Catch-all",
  groups: "Route Groups",
  parallel: "Parallel Routes",
  intercepting: "Intercepting",
  "not-found": "Error Pages",
  fetching: "Server Fetch",
  "client-fetch": "Client Fetch",
  caching: "Caching",
  revalidation: "Revalidation",
  "server-actions": "Server Actions",
  streaming: "Streaming",
  forms: "Forms",
  "server-components": "Server Components",
  "client-components": "Client Components",
  composition: "Composition",
  state: "State",
  "url-state": "URL State",
  "lazy-loading": "Lazy Loading",
  "search-params": "Search Params",
  css: "CSS",
  images: "Images",
  fonts: "Fonts",
  metadata: "Metadata",
  animations: "Animations",
  themes: "Themes",
  middleware: "Middleware",
  i18n: "i18n",
  auth: "Auth",
  "draft-mode": "Draft Mode",
  "edge-runtime": "Edge Runtime",
  "error-handling": "Error Handling",
  mdx: "MDX",
  instrumentation: "Instrumentation",
  pwa: "PWA",
  dates: "Dates",
  env: "Env Variables",
  redirects: "Redirects",
  headers: "Headers & CSP",
  bundle: "Bundle Analyzer",
  hello: "Hello",
  posts: "Posts CRUD",
  og: "OG Image",
  stream: "Streaming",
};

function getLabel(segment: string): string {
  return (
    labelMap[segment] ||
    segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ")
  );
}

export function DynamicBreadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) return null;

  const items = segments.map((segment, index) => {
    const href = `/${segments.slice(0, index + 1).join("/")}`;
    const isLast = index === segments.length - 1;
    return { label: getLabel(segment), href, isLast };
  });

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((item) => (
          <Fragment key={item.href}>
            <BreadcrumbItem>
              {item.isLast ? (
                <BreadcrumbPage className="font-bold">{item.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink render={<Link href={item.href} />}>
                  {item.label}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {!item.isLast && <BreadcrumbSeparator />}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
