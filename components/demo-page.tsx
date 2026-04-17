import { CopyButton } from "@/components/copy-button";
import { PageNav } from "@/components/page-nav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { highlight } from "@/lib/shiki";

interface DemoPageProps {
	title: string;
	description: string;
	children: React.ReactNode;
}

export function DemoPage({ title, description, children }: DemoPageProps) {
	return (
		<div className="space-y-10">
			<div className="space-y-3">
				<h1 className="font-heading text-3xl sm:text-4xl font-bold uppercase tracking-tight">
					{title}
				</h1>
				<p className="text-base text-muted-foreground leading-relaxed max-w-3xl">
					{description}
				</p>
				<div className="h-1 w-20 bg-brutal-orange" />
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
				<div className="mt-1 h-6 w-1.5 shrink-0 bg-brutal-orange" />
				<div>
					<h2 className="font-heading text-lg font-bold uppercase tracking-wide">
						{title}
					</h2>
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

export async function CodeBlock({
	filename,
	language,
	children,
}: CodeBlockProps) {
	const code = children.trim();
	// shiki generates trusted HTML from hardcoded code strings (not user input)
	// All code examples are developer-authored static content in source files
	const html = await highlight(code, language || "text");

	return (
		<div className="group relative rounded-sm border-3 border-foreground shadow-[4px_4px_0_var(--foreground)] overflow-hidden transition-all duration-150 hover:shadow-[2px_2px_0_var(--foreground)] hover:translate-x-[2px] hover:translate-y-[2px]">
			{filename && (
				<div className="flex items-center justify-between border-b-3 border-foreground bg-brutal-yellow px-4 py-2">
					<div className="flex items-center gap-2">
						<span className="font-heading text-xs font-bold text-foreground">
							{filename}
						</span>
						{language && (
							<span className="rounded-sm border-2 border-foreground bg-background px-1.5 py-0.5 text-[10px] font-bold text-foreground">
								{language}
							</span>
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
				// biome-ignore lint/security/noDangerouslySetInnerHtml: shiki output is trusted — generated from developer-authored static code strings
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
		<div className="rounded-sm border-3 border-foreground border-l-[6px] border-l-brutal-cyan bg-brutal-yellow/10 p-4 pl-5">
			<pre className="text-sm leading-relaxed font-mono text-foreground/80">
				{children}
			</pre>
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
					<CardTitle className="font-heading text-sm font-bold uppercase tracking-wide">
						{title}
					</CardTitle>
				</CardHeader>
			)}
			<CardContent className={title ? "" : "pt-6"}>{children}</CardContent>
		</Card>
	);
}
