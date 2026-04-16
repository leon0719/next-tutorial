import Image from "next/image";
import { CodeBlock, DemoBox, DemoPage, Section } from "@/components/demo-page";

export default function ImagesPage() {
	return (
		<DemoPage
			title="Image Optimization"
			description="The next/image component extends HTML <img> with automatic optimization, lazy loading, and responsive sizing."
		>
			<Section
				title="Live Example"
				description="The Next.js logo below uses the Image component from next/image."
			>
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

			<Section title="Fill Mode">
				<p className="text-sm text-muted-foreground mb-3">
					Use fill when you don&apos;t know the image dimensions. The parent
					must have relative positioning.
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

			<Section title="Remote Images">
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

			<Section title="Key Points">
				<div className="grid gap-3 sm:grid-cols-2">
					<DemoBox title="Auto Optimization">
						<p className="text-sm text-muted-foreground">
							Images are automatically served in modern formats (WebP/AVIF),
							resized, and cached at the edge.
						</p>
					</DemoBox>
					<DemoBox title="Lazy Loading">
						<p className="text-sm text-muted-foreground">
							Images are lazy loaded by default. Use priority prop for
							above-the-fold images (LCP) to disable lazy loading.
						</p>
					</DemoBox>
					<DemoBox title="Width & Height Required">
						<p className="text-sm text-muted-foreground">
							Always provide width/height to prevent layout shift (CLS). Use
							fill mode when dimensions are unknown.
						</p>
					</DemoBox>
					<DemoBox title="Remote Patterns">
						<p className="text-sm text-muted-foreground">
							External image domains must be explicitly allowed in
							next.config.ts via the remotePatterns configuration.
						</p>
					</DemoBox>
				</div>
			</Section>
		</DemoPage>
	);
}
