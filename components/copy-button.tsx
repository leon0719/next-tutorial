"use client";

import { Check, Copy } from "lucide-react";
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { useUI } from "@/lib/stores/ui";

export function CopyButton({ text }: { text: string }) {
	const [copied, setCopied] = useState(false);
	const pushToast = useUI((s) => s.pushToast);

	const handleCopy = useCallback(() => {
		if (!navigator.clipboard) {
			pushToast({ message: "Clipboard unavailable", kind: "warning" });
			return;
		}
		navigator.clipboard
			.writeText(text)
			.then(() => {
				setCopied(true);
				setTimeout(() => setCopied(false), 2000);
				pushToast({ message: "Code copied", kind: "success" });
			})
			.catch(() => {
				pushToast({ message: "Copy failed", kind: "warning" });
			});
	}, [text, pushToast]);

	return (
		<Button
			variant="ghost"
			size="icon"
			className="h-6 w-6 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800"
			onClick={handleCopy}
		>
			{copied ? (
				<Check className="h-3.5 w-3.5" />
			) : (
				<Copy className="h-3.5 w-3.5" />
			)}
		</Button>
	);
}
