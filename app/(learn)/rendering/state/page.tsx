import { getTranslations } from "next-intl/server";
import { CodeBlock, DemoBox, DemoPage, Section } from "@/components/demo-page";
import { CartDemo } from "./cart-demo";
import { CartSummary } from "./cart-summary";

export default async function StatePage() {
	const t = await getTranslations("rendering.state");

	return (
		<DemoPage title={t("title")} description={t("description")}>
			<Section
				title={t("sectionLiveDemo")}
				description={t("sectionLiveDemoDesc")}
			>
				<div className="grid gap-4 md:grid-cols-2">
					<CartDemo />
					<CartSummary />
				</div>
			</Section>

			<Section title={t("sectionCreatingStore")}>
				<CodeBlock
					filename="store.ts"
					language="typescript"
				>{`import { create } from "zustand";

interface CounterStore {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

export const useCounterStore = create<CounterStore>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}));`}</CodeBlock>
			</Section>

			<Section title={t("sectionUsingInComponents")}>
				<CodeBlock
					filename="components/counter.tsx"
					language="tsx"
				>{`"use client";
import { useCounterStore } from "@/store";

export function Counter() {
  // Subscribe to specific state — component re-renders only when count changes
  const count = useCounterStore((s) => s.count);
  const increment = useCounterStore((s) => s.increment);

  return <button onClick={increment}>Count: {count}</button>;
}

// 💡 Zustand tip: Select only what you need
// ✅ const count = useStore((s) => s.count);     // re-renders on count change
// ❌ const store = useStore();                    // re-renders on ANY change`}</CodeBlock>
			</Section>

			<Section title={t("sectionKeyPoints")}>
				<div className="grid gap-3 sm:grid-cols-2">
					<DemoBox title={t("keyNoProvider")}>
						<p className="text-sm text-muted-foreground">
							{t("keyNoProviderDesc")}
						</p>
					</DemoBox>
					<DemoBox title={t("keyClientOnly")}>
						<p className="text-sm text-muted-foreground">
							{t("keyClientOnlyDesc")}
						</p>
					</DemoBox>
					<DemoBox title={t("keySelectiveRerenders")}>
						<p className="text-sm text-muted-foreground">
							{t("keySelectiveRerendersDesc")}
						</p>
					</DemoBox>
					<DemoBox title={t("keyTinyBundle")}>
						<p className="text-sm text-muted-foreground">
							{t("keyTinyBundleDesc")}
						</p>
					</DemoBox>
				</div>
			</Section>
		</DemoPage>
	);
}
