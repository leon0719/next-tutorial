import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { highlight } from "@/lib/shiki";

interface DemoPageProps {
	title: string;
	description: string;
	children: React.ReactNode;
}

export function DemoPage({ title, description, children }: DemoPageProps) {
	return (
		<div className="space-y-8">
			<div>
				<h1 className="text-3xl font-bold">{title}</h1>
				<p className="mt-2 text-lg text-muted-foreground">{description}</p>
			</div>
			{children}
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
			<div>
				<h2 className="text-xl font-semibold">{title}</h2>
				{description && (
					<p className="mt-1 text-sm text-muted-foreground">{description}</p>
				)}
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
	// shiki generates trusted HTML from hardcoded code strings (not user input)
	// All code examples are developer-authored static content in source files
	const html = await highlight(children.trim(), language || "text");

	return (
		<div className="rounded-lg border overflow-hidden">
			{filename && (
				<div className="flex items-center gap-2 border-b bg-zinc-950 dark:bg-zinc-900 px-4 py-2">
					<span className="text-xs text-zinc-400">{filename}</span>
					{language && (
						<Badge variant="outline" className="text-[10px] text-zinc-500 border-zinc-700">
							{language}
						</Badge>
					)}
				</div>
			)}
			<div
				className="overflow-x-auto text-sm leading-relaxed [&_pre]:p-4 [&_pre]:m-0 [&_.shiki]:bg-transparent"
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
		<div className="rounded-lg border bg-muted/50 p-4">
			<pre className="text-sm leading-relaxed font-mono">{children}</pre>
		</div>
	);
}

interface DemoBoxProps {
	title?: string;
	children: React.ReactNode;
}

export function DemoBox({ title, children }: DemoBoxProps) {
	return (
		<Card>
			{title && (
				<CardHeader className="pb-3">
					<CardTitle className="text-base">{title}</CardTitle>
				</CardHeader>
			)}
			<CardContent className={title ? "" : "pt-6"}>{children}</CardContent>
		</Card>
	);
}
