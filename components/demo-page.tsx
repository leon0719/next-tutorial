import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { CopyButton } from "@/components/copy-button";
import { PageNav } from "@/components/page-nav";
import { highlight } from "@/lib/shiki";

interface DemoPageProps {
	title: string;
	description: string;
	children: React.ReactNode;
}

export function DemoPage({ title, description, children }: DemoPageProps) {
	return (
		<div className="space-y-10">
			<div className="space-y-2">
				<h1 className="font-heading text-3xl sm:text-4xl tracking-tight">{title}</h1>
				<p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">{description}</p>
			</div>
			<div className="space-y-8">{children}</div>
			<PageNav />
		</div>
	);
}

interface SectionProps {
	title: string;
	description?: string;
	children: React.ReactNode;
}

export function Section({ title, description, children }: SectionProps) {
	return (
		<section className="space-y-4">
			<div className="flex items-start gap-3">
				<div className="mt-1.5 h-5 w-1 rounded-full bg-accent-warm shrink-0" />
				<div>
					<h2 className="text-xl font-semibold">{title}</h2>
					{description && (
						<p className="mt-1 text-sm text-muted-foreground">{description}</p>
					)}
				</div>
			</div>
			{children}
		</section>
	);
}

interface CodeBlockProps {
	filename?: string;
	language?: string;
	children: string;
}

export async function CodeBlock({ filename, language, children }: CodeBlockProps) {
	const code = children.trim();
	// shiki generates trusted HTML from hardcoded code strings (not user input)
	// All code examples are developer-authored static content in source files
	const html = await highlight(code, language || "text");

	return (
		<div className="group relative rounded-lg border overflow-hidden">
			{filename && (
				<div className="flex items-center justify-between border-b bg-zinc-950 dark:bg-zinc-900 px-4 py-2">
					<div className="flex items-center gap-2">
						<span className="text-xs text-zinc-400">{filename}</span>
						{language && (
							<Badge variant="outline" className="text-[10px] text-zinc-500 border-zinc-700">
								{language}
							</Badge>
						)}
					</div>
					<CopyButton text={code} />
				</div>
			)}
			{!filename && (
				<div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
					<CopyButton text={code} />
				</div>
			)}
			<div
				className="overflow-x-auto text-sm leading-relaxed [&_pre]:p-4 [&_pre]:m-0 [&_.shiki]:bg-transparent"
				// shiki output is trusted - generated from developer-authored static code examples
				dangerouslySetInnerHTML={{ __html: html }}
			/>
		</div>
	);
}

interface FileTreeProps {
	children: string;
}

export function FileTree({ children }: FileTreeProps) {
	return (
		<div className="rounded-lg border bg-muted/30 p-4 pl-5 border-l-2 border-l-accent-warm/50">
			<pre className="text-sm leading-relaxed font-mono text-muted-foreground">{children}</pre>
		</div>
	);
}

interface DemoBoxProps {
	title?: string;
	children: React.ReactNode;
}

export function DemoBox({ title, children }: DemoBoxProps) {
	return (
		<Card className="transition-colors hover:border-accent-warm/20">
			{title && (
				<CardHeader className="pb-3">
					<CardTitle className="text-base">{title}</CardTitle>
				</CardHeader>
			)}
			<CardContent className={title ? "" : "pt-6"}>{children}</CardContent>
		</Card>
	);
}
