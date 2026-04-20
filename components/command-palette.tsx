"use client";

import { Dialog } from "@base-ui/react/dialog";
import { Command } from "cmdk";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";
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
				aria-label="Open command palette"
				className="inline-flex items-center gap-2 border-2 border-foreground bg-background px-2.5 py-1.5 shadow-[2px_2px_0_var(--foreground)] transition-all duration-150 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
			>
				<Search className="h-3.5 w-3.5" strokeWidth={2.5} />
				<span className="hidden font-heading text-[11px] font-bold uppercase tracking-wide sm:inline">
					Search
				</span>
				<span className="ml-1 hidden rounded-sm border border-foreground/40 bg-muted px-1 font-mono text-[10px] font-bold text-muted-foreground sm:inline">
					⌘K
				</span>
			</button>

			<Dialog.Root open={open} onOpenChange={setOpen}>
				<Dialog.Portal>
					<Dialog.Backdrop className="fixed inset-0 z-50 bg-black/30 transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 supports-backdrop-filter:backdrop-blur-[2px]" />
					<Dialog.Popup className="-translate-x-1/2 data-starting-style:-translate-y-1 data-ending-style:-translate-y-1 fixed top-[15%] left-1/2 z-50 w-[min(34rem,92vw)] border-3 border-foreground bg-background shadow-[6px_6px_0_var(--foreground)] transition-all duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0">
						<Dialog.Title className="sr-only">Command Palette</Dialog.Title>
						<Command label="Command palette">
							<div className="flex items-center gap-2 border-b-3 border-foreground px-4 py-3">
								<Search className="h-4 w-4 shrink-0" strokeWidth={2.5} />
								<Command.Input
									autoFocus
									placeholder="Type to search pages..."
									className="flex-1 bg-transparent font-heading text-sm uppercase tracking-wide outline-none placeholder:normal-case placeholder:tracking-normal placeholder:text-muted-foreground"
								/>
								<kbd className="rounded-sm border border-foreground/40 bg-muted px-1.5 py-0.5 font-mono text-[10px] font-bold text-muted-foreground">
									ESC
								</kbd>
							</div>
							<Command.List className="max-h-[60vh] overflow-y-auto py-2">
								<Command.Empty className="py-10 text-center font-heading text-sm uppercase tracking-[0.2em] text-muted-foreground">
									— No Results —
								</Command.Empty>
								{navGroups.map((group) => {
									const groupLabel = t(group.labelKey);
									const Icon = group.icon;
									return (
										<Command.Group
											key={group.labelKey}
											heading={groupLabel}
											className="px-2 pb-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:font-heading [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:font-bold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.2em] [&_[cmdk-group-heading]]:text-muted-foreground"
										>
											{group.items.map((item) => {
												const display = item.label ?? item.title;
												return (
													<Command.Item
														key={item.href}
														value={`${display} ${item.href}`}
														keywords={[
															display,
															item.title,
															groupLabel,
															group.labelKey,
														]}
														onSelect={() => handleSelect(item.href)}
														className="flex cursor-pointer items-center gap-3 rounded-sm border-l-[3px] border-transparent px-3 py-2 data-[selected=true]:border-brutal-orange data-[selected=true]:bg-brutal-yellow"
													>
														<Icon
															className="h-4 w-4 shrink-0 text-muted-foreground"
															strokeWidth={2.2}
														/>
														<span className="font-heading text-sm font-semibold">
															{display}
														</span>
														<span className="ml-auto truncate font-mono text-[10px] text-muted-foreground">
															{item.href}
														</span>
													</Command.Item>
												);
											})}
										</Command.Group>
									);
								})}
							</Command.List>
							<div className="flex items-center justify-between gap-3 border-t-3 border-foreground bg-brutal-yellow/50 px-4 py-2 font-mono text-[10px] text-foreground/80">
								<div className="flex items-center gap-3">
									<span className="inline-flex items-center gap-1">
										<kbd className="rounded-sm border border-foreground/40 bg-background px-1.5">
											↑↓
										</kbd>
										Navigate
									</span>
									<span className="inline-flex items-center gap-1">
										<kbd className="rounded-sm border border-foreground/40 bg-background px-1.5">
											⏎
										</kbd>
										Open
									</span>
								</div>
								<span className="inline-flex items-center gap-1">
									<kbd className="rounded-sm border border-foreground/40 bg-background px-1.5">
										?
									</kbd>
									Shortcuts
								</span>
							</div>
						</Command>
					</Dialog.Popup>
				</Dialog.Portal>
			</Dialog.Root>
		</>
	);
}
