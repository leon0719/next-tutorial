const FLASH_CLASS = "section-flash";

export function flashSection(id: string) {
	if (typeof document === "undefined") return;
	const el = document.getElementById(id);
	if (!el) return;
	el.classList.remove(FLASH_CLASS);
	// trigger reflow so the animation restarts if already flashing
	void el.offsetWidth;
	el.classList.add(FLASH_CLASS);
	const onEnd = () => {
		el.classList.remove(FLASH_CLASS);
		el.removeEventListener("animationend", onEnd);
	};
	el.addEventListener("animationend", onEnd);
}
