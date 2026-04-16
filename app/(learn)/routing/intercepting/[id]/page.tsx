import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { DemoBox, DemoPage, Section } from "@/components/demo-page";
import { Badge } from "@/components/ui/badge";

const photos: Record<
	string,
	{ title: string; color: string; description: string }
> = {
	"1": {
		title: "Mountain Sunrise",
		color: "bg-orange-200 dark:bg-orange-900",
		description: "Golden light breaking over mountain peaks at dawn.",
	},
	"2": {
		title: "Ocean Waves",
		color: "bg-blue-200 dark:bg-blue-900",
		description: "Powerful waves crashing against the rocky coastline.",
	},
	"3": {
		title: "Forest Path",
		color: "bg-green-200 dark:bg-green-900",
		description: "A winding trail through an ancient mossy forest.",
	},
	"4": {
		title: "City Lights",
		color: "bg-purple-200 dark:bg-purple-900",
		description: "Neon reflections on rain-slicked city streets at night.",
	},
	"5": {
		title: "Desert Dunes",
		color: "bg-yellow-200 dark:bg-yellow-900",
		description: "Endless sand dunes sculpted by the desert wind.",
	},
	"6": {
		title: "Snow Peaks",
		color: "bg-slate-200 dark:bg-slate-900",
		description: "Pristine snow-covered peaks against a clear blue sky.",
	},
};

export default async function PhotoDetailPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const t = await getTranslations("routing.intercepting");
	const photo = photos[id] || {
		title: "Unknown Photo",
		color: "bg-muted",
		description: "Photo not found.",
	};

	return (
		<DemoPage title={photo.title} description={t("fullPageView")}>
			<Section title={t("photoDetail")}>
				<div className={`h-64 rounded-lg ${photo.color}`} />
				<div className="mt-4 space-y-2">
					<div className="flex items-center gap-2">
						<Badge variant="outline">ID: {id}</Badge>
						<Badge variant="secondary">Full Page View</Badge>
					</div>
					<p className="text-muted-foreground">{photo.description}</p>
				</div>
			</Section>

			<DemoBox title={t("navigation")}>
				<p className="text-sm text-muted-foreground mb-2">
					{t("navigationDesc")}
				</p>
				<Link
					href="/routing/intercepting"
					className="text-sm underline underline-offset-4 hover:text-foreground text-muted-foreground"
				>
					{t("backToGallery")}
				</Link>
			</DemoBox>
		</DemoPage>
	);
}
