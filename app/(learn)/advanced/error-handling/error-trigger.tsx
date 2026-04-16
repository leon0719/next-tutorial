"use client";

import { useState } from "react";
import { DemoBox } from "@/components/demo-page";
import { Button } from "@/components/ui/button";

export function ErrorTrigger() {
	const [shouldError, setShouldError] = useState(false);

	if (shouldError) {
		throw new Error(
			"This is a demo error! The error.tsx boundary caught this.",
		);
	}

	return (
		<DemoBox title="Trigger Error Boundary">
			<p className="text-sm text-muted-foreground mb-3">
				Click the button to throw an error. The error.tsx boundary will catch it
				and show recovery UI.
			</p>
			<Button
				variant="destructive"
				size="sm"
				onClick={() => setShouldError(true)}
			>
				Throw Error
			</Button>
		</DemoBox>
	);
}
