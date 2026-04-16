import { CodeBlock, DemoBox, DemoPage, Section } from "@/components/demo-page";
import { CartDemo } from "./cart-demo";
import { CartSummary } from "./cart-summary";

export default function StatePage() {
	return (
		<DemoPage
			title="State Management (Zustand)"
			description="Zustand provides lightweight, hook-based state management that works perfectly with Next.js Client Components. No providers needed."
		>
			<Section
				title="Live Demo — Shared Cart State"
				description="Two separate Client Components sharing the same Zustand store. Add items on the left, see them appear on the right."
			>
				<div className="grid gap-4 md:grid-cols-2">
					<CartDemo />
					<CartSummary />
				</div>
			</Section>

			<Section title="Creating a Store">
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

			<Section title="Using in Components">
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

			<Section title="Key Points">
				<div className="grid gap-3 sm:grid-cols-2">
					<DemoBox title="No Provider Needed">
						<p className="text-sm text-muted-foreground">
							Unlike Redux or Context, Zustand stores work without wrapping your
							app in a Provider. Just import and use the hook anywhere.
						</p>
					</DemoBox>
					<DemoBox title="Client Components Only">
						<p className="text-sm text-muted-foreground">
							Zustand uses React hooks, so it only works in Client Components.
							For server data, use Server Components with direct DB access
							instead.
						</p>
					</DemoBox>
					<DemoBox title="Selective Re-renders">
						<p className="text-sm text-muted-foreground">
							Use selectors to subscribe to specific state slices. Components
							only re-render when their selected state changes — great for
							performance.
						</p>
					</DemoBox>
					<DemoBox title="Tiny Bundle">
						<p className="text-sm text-muted-foreground">
							Zustand is ~1KB gzipped. No boilerplate, no reducers, no action
							creators. Define state and actions in one place.
						</p>
					</DemoBox>
				</div>
			</Section>
		</DemoPage>
	);
}
