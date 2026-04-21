import { create } from "zustand";

interface UIState {
	focusMode: boolean;
	toggleFocusMode: () => void;
	setFocusMode: (on: boolean) => void;
}

export const useUI = create<UIState>((set) => ({
	focusMode: false,
	toggleFocusMode: () => set((s) => ({ focusMode: !s.focusMode })),
	setFocusMode: (on) => set({ focusMode: on }),
}));
