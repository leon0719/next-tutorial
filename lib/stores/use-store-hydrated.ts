import { useEffect, useState } from "react";

interface PersistedStoreLike {
	persist: {
		hasHydrated: () => boolean;
		onHydrate: (cb: () => void) => () => void;
		onFinishHydration: (cb: () => void) => () => void;
	};
}

export function useStoreHydrated(store: PersistedStoreLike): boolean {
	const [hydrated, setHydrated] = useState(() => store.persist.hasHydrated());

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
