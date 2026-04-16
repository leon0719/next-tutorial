import { CodeBlock, DemoBox, DemoPage, Section } from "@/components/demo-page";
import { AnimationDemo } from "./animation-demo";

export default function AnimationsPage() {
	return (
		<DemoPage
			title="Animations"
			description="CSS transitions and keyframe animations work great with Next.js. The motion library is also available for more complex animations."
		>
			<Section
				title="Live Demos"
				description="Hover and observe these CSS-powered animations."
			>
				<AnimationDemo />
			</Section>

			<Section title="CSS Transitions">
				<CodeBlock
					filename="component.tsx"
					language="tsx"
				>{`// Tailwind transition utilities
<button className="
  bg-primary text-primary-foreground px-4 py-2 rounded-lg
  transition-all duration-300
  hover:scale-105 hover:shadow-lg
  active:scale-95
">
  Hover me
</button>`}</CodeBlock>
			</Section>

			<Section title="CSS Keyframe Animations">
				<CodeBlock filename="globals.css" language="css">{`@keyframes fade-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fade-in 0.5s ease-out forwards;
}`}</CodeBlock>
				<CodeBlock language="tsx">{`<div className="animate-fade-in">
  Content fades in on mount
</div>`}</CodeBlock>
			</Section>

			<Section title="Motion Library">
				<p className="text-sm text-muted-foreground mb-3">
					The motion library (installed in this project) provides a declarative
					API for complex animations. It must be used in Client Components.
				</p>
				<CodeBlock
					filename="components/animated.tsx"
					language="tsx"
				>{`"use client";
import { motion } from "motion/react";

export function AnimatedCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
    >
      <Card>Animated content</Card>
    </motion.div>
  );
}`}</CodeBlock>
			</Section>

			<Section title="Key Points">
				<div className="grid gap-3 sm:grid-cols-2">
					<DemoBox title="CSS First">
						<p className="text-sm text-muted-foreground">
							Prefer CSS transitions and keyframes for simple animations. They
							work in Server Components and have zero JS overhead.
						</p>
					</DemoBox>
					<DemoBox title="Client Components">
						<p className="text-sm text-muted-foreground">
							Animation libraries like motion require &quot;use client&quot;
							since they use React state and effects internally.
						</p>
					</DemoBox>
					<DemoBox title="Reduce Motion">
						<p className="text-sm text-muted-foreground">
							Always respect prefers-reduced-motion. Use Tailwind&apos;s
							motion-safe: and motion-reduce: variants.
						</p>
					</DemoBox>
					<DemoBox title="Layout Animations">
						<p className="text-sm text-muted-foreground">
							For route transition animations, use CSS view transitions or the
							motion library with layout animations.
						</p>
					</DemoBox>
				</div>
			</Section>
		</DemoPage>
	);
}
