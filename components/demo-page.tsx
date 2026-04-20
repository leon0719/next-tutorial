import { ExternalLink } from "lucide-react";
import { CopyButton } from "@/components/copy-button";
import { OnThisPage } from "@/components/on-this-page";
import { PageNav } from "@/components/page-nav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NEXT_DOCS_BASE, NEXT_VERSION } from "@/lib/pages";
import { highlight } from "@/lib/shiki";

interface DemoPageProps {
	title: string;
	description: string;
	docs?: string;
	children: React.ReactNode;
}

export function DemoPage({
	title,
	description,
	docs,
	children,
}: DemoPageProps) {
	const docsHref = docs
		? docs.startsWith("http")
			? docs
			: `${NEXT_DOCS_BASE}${docs.startsWith("/") ? docs : `/${docs}`}`
		: null;

	return (
		<div className="mx-auto w-full max-w-7xl">
			<div className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_17rem]">
				<div className="min-w-0 space-y-10">
					<div className="space-y-3">
						<h1
							className="animate-fade-up font-heading text-3xl sm:text-4xl font-bold uppercase tracking-tight"
							style={{ animationDelay: "0ms" }}
						>
							{title}
						</h1>
						<p
							className="animate-fade-up text-base text-muted-foreground leading-relaxed max-w-3xl"
							style={{ animationDelay: "70ms" }}
						>
							{description}
						</p>
						<div
							className="animate-fade-up h-1 w-20 bg-brutal-orange"
							style={{ animationDelay: "140ms" }}
						/>
						<div
							className="animate-fade-up flex flex-wrap items-center gap-2 pt-1"
							style={{ animationDelay: "210ms" }}
						>
							<span className="inline-flex items-center gap-1.5 border-2 border-foreground bg-brutal-yellow px-2 py-0.5 font-mono text-[11px] font-bold tracking-wide text-foreground">
								<span className="inline-block h-1.5 w-1.5 bg-foreground" />
								NEXT {NEXT_VERSION}
							</span>
							{docsHref && (
								<a
									href={docsHref}
									target="_blank"
									rel="noopener noreferrer"
									className="group inline-flex items-center gap-1.5 border-2 border-foreground bg-background px-2 py-0.5 font-heading text-[11px] font-bold uppercase tracking-[0.15em] text-foreground transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-brutal-cyan hover:shadow-[2px_2px_0_var(--foreground)]"
								>
									Next.js Docs
									<ExternalLink className="h-2.5 w-2.5" strokeWidth={3} />
								</a>
							)}
						</div>
					</div>
					<div
						className="animate-fade-up space-y-8"
						style={{ animationDelay: "280ms" }}
					>
						{children}
					</div>
					<PageNav />
				</div>
				<OnThisPage />
			</div>
		</div>
	);
}

interface SectionProps {
	title: string;
	description?: string;
	children: React.ReactNode;
}

function slugify(s: string): string {
	return (
		s
			.trim()
			.toLowerCase()
			.replace(/\s+/g, "-")
			.replace(/[^\p{L}\p{N}-]/gu, "") || "section"
	);
}

export function Section({ title, description, children }: SectionProps) {
	const id = slugify(title);
	return (
		<section
			id={id}
			data-toc-section=""
			data-toc-title={title}
			className="scroll-mt-20 space-y-4"
		>
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
		<div className="group relative rounded-sm border-3 border-foreground shadow-[4px_4px_0_var(--foreground)] overflow-hidden transition-all duration-150 hover:shadow-[2px_2px_0_var(--foreground)] hover:translate-x-0.5 hover:translate-y-0.5">
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
