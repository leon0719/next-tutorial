import { CategoryOverview } from "@/components/category-overview";

const demos = [
	{
		title: "CSS",
		description:
			"CSS Modules, Tailwind CSS, global styles — styling strategies in Next.js.",
		href: "/ui/css",
		status: "coming-soon" as const,
	},
	{
		title: "Images",
		description:
			"next/image component — automatic optimization, lazy loading, responsive images.",
		href: "/ui/images",
		status: "coming-soon" as const,
	},
	{
		title: "Fonts",
		description:
			"next/font — Google Fonts and local fonts with zero layout shift.",
		href: "/ui/fonts",
		status: "coming-soon" as const,
	},
	{
		title: "Metadata & SEO",
		description:
			"Static and dynamic metadata, Open Graph images, sitemap, robots.txt.",
		href: "/ui/metadata",
		status: "coming-soon" as const,
	},
	{
		title: "Animations",
		description:
			"Motion library and View Transitions API for smooth page transitions.",
		href: "/ui/animations",
		status: "coming-soon" as const,
	},
	{
		title: "Themes",
		description:
			"Dark/Light mode with next-themes — system preference and manual toggle.",
		href: "/ui/themes",
		status: "coming-soon" as const,
	},
];

export default function UIPage() {
	return (
		<CategoryOverview
			title="UI & Assets"
			description="Next.js provides built-in optimizations for images, fonts, and CSS. Combined with theming and animations, you can build beautiful, performant UIs."
			demos={demos}
		/>
	);
}
