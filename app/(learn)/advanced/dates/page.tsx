import { CodeBlock, DemoBox, DemoPage, Section } from "@/components/demo-page";
import { Badge } from "@/components/ui/badge";
import { DateDemo } from "./date-demo";

export default function DatesPage() {
	return (
		<DemoPage
			title="Date Handling with dayjs"
			description="Lightweight date library (2KB) for formatting, parsing, relative time, and i18n — a modern alternative to Moment.js."
		>
			<Section title="Live Demo">
				<DateDemo />
			</Section>

			<Section
				title="Why dayjs?"
				description="dayjs provides a Moment.js-compatible API at a fraction of the size, with immutable operations and a plugin architecture."
			>
				<div className="grid gap-3 sm:grid-cols-3">
					<DemoBox title="2KB Gzipped">
						<p className="text-sm text-muted-foreground">
							Moment.js is ~70KB. dayjs gives the same API at 2KB. Massive
							bundle size savings for client-side usage.
						</p>
					</DemoBox>
					<DemoBox title="Immutable">
						<p className="text-sm text-muted-foreground">
							All operations return new dayjs objects. No accidental mutation of
							dates unlike the native Date or Moment.js.
						</p>
					</DemoBox>
					<DemoBox title="Plugin System">
						<p className="text-sm text-muted-foreground">
							Only load what you need — relativeTime, timezone, weekday, and 20+
							other plugins available on demand.
						</p>
					</DemoBox>
				</div>
			</Section>

			<Section title="Basic Usage">
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

			<Section title="Relative Time Plugin">
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

			<Section title="i18n / Localization">
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

			<Section title="Server vs Client">
				<DemoBox>
					<div className="space-y-3">
						<div className="flex items-start gap-3">
							<Badge variant="secondary" className="mt-0.5 shrink-0">
								Server
							</Badge>
							<p className="text-sm text-muted-foreground">
								Use dayjs in Server Components for static date formatting. The
								formatted string is sent as HTML — no JS shipped to the client.
							</p>
						</div>
						<div className="flex items-start gap-3">
							<Badge variant="secondary" className="mt-0.5 shrink-0">
								Client
							</Badge>
							<p className="text-sm text-muted-foreground">
								Use dayjs in Client Components for live timestamps, countdowns,
								or user-timezone-aware formatting. The 2KB library is included
								in the client bundle.
							</p>
						</div>
						<div className="flex items-start gap-3">
							<Badge variant="outline" className="mt-0.5 shrink-0">
								Tip
							</Badge>
							<p className="text-sm text-muted-foreground">
								For timezone handling, use the dayjs/plugin/utc and
								dayjs/plugin/timezone plugins. Detect user timezone with
								Intl.DateTimeFormat().resolvedOptions().timeZone.
							</p>
						</div>
					</div>
				</DemoBox>
			</Section>

			<Section title="Comparison with Native Date">
				<div className="grid gap-3 sm:grid-cols-2">
					<DemoBox title="Native Date Pitfalls">
						<p className="text-sm text-muted-foreground">
							Months are 0-indexed (January = 0), no built-in formatting,
							mutable by default, and timezone handling is painful.
						</p>
					</DemoBox>
					<DemoBox title="dayjs Advantages">
						<p className="text-sm text-muted-foreground">
							Consistent API, chainable operations, built-in formatting tokens,
							immutable, and locale support via plugins.
						</p>
					</DemoBox>
				</div>
			</Section>
		</DemoPage>
	);
}
