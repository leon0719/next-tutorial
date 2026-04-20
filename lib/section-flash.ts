export function flashSection(id: string) {
	if (typeof document === "undefined") return;
	const el = document.getElementById(id);
	if (!el) return;
	el.classList.remove("section-flash");
	// trigger reflow so the animation restarts if already flashing
	void el.offsetWidth;
	el.classList.add("section-flash");
}
