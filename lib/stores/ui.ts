import type { LucideIcon } from "lucide-react";
import { create } from "zustand";

export type ToastKind = "info" | "success" | "warning";

export interface Toast {
	id: string;
	message: string;
	kind: ToastKind;
	icon?: LucideIcon;
}

interface UIState {
	focusMode: boolean;
	toggleFocusMode: () => void;
	setFocusMode: (on: boolean) => void;

	toasts: Toast[];
	pushToast: (
		toast: Omit<Toast, "id" | "kind"> & { kind?: ToastKind },
	) => string;
	dismissToast: (id: string) => void;
}

export const useUI = create<UIState>((set) => ({
	focusMode: false,
	toggleFocusMode: () => set((s) => ({ focusMode: !s.focusMode })),
	setFocusMode: (on) => set({ focusMode: on }),

	toasts: [],
	pushToast: (input) => {
		const id = `t_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
		const toast: Toast = {
			id,
			message: input.message,
			icon: input.icon,
			kind: input.kind ?? "info",
		};
		set((s) => ({ toasts: [...s.toasts, toast] }));
		return id;
	},
	dismissToast: (id) =>
		set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}));
