import { getTranslations } from "next-intl/server";
import { CodeBlock, DemoBox, DemoPage, Section } from "@/components/demo-page";
import { AnimationDemo } from "./animation-demo";

export default async function AnimationsPage() {
	const t = await getTranslations("ui.animations");
	return (
		<DemoPage title={t("title")} description={t("description")}>
			<Section title={t("liveDemosTitle")} description={t("liveDemosDesc")}>
				<AnimationDemo />
			</Section>

			<Section title={t("cssTransitionsTitle")}>
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

			<Section title={t("cssKeyframeTitle")}>
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

			<Section title={t("motionLibraryTitle")}>
				<p className="text-sm text-muted-foreground mb-3">
					{t("motionLibraryText")}
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

			<Section title={t("keyPointsTitle")}>
				<div className="grid gap-3 sm:grid-cols-2">
					<DemoBox title={t("cssFirstTitle")}>
						<p className="text-sm text-muted-foreground">{t("cssFirstText")}</p>
					</DemoBox>
					<DemoBox title={t("clientComponentsTitle")}>
						<p className="text-sm text-muted-foreground">
							{t("clientComponentsText")}
						</p>
					</DemoBox>
					<DemoBox title={t("reduceMotionTitle")}>
						<p className="text-sm text-muted-foreground">
							{t("reduceMotionText")}
						</p>
					</DemoBox>
					<DemoBox title={t("layoutAnimationsTitle")}>
						<p className="text-sm text-muted-foreground">
							{t("layoutAnimationsText")}
						</p>
					</DemoBox>
				</div>
			</Section>
		</DemoPage>
	);
}
