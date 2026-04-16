"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { DemoBox } from "@/components/demo-page";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function NavDemo() {
	const router = useRouter();
	const pathname = usePathname();

	return (
		<DemoBox title="Interactive Navigation Demo">
			<div className="space-y-4">
				<div className="flex items-center gap-2">
					<span className="text-sm text-muted-foreground">Current path:</span>
					<Badge variant="outline" className="font-mono">
						{pathname}
					</Badge>
				</div>

				<div className="grid gap-3 sm:grid-cols-2">
					<div className="space-y-2">
						<h4 className="text-sm font-medium">Link Component</h4>
						<div className="flex flex-wrap gap-2">
							<Button
								variant="outline"
								size="sm"
								render={<Link href="/routing" />}
							>
								← Routing Overview
							</Button>
							<Button
								variant="outline"
								size="sm"
								render={<Link href="/routing/dynamic/hello-world" />}
							>
								Dynamic Route →
							</Button>
						</div>
					</div>

					<div className="space-y-2">
						<h4 className="text-sm font-medium">useRouter Methods</h4>
						<div className="flex flex-wrap gap-2">
							<Button
								variant="secondary"
								size="sm"
								onClick={() => router.push("/routing/basics")}
							>
								push() (same page)
							</Button>
							<Button
								variant="secondary"
								size="sm"
								onClick={() => router.back()}
							>
								back()
							</Button>
							<Button
								variant="secondary"
								size="sm"
								onClick={() => router.refresh()}
							>
								refresh()
							</Button>
						</div>
					</div>
				</div>
			</div>
		</DemoBox>
	);
}
