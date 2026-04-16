import { getTranslations } from "next-intl/server";
import { CodeBlock, DemoBox, DemoPage, Section } from "@/components/demo-page";
import { CounterDemo } from "./counter-demo";
import { FormDemo } from "./form-demo";

export default async function ClientComponentsPage() {
	const t = await getTranslations("rendering.clientComponents");

	return (
		<DemoPage title={t("title")} description={t("description")}>
			<Section
				title={t("sectionInteractiveDemos")}
				description={t("sectionInteractiveDemosDesc")}
			>
				<div className="grid gap-4 md:grid-cols-2">
					<CounterDemo />
					<FormDemo />
				</div>
			</Section>

			<Section title={t("sectionDirective")}>
				<CodeBlock
					filename="components/counter.tsx"
					language="tsx"
				>{`"use client"; // ← This line makes it a Client Component

import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </button>
  );
}

// Without "use client", using useState would cause:
// Error: useState only works in Client Components`}</CodeBlock>
			</Section>

			<Section title={t("sectionWhatTriggers")}>
				<CodeBlock
					filename="needs-use-client.tsx"
					language="tsx"
				>{`// You NEED "use client" when using:

// 1. React hooks
useState, useEffect, useRef, useContext, useReducer...

// 2. Event handlers
onClick, onChange, onSubmit, onKeyDown...

// 3. Browser APIs
window, document, localStorage, navigator...

// 4. Custom hooks that use any of the above
useRouter() (from next/navigation)
usePathname(), useSearchParams()

// You DON'T need it for:
// - Displaying data
// - Fetching on the server
// - Static content`}</CodeBlock>
			</Section>

			<Section title={t("sectionBoundaryEffect")}>
				<p className="text-sm text-muted-foreground mb-3">
					{t("boundaryEffectDesc")}
				</p>
				<CodeBlock filename="boundary.tsx" language="tsx">{`"use client";

// ⚠️ These imports are now ALL in the client bundle:
import { HeavyLibrary } from "heavy-library";  // 50kb!
import { AnotherLib } from "another-lib";       // 30kb!
import { MyComponent } from "./my-component";   // also client now

// 💡 Solution: Keep "use client" as deep as possible
// Only the interactive leaf components should be client
// Parent layout/page can stay as Server Components`}</CodeBlock>
			</Section>

			<Section title={t("sectionKeyPoints")}>
				<div className="grid gap-3 sm:grid-cols-2">
					<DemoBox title={t("keyOptIn")}>
						<p className="text-sm text-muted-foreground">{t("keyOptInDesc")}</p>
					</DemoBox>
					<DemoBox title={t("keyBundleImpact")}>
						<p className="text-sm text-muted-foreground">
							{t("keyBundleImpactDesc")}
						</p>
					</DemoBox>
					<DemoBox title={t("keyPropsSerializable")}>
						<p className="text-sm text-muted-foreground">
							{t("keyPropsSerializableDesc")}
						</p>
					</DemoBox>
					<DemoBox title={t("keyHooksNeedClient")}>
						<p className="text-sm text-muted-foreground">
							{t("keyHooksNeedClientDesc")}
						</p>
					</DemoBox>
				</div>
			</Section>
		</DemoPage>
	);
}
