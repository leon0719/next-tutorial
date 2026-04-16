import { CategoryOverview } from "@/components/category-overview";

const demos = [
  { title: "Environment Variables", description: "NEXT_PUBLIC_ prefix, .env files, runtime vs build-time variables.", href: "/config/env", status: "coming-soon" as const },
  { title: "Redirects & Rewrites", description: "URL redirects and rewrites in next.config.ts — routing without code.", href: "/config/redirects", status: "coming-soon" as const },
  { title: "Headers & CSP", description: "Custom HTTP headers and Content Security Policy configuration.", href: "/config/headers", status: "coming-soon" as const },
  { title: "Bundle Analyzer", description: "Visualize your JavaScript bundle — find and fix bloat.", href: "/config/bundle", status: "coming-soon" as const },
];

export default function ConfigPage() {
  return (
    <CategoryOverview
      title="Config"
      description="next.config.ts is the control center for your Next.js app. Learn how to configure environment variables, redirects, headers, and analyze your bundle."
      demos={demos}
    />
  );
}
