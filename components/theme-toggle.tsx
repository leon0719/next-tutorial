"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useUI } from "@/lib/stores/ui";

export function ThemeToggle() {
	const { setTheme, resolvedTheme } = useTheme();
	const pushToast = useUI((s) => s.pushToast);

	const handleToggle = () => {
		const next = resolvedTheme === "dark" ? "light" : "dark";
		setTheme(next);
		pushToast({
			message: next === "dark" ? "Dark mode" : "Light mode",
			kind: "info",
			icon: next === "dark" ? Moon : Sun,
		});
	};

	return (
		<Button variant="ghost" size="icon" onClick={handleToggle}>
			<Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
			<Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
			<span className="sr-only">Toggle theme</span>
		</Button>
	);
}
