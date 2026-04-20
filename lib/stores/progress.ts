import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface VisitedEntry {
	at: number;
}

interface ProgressState {
	visited: Record<string, VisitedEntry>;
	markVisited: (href: string) => void;
	isVisited: (href: string) => boolean;
	countVisitedIn: (hrefs: string[]) => number;
	getLast: () => { href: string; at: number } | null;
	reset: () => void;
}

export const useProgress = create<ProgressState>()(
	persist(
		(set, get) => ({
			visited: {},
			markVisited: (href) =>
				set((state) => {
					const existing = state.visited[href];
					if (existing && Date.now() - existing.at < 5000) return state;
					return {
						visited: { ...state.visited, [href]: { at: Date.now() } },
					};
				}),
			isVisited: (href) => Boolean(get().visited[href]),
			countVisitedIn: (hrefs) => {
				const v = get().visited;
				return hrefs.reduce((n, href) => (v[href] ? n + 1 : n), 0);
			},
			getLast: () => {
				const entries = Object.entries(get().visited);
				if (entries.length === 0) return null;
				let bestHref = entries[0][0];
				let bestAt = entries[0][1].at;
				for (const [href, { at }] of entries) {
					if (at > bestAt) {
						bestAt = at;
						bestHref = href;
					}
				}
				return { href: bestHref, at: bestAt };
			},
			reset: () => set({ visited: {} }),
		}),
		{
			name: "next-tutorial:progress:v1",
			storage: createJSONStorage(() => localStorage),
			version: 1,
		},
	),
);
