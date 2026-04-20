"use client";

import { Trash2 } from "lucide-react";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";

export function DeleteButton({
	onRemove,
}: {
	onRemove: () => void | Promise<void>;
}) {
	const [isPending, startTransition] = useTransition();

	return (
		<Button
			variant="ghost"
			size="icon"
			className="h-7 w-7 shrink-0"
			disabled={isPending}
			onClick={() =>
				startTransition(async () => {
					await onRemove();
				})
			}
		>
			<Trash2 className={`h-3 w-3 ${isPending ? "animate-spin" : ""}`} />
		</Button>
	);
}
