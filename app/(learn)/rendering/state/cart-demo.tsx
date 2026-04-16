"use client";

import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCartStore } from "./store";

const products = [
	{ id: 1, name: "Next.js Handbook", price: 29 },
	{ id: 2, name: "React Patterns", price: 19 },
	{ id: 3, name: "TypeScript Guide", price: 24 },
	{ id: 4, name: "Tailwind Mastery", price: 15 },
];

export function CartDemo() {
	const t = useTranslations("rendering.state");
	const addItem = useCartStore((s) => s.addItem);

	return (
		<Card>
			<CardHeader className="pb-2">
				<div className="flex items-center justify-between">
					<CardTitle className="text-base">{t("productsTitle")}</CardTitle>
					<Badge variant="outline" className="text-xs">
						Component A
					</Badge>
				</div>
			</CardHeader>
			<CardContent>
				<div className="space-y-2">
					{products.map((product) => (
						<div key={product.id} className="flex items-center justify-between">
							<div>
								<p className="text-sm font-medium">{product.name}</p>
								<p className="text-xs text-muted-foreground">
									${product.price}
								</p>
							</div>
							<Button
								variant="outline"
								size="sm"
								onClick={() => addItem(product)}
							>
								<Plus className="h-3 w-3 mr-1" />
								{t("addButton")}
							</Button>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
