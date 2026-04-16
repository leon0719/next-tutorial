"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { DemoBox } from "@/components/demo-page";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function NavDemo() {
	const router = useRouter();
	const pathname = usePathname();
	const t = useTranslations("routing.basics");

	return (
		<DemoBox title="Interactive Navigation Demo">
			<div className="space-y-4">
				<div className="flex items-center gap-2">
					<span className="text-sm text-muted-foreground">
						{t("currentPath")}
					</span>
					<Badge variant="outline" className="font-mono">
						{pathname}
					</Badge>
				</div>

				<div className="grid gap-3 sm:grid-cols-2">
					<div className="space-y-2">
						<h4 className="text-sm font-medium">{t("linkComponent")}</h4>
						<div className="flex flex-wrap gap-2">
							<Link
								href="/routing"
								className="inline-flex h-8 items-center justify-center rounded-md border border-input bg-background px-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
							>
								{t("routingOverview")}
							</Link>
							<Link
								href="/routing/dynamic/hello-world"
								className="inline-flex h-8 items-center justify-center rounded-md border border-input bg-background px-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
							>
								{t("dynamicRoute")}
							</Link>
						</div>
					</div>

					<div className="space-y-2">
						<h4 className="text-sm font-medium">{t("routerMethods")}</h4>
						<div className="flex flex-wrap gap-2">
							<Button
								variant="secondary"
								size="sm"
								onClick={() => router.push("/routing/basics")}
							>
								{t("pushSame")}
							</Button>
							<Button
								variant="secondary"
								size="sm"
								onClick={() => router.back()}
							>
								{t("back")}
							</Button>
							<Button
								variant="secondary"
								size="sm"
								onClick={() => router.refresh()}
							>
								{t("refresh")}
							</Button>
						</div>
					</div>
				</div>
			</div>
		</DemoBox>
	);
}
