"use client";

import { Check, Copy } from "lucide-react";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function CopyButton({ text }: { text: string }) {
	const [copied, setCopied] = useState(false);

	const handleCopy = useCallback(() => {
		if (!navigator.clipboard) {
			toast.warning("Clipboard unavailable");
			return;
		}
		navigator.clipboard
			.writeText(text)
			.then(() => {
				setCopied(true);
				setTimeout(() => setCopied(false), 2000);
				toast.success("Code copied");
			})
			.catch(() => {
				toast.warning("Copy failed");
			});
	}, [text]);

	return (
		<Button
			variant="ghost"
			size="icon"
			className="h-6 w-6 text-current opacity-60 hover:bg-foreground/10 hover:text-current hover:opacity-100"
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
