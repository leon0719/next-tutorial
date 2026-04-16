"use client";

import { Trash2 } from "lucide-react";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { deletePost } from "./actions";

export function DeleteButton({ id }: { id: number }) {
	const [isPending, startTransition] = useTransition();

	return (
		<Button
			variant="ghost"
			size="icon"
			className="h-7 w-7 shrink-0"
			disabled={isPending}
			onClick={() => startTransition(() => deletePost(id))}
		>
			<Trash2 className={`h-3 w-3 ${isPending ? "animate-spin" : ""}`} />
		</Button>
	);
}
