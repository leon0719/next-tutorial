import { AppSidebar } from "@/components/app-sidebar";
import { CommandPalette } from "@/components/command-palette";
import { CustomCursor } from "@/components/custom-cursor";
import { DynamicBreadcrumb } from "@/components/dynamic-breadcrumb";
import { FocusModeController } from "@/components/focus-mode-controller";
import { KeyboardShortcuts } from "@/components/keyboard-shortcuts";
import { ScrollProgress } from "@/components/scroll-progress";
import { SectionFlashController } from "@/components/section-flash-controller";
import { Toaster } from "@/components/toaster";
import { Separator } from "@/components/ui/separator";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { VisitTracker } from "@/components/visit-tracker";

export default function LearnLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<ScrollProgress />
				<header
					data-focus-hide
					className="sticky top-0 z-10 flex h-14 shrink-0 items-center gap-2 border-b-3 border-foreground bg-background px-4"
				>
					<SidebarTrigger className="-ml-1" />
					<Separator orientation="vertical" className="mr-2 h-4" />
					<DynamicBreadcrumb />
					<div className="ml-auto flex items-center gap-2">
						<CommandPalette />
					</div>
				</header>
				<main className="flex-1 p-6 sm:p-8">{children}</main>
			</SidebarInset>
			<VisitTracker />
			<KeyboardShortcuts />
			<FocusModeController />
			<SectionFlashController />
			<Toaster />
			<CustomCursor />
		</SidebarProvider>
	);
}
