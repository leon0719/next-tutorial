import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { CodeBlock, DemoBox, DemoPage, Section } from "@/components/demo-page";

export default async function ImagesPage() {
	const t = await getTranslations("ui.images");
	return (
		<DemoPage title={t("title")} description={t("description")}>
			<Section title={t("liveExampleTitle")} description={t("liveExampleDesc")}>
				<div className="flex items-center justify-center rounded-lg border bg-muted/30 p-8">
					<Image
						src="/next.svg"
						alt="Next.js Logo"
						width={180}
						height={38}
						priority
						className="dark:invert"
					/>
				</div>
				<CodeBlock
					filename="app/page.tsx"
					language="tsx"
				>{`import Image from "next/image";

<Image
  src="/next.svg"
  alt="Next.js Logo"
  width={180}
  height={38}
  priority
  className="dark:invert"
/>`}</CodeBlock>
			</Section>

			<Section title={t("fillModeTitle")}>
				<p className="text-sm text-muted-foreground mb-3">
					{t("fillModeText")}
				</p>
				<div className="relative h-32 w-full rounded-lg border bg-muted/30 overflow-hidden">
					<Image
						src="/vercel.svg"
						alt="Vercel Logo"
						fill
						className="object-contain p-8 dark:invert"
					/>
				</div>
				<CodeBlock language="tsx">{`<div className="relative h-32 w-full">
  <Image
    src="/vercel.svg"
    alt="Vercel Logo"
    fill
    className="object-contain p-8"
  />
</div>`}</CodeBlock>
			</Section>

			<Section title={t("remoteImagesTitle")}>
				<CodeBlock
					filename="next.config.ts"
					language="typescript"
				>{`const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "example.com",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;`}</CodeBlock>
				<CodeBlock language="tsx">{`<Image
  src="https://example.com/images/photo.jpg"
  alt="Remote image"
  width={800}
  height={600}
  placeholder="blur"
  blurDataURL="data:image/png;base64,..."
/>`}</CodeBlock>
			</Section>

			<Section title={t("keyPointsTitle")}>
				<div className="grid gap-3 sm:grid-cols-2">
					<DemoBox title={t("autoOptimizationTitle")}>
						<p className="text-sm text-muted-foreground">
							{t("autoOptimizationText")}
						</p>
					</DemoBox>
					<DemoBox title={t("lazyLoadingTitle")}>
						<p className="text-sm text-muted-foreground">
							{t("lazyLoadingText")}
						</p>
					</DemoBox>
					<DemoBox title={t("widthHeightTitle")}>
						<p className="text-sm text-muted-foreground">
							{t("widthHeightText")}
						</p>
					</DemoBox>
					<DemoBox title={t("remotePatternsTitle")}>
						<p className="text-sm text-muted-foreground">
							{t("remotePatternsText")}
						</p>
					</DemoBox>
				</div>
			</Section>
		</DemoPage>
	);
}
