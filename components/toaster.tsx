"use client";

import { AlertTriangle, CheckCircle2, Info, X } from "lucide-react";
import { useEffect } from "react";
import { type Toast, type ToastKind, useUI } from "@/lib/stores/ui";
import { cn } from "@/lib/utils";

const KIND_STYLES: Record<ToastKind, { bg: string; icon: typeof Info }> = {
	info: { bg: "bg-brutal-cyan", icon: Info },
	success: { bg: "bg-brutal-yellow", icon: CheckCircle2 },
	warning: { bg: "bg-brutal-pink", icon: AlertTriangle },
};

const TOAST_DURATION = 2600;

function ToastItem({ toast }: { toast: Toast }) {
	const dismiss = useUI((s) => s.dismissToast);

	useEffect(() => {
		const timer = window.setTimeout(() => dismiss(toast.id), TOAST_DURATION);
		return () => window.clearTimeout(timer);
	}, [toast.id, dismiss]);

	const kind = KIND_STYLES[toast.kind];
	const Icon = toast.icon ?? kind.icon;

	return (
		<div
			role="status"
			className={cn(
				"pointer-events-auto relative flex min-w-[16rem] max-w-sm items-center gap-3 border-3 border-foreground px-3 py-2.5 shadow-[4px_4px_0_var(--foreground)]",
				"animate-toast-in",
				kind.bg,
			)}
		>
			<span className="flex h-7 w-7 shrink-0 items-center justify-center border-2 border-foreground bg-background">
				<Icon className="h-4 w-4" strokeWidth={2.5} />
			</span>
			<span className="flex-1 font-heading text-[12px] font-bold uppercase leading-snug tracking-wide text-foreground">
				{toast.message}
			</span>
			<button
				type="button"
				onClick={() => dismiss(toast.id)}
				aria-label="Dismiss"
				className="flex h-5 w-5 shrink-0 items-center justify-center border-2 border-foreground bg-background hover:bg-foreground hover:text-background"
			>
				<X className="h-3 w-3" strokeWidth={3} />
			</button>
		</div>
	);
}

export function Toaster() {
	const toasts = useUI((s) => s.toasts);

	if (toasts.length === 0) return null;

	return (
		<div
			aria-live="polite"
			className="pointer-events-none fixed right-5 bottom-5 z-60 flex flex-col-reverse gap-2"
		>
			{toasts.map((t) => (
				<ToastItem key={t.id} toast={t} />
			))}
		</div>
	);
}
