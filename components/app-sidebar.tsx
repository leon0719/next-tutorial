"use client";

import { Collapsible } from "@base-ui/react/collapsible";
import { ChevronRight, Home, MousePointer2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
} from "@/components/ui/sidebar";
import { type NavGroup, NEXT_VERSION, navGroups } from "@/lib/pages";
import { usePrefs } from "@/lib/stores/prefs";
import { useProgress } from "@/lib/stores/progress";
import { useStoreHydrated } from "@/lib/stores/use-store-hydrated";
import { cn } from "@/lib/utils";

function isGroupActive(group: NavGroup, pathname: string): boolean {
	return group.items.some((item) => pathname === item.href);
}

export function AppSidebar() {
	const pathname = usePathname();
	const t = useTranslations("nav");
	const hydrated = useStoreHydrated(useProgress);
	const visited = useProgress((s) => s.visited);
	const countVisitedIn = useProgress((s) => s.countVisitedIn);
	const customCursor = usePrefs((s) => s.customCursor);
	const toggleCursor = usePrefs((s) => s.toggleCustomCursor);

	const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() => {
		const initial: Record<string, boolean> = {};
		for (const group of navGroups) {
			initial[group.labelKey] = isGroupActive(group, pathname);
		}
		return initial;
	});

	return (
		<Sidebar>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							size="lg"
							render={<Link href="/" />}
							className="rounded-sm"
						>
							<Home className="h-5 w-5" />
							<div className="flex flex-col gap-0.5 leading-none">
								<span className="font-heading font-bold uppercase tracking-wide text-sm">
									Next.js Learning Hub
								</span>
								<span className="text-xs text-muted-foreground font-mono">
									v{NEXT_VERSION}
								</span>
							</div>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>

			<SidebarContent>
				{navGroups.map((group) => {
					const active = isGroupActive(group, pathname);
					const isOpen = openGroups[group.labelKey] || active;
					const groupHrefs = group.items.map((i) => i.href);
					const groupVisited = hydrated ? countVisitedIn(groupHrefs) : 0;
					const groupComplete = hydrated && groupVisited === group.items.length;
					return (
						<Collapsible.Root
							key={group.labelKey}
							open={isOpen}
							onOpenChange={(open) =>
								setOpenGroups((prev) => ({ ...prev, [group.labelKey]: open }))
							}
						>
							<SidebarGroup>
								<Collapsible.Trigger
									nativeButton={false}
									className="group/collapsible cursor-pointer"
									render={
										<SidebarGroupLabel className="font-heading uppercase tracking-wider text-xs font-bold">
											<group.icon className="mr-2 h-4 w-4" />
											<span className="flex-1">{t(group.labelKey)}</span>
											{hydrated && groupVisited > 0 && (
												<span
													className={cn(
														"mr-1 inline-flex items-center rounded-sm border px-1 font-mono text-[9px] tabular-nums",
														groupComplete
															? "border-foreground bg-brutal-orange text-background"
															: "border-foreground/40 bg-background text-muted-foreground",
													)}
												>
													{groupVisited}/{group.items.length}
												</span>
											)}
											<ChevronRight className="h-4 w-4 transition-transform duration-200 group-data-panel-open/collapsible:rotate-90" />
										</SidebarGroupLabel>
									}
								/>
								<Collapsible.Panel>
									<SidebarGroupContent>
										<SidebarMenu>
											{group.items.map((item) => {
												const isActive = pathname === item.href;
												const isVisited =
													hydrated && Boolean(visited[item.href]);
												return (
													<SidebarMenuItem key={item.href}>
														<SidebarMenuButton
															isActive={isActive}
															render={<Link href={item.href} />}
															className={
																isActive
																	? "font-bold bg-brutal-orange text-white rounded-sm"
																	: "rounded-sm hover:bg-foreground hover:text-background transition-colors duration-150"
															}
														>
															<span className="flex w-full items-center gap-2">
																<span
																	aria-hidden
																	className={cn(
																		"inline-block h-1.5 w-1.5 shrink-0 border transition-colors duration-150",
																		isActive
																			? "border-white bg-white"
																			: isVisited
																				? "border-foreground bg-brutal-orange"
																				: "border-foreground/30 bg-transparent",
																	)}
																/>
																<span className="truncate">{item.title}</span>
															</span>
														</SidebarMenuButton>
													</SidebarMenuItem>
												);
											})}
										</SidebarMenu>
									</SidebarGroupContent>
								</Collapsible.Panel>
							</SidebarGroup>
						</Collapsible.Root>
					);
				})}
			</SidebarContent>

			<SidebarFooter className="border-t-3 border-foreground">
				<div className="flex items-center justify-between gap-1 px-2">
					<LocaleSwitcher />
					<div className="flex items-center gap-1">
						<button
							type="button"
							onClick={toggleCursor}
							aria-label={
								customCursor ? "Disable custom cursor" : "Enable custom cursor"
							}
							aria-pressed={customCursor}
							className={cn(
								"inline-flex h-8 w-8 items-center justify-center border-2 border-foreground transition-all duration-150",
								customCursor
									? "bg-brutal-orange text-background shadow-[2px_2px_0_var(--foreground)]"
									: "bg-background hover:bg-muted",
							)}
						>
							<MousePointer2 className="h-3.5 w-3.5" strokeWidth={2.5} />
						</button>
						<ThemeToggle />
					</div>
				</div>
			</SidebarFooter>

			<SidebarRail />
		</Sidebar>
	);
}
