import { getTranslations } from "next-intl/server";
import { CodeBlock, DemoBox, DemoPage, Section } from "@/components/demo-page";
import { Badge } from "@/components/ui/badge";
import { DateDemo } from "./date-demo";

export default async function DatesPage() {
	const t = await getTranslations("advanced.dates");
	return (
		<DemoPage title={t("title")} description={t("description")}>
			<Section title={t("liveDemoTitle")}>
				<DateDemo />
			</Section>

			<Section
				title={t("whyDayjsTitle")}
				description={t("whyDayjsDescription")}
			>
				<div className="grid gap-3 sm:grid-cols-3">
					<DemoBox title={t("twoKbTitle")}>
						<p className="text-sm text-muted-foreground">{t("twoKbDesc")}</p>
					</DemoBox>
					<DemoBox title={t("immutableTitle")}>
						<p className="text-sm text-muted-foreground">
							{t("immutableDesc")}
						</p>
					</DemoBox>
					<DemoBox title={t("pluginSystemTitle")}>
						<p className="text-sm text-muted-foreground">
							{t("pluginSystemDesc")}
						</p>
					</DemoBox>
				</div>
			</Section>

			<Section title={t("basicUsageTitle")}>
				<CodeBlock
					filename="lib/dates.ts"
					language="tsx"
				>{`import dayjs from 'dayjs'

// Current time
const now = dayjs()

// Parse a date string
const date = dayjs('2025-06-15')

// Format
date.format('YYYY-MM-DD')       // "2025-06-15"
date.format('MMM D, YYYY')      // "Jun 15, 2025"
date.format('dddd')              // "Sunday"

// Manipulation (returns new instance)
date.add(7, 'day')               // 7 days later
date.subtract(1, 'month')        // 1 month earlier
date.startOf('month')            // first day of month
date.endOf('year')               // last moment of year

// Comparison
dayjs('2025-06-15').isBefore('2025-07-01')  // true
dayjs('2025-06-15').isAfter('2025-01-01')   // true
dayjs('2025-06-15').isSame('2025-06-15')    // true`}</CodeBlock>
			</Section>

			<Section title={t("relativeTimeTitle")}>
				<CodeBlock
					filename="lib/relative.ts"
					language="tsx"
				>{`import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

dayjs().fromNow()                          // "a few seconds ago"
dayjs().subtract(3, 'hour').fromNow()      // "3 hours ago"
dayjs().add(2, 'day').fromNow()            // "in 2 days"
dayjs('2024-01-01').toNow()                // "in a year"`}</CodeBlock>
			</Section>

			<Section title={t("i18nTitle")}>
				<CodeBlock
					filename="lib/dates-i18n.ts"
					language="tsx"
				>{`import dayjs from 'dayjs'
import 'dayjs/locale/zh-tw'
import 'dayjs/locale/ja'

// Switch globally
dayjs.locale('zh-tw')
dayjs().format('MMMM DD, dddd')   // "六月 15, 星期日"

// Or per-instance
dayjs().locale('ja').format('MMMM')  // "6月"

// Back to English
dayjs.locale('en')
dayjs().format('MMMM DD, dddd')   // "June 15, Sunday"`}</CodeBlock>
			</Section>

			<Section title={t("serverVsClientTitle")}>
				<DemoBox>
					<div className="space-y-3">
						<div className="flex items-start gap-3">
							<Badge variant="secondary" className="mt-0.5 shrink-0">
								{t("serverBadge")}
							</Badge>
							<p className="text-sm text-muted-foreground">{t("serverDesc")}</p>
						</div>
						<div className="flex items-start gap-3">
							<Badge variant="secondary" className="mt-0.5 shrink-0">
								{t("clientBadge")}
							</Badge>
							<p className="text-sm text-muted-foreground">{t("clientDesc")}</p>
						</div>
						<div className="flex items-start gap-3">
							<Badge variant="outline" className="mt-0.5 shrink-0">
								{t("tipBadge")}
							</Badge>
							<p className="text-sm text-muted-foreground">{t("tipDesc")}</p>
						</div>
					</div>
				</DemoBox>
			</Section>

			<Section title={t("comparisonTitle")}>
				<div className="grid gap-3 sm:grid-cols-2">
					<DemoBox title={t("nativePitfallsTitle")}>
						<p className="text-sm text-muted-foreground">
							{t("nativePitfallsDesc")}
						</p>
					</DemoBox>
					<DemoBox title={t("dayjsAdvantagesTitle")}>
						<p className="text-sm text-muted-foreground">
							{t("dayjsAdvantagesDesc")}
						</p>
					</DemoBox>
				</div>
			</Section>
		</DemoPage>
	);
}
