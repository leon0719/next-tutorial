import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface PrefsState {
	customCursor: boolean;
	toggleCustomCursor: () => void;
	setCustomCursor: (on: boolean) => void;
}

export const usePrefs = create<PrefsState>()(
	persist(
		(set) => ({
			customCursor: false,
			toggleCustomCursor: () => set((s) => ({ customCursor: !s.customCursor })),
			setCustomCursor: (on) => set({ customCursor: on }),
		}),
		{
			name: "next-tutorial:prefs:v1",
			storage: createJSONStorage(() => localStorage),
			version: 1,
		},
	),
);
