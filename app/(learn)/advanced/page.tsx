import { CategoryOverview } from "@/components/category-overview";

const demos = [
  { title: "Middleware", description: "Run code before a request is completed — auth checks, redirects, headers.", href: "/advanced/middleware", status: "coming-soon" as const },
  { title: "i18n", description: "Multi-language support with next-intl — zh-TW and English.", href: "/advanced/i18n", status: "coming-soon" as const },
  { title: "Auth", description: "Authentication patterns — session management and route protection.", href: "/advanced/auth", status: "coming-soon" as const },
  { title: "Draft Mode", description: "Preview unpublished content from your CMS before going live.", href: "/advanced/draft-mode", status: "coming-soon" as const },
  { title: "Edge Runtime", description: "Run server code at the edge — lightweight and globally distributed.", href: "/advanced/edge-runtime", status: "coming-soon" as const },
  { title: "Error Handling", description: "Error boundaries with error.tsx — graceful error recovery.", href: "/advanced/error-handling", status: "coming-soon" as const },
  { title: "MDX", description: "Write JSX in Markdown — interactive documentation and blog posts.", href: "/advanced/mdx", status: "coming-soon" as const },
  { title: "Instrumentation", description: "OpenTelemetry integration — trace and monitor your application.", href: "/advanced/instrumentation", status: "coming-soon" as const },
  { title: "PWA", description: "Progressive Web App features — offline support and installability.", href: "/advanced/pwa", status: "coming-soon" as const },
  { title: "Dates", description: "Date handling with dayjs — formatting, parsing, and i18n.", href: "/advanced/dates", status: "coming-soon" as const },
];

export default function AdvancedPage() {
  return (
    <CategoryOverview
      title="Advanced"
      description="Powerful features for production-grade applications — from middleware and authentication to internationalization and monitoring."
      demos={demos}
    />
  );
}
