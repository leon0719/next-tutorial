"use client";

import { useRouter } from "next/navigation";
import { DemoBox } from "@/components/demo-page";
import { Button } from "@/components/ui/button";

export function TriggerDemo() {
	const router = useRouter();

	return (
		<DemoBox title="Trigger Error Types">
			<div className="space-y-4">
				<div className="flex flex-wrap gap-3">
					<Button
						variant="outline"
						size="sm"
						onClick={() => router.push("/routing/not-found/trigger-404")}
					>
						Trigger 404 (notFound)
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() => router.push("/routing/not-found/trigger-error")}
					>
						Trigger Error (throw)
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() => router.push("/routing/not-found/normal")}
					>
						Normal Page (no error)
					</Button>
				</div>
				<p className="text-xs text-muted-foreground">
					Each button navigates to a dynamic route that either throws an error
					or calls notFound(). The error is caught by the corresponding file
					convention.
				</p>
			</div>
		</DemoBox>
	);
}
