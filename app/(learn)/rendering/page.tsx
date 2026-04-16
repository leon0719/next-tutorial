import { CategoryOverview } from "@/components/category-overview";

const demos = [
  { title: "Server Components", description: "React Server Components — render on the server, zero client JS.", href: "/rendering/server-components", status: "coming-soon" as const },
  { title: "Client Components", description: "'use client' directive — interactive components with hooks and events.", href: "/rendering/client-components", status: "coming-soon" as const },
  { title: "Composition", description: "Server wrapping Client pattern — the best of both worlds.", href: "/rendering/composition", status: "coming-soon" as const },
  { title: "State (Zustand)", description: "Cross-component state management with Zustand in a Next.js app.", href: "/rendering/state", status: "coming-soon" as const },
];

export default function RenderingPage() {
  return (
    <CategoryOverview
      title="Rendering"
      description="Next.js supports Server Components (default) and Client Components. Understanding when to use each is key to building performant apps."
      demos={demos}
    />
  );
}
