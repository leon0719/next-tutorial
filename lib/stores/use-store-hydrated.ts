import { useEffect, useState } from "react";

interface PersistedStoreLike {
	persist: {
		hasHydrated: () => boolean;
		onHydrate: (cb: () => void) => () => void;
		onFinishHydration: (cb: () => void) => () => void;
	};
}

export function useStoreHydrated(store: PersistedStoreLike): boolean {
	// Always start as false so SSR output matches first client render.
	// Zustand's persist middleware can finish synchronously in the browser,
	// so reading hasHydrated() during useState init would diverge from SSR.
	const [hydrated, setHydrated] = useState(false);

	useEffect(() => {
		const unsubHydrate = store.persist.onHydrate(() => setHydrated(false));
		const unsubFinish = store.persist.onFinishHydration(() =>
			setHydrated(true),
		);
		setHydrated(store.persist.hasHydrated());
		return () => {
			unsubHydrate();
			unsubFinish();
		};
	}, [store]);

	return hydrated;
}
