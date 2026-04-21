"use client";

import { Command as CommandPrimitive } from "cmdk";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { navGroups } from "@/lib/pages";

export function CommandPalette() {
	const [open, setOpen] = useState(false);
	const router = useRouter();
	const t = useTranslations("nav");

	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			const cmdK = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k";
			if (!cmdK) return;
			e.preventDefault();
			setOpen((prev) => !prev);
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, []);

	const handleSelect = useCallback(
		(href: string) => {
			setOpen(false);
			router.push(href);
		},
		[router],
	);

	return (
		<>
			<button
				type="button"
				onClick={() => setOpen(true)}
				aria-label={t("commandPalette.openAriaLabel")}
				className="inline-flex items-center gap-2 border-2 border-foreground bg-background px-2.5 py-1.5 shadow-[2px_2px_0_var(--foreground)] transition-all duration-150 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
			>
				<Search className="h-3.5 w-3.5" strokeWidth={2.5} />
				<span className="hidden font-heading text-[11px] font-bold uppercase tracking-wide sm:inline">
					{t("commandPalette.triggerLabel")}
				</span>
				<span className="ml-1 hidden rounded-sm border border-foreground/40 bg-muted px-1 font-mono text-[10px] font-bold text-muted-foreground sm:inline">
					⌘K
				</span>
			</button>

			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent
					className="top-[15%] left-1/2 w-[min(34rem,92vw)] max-w-none -translate-x-1/2 translate-y-0 gap-0 rounded-none border-3 border-foreground bg-background p-0 shadow-[6px_6px_0_var(--foreground)] ring-0"
					showCloseButton={false}
				>
					<DialogHeader className="sr-only">
						<DialogTitle>{t("commandPalette.title")}</DialogTitle>
						<DialogDescription>
							{t("commandPalette.description")}
						</DialogDescription>
					</DialogHeader>
					<Command
						label={t("commandPalette.title")}
						className="rounded-none! bg-transparent p-0"
					>
						<div className="flex items-center gap-2 border-b-3 border-foreground px-4 py-3">
							<Search className="h-4 w-4 shrink-0" strokeWidth={2.5} />
							<CommandPrimitive.Input
								autoFocus
								placeholder={t("commandPalette.placeholder")}
								className="flex-1 bg-transparent font-heading text-sm uppercase tracking-wide outline-none placeholder:text-muted-foreground placeholder:normal-case placeholder:tracking-normal"
							/>
							<kbd className="rounded-sm border border-foreground/40 bg-muted px-1.5 py-0.5 font-mono text-[10px] font-bold text-muted-foreground">
								ESC
							</kbd>
						</div>
						<CommandList className="max-h-[60vh] py-2">
							<CommandEmpty className="py-10 text-center font-heading text-sm uppercase tracking-[0.2em] text-muted-foreground">
								{t("commandPalette.empty")}
							</CommandEmpty>
							{navGroups.map((group) => {
								const groupLabel = t(group.labelKey);
								const Icon = group.icon;
								return (
									<CommandGroup
										key={group.labelKey}
										heading={groupLabel}
										className="px-2 pb-1 **:[[cmdk-group-heading]]:px-2 **:[[cmdk-group-heading]]:py-1.5 **:[[cmdk-group-heading]]:font-heading **:[[cmdk-group-heading]]:text-[10px] **:[[cmdk-group-heading]]:font-bold **:[[cmdk-group-heading]]:uppercase **:[[cmdk-group-heading]]:tracking-[0.2em] **:[[cmdk-group-heading]]:text-muted-foreground"
									>
										{group.items.map((item) => {
											const display = item.label ?? item.title;
											return (
												<CommandItem
													key={item.href}
													value={`${display} ${item.href}`}
													keywords={[
														display,
														item.title,
														groupLabel,
														group.labelKey,
													]}
													onSelect={() => handleSelect(item.href)}
													className="rounded-none! border-l-[3px] border-transparent px-3 py-2 font-heading text-sm font-semibold data-selected:border-brutal-orange data-selected:bg-brutal-yellow data-selected:text-brutal-ink"
												>
													<Icon className="text-muted-foreground" />
													<span>{display}</span>
													<span className="ml-auto truncate font-mono text-[10px] text-muted-foreground">
														{item.href}
													</span>
												</CommandItem>
											);
										})}
									</CommandGroup>
								);
							})}
						</CommandList>
						<div className="flex items-center justify-between gap-3 border-t-3 border-foreground bg-brutal-yellow/50 px-4 py-2 font-mono text-[10px] text-foreground/80">
							<div className="flex items-center gap-3">
								<span className="inline-flex items-center gap-1">
									<kbd className="rounded-sm border border-foreground/40 bg-background px-1.5">
										↑↓
									</kbd>
									{t("commandPalette.hintNavigate")}
								</span>
								<span className="inline-flex items-center gap-1">
									<kbd className="rounded-sm border border-foreground/40 bg-background px-1.5">
										⏎
									</kbd>
									{t("commandPalette.hintOpen")}
								</span>
							</div>
							<span className="inline-flex items-center gap-1">
								<kbd className="rounded-sm border border-foreground/40 bg-background px-1.5">
									?
								</kbd>
								{t("commandPalette.hintShortcuts")}
							</span>
						</div>
					</Command>
				</DialogContent>
			</Dialog>
		</>
	);
}
