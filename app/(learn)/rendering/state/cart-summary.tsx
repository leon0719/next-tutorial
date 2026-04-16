"use client";

import { Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCartStore } from "./store";

export function CartSummary() {
	const items = useCartStore((s) => s.items);
	const removeItem = useCartStore((s) => s.removeItem);
	const clearCart = useCartStore((s) => s.clearCart);
	const totalItems = useCartStore((s) => s.totalItems);
	const totalPrice = useCartStore((s) => s.totalPrice);

	return (
		<Card>
			<CardHeader className="pb-2">
				<div className="flex items-center justify-between">
					<CardTitle className="text-base">Cart</CardTitle>
					<Badge variant="outline" className="text-xs">
						Component B
					</Badge>
				</div>
			</CardHeader>
			<CardContent>
				{items.length === 0 ? (
					<p className="text-sm text-muted-foreground">
						Cart is empty. Add some products!
					</p>
				) : (
					<div className="space-y-3">
						<div className="space-y-2">
							{items.map((item) => (
								<div
									key={item.id}
									className="flex items-center justify-between"
								>
									<div>
										<p className="text-sm">
											{item.name} x{item.quantity}
										</p>
										<p className="text-xs text-muted-foreground">
											${item.price * item.quantity}
										</p>
									</div>
									<Button
										variant="ghost"
										size="icon"
										className="h-7 w-7"
										onClick={() => removeItem(item.id)}
									>
										<Trash2 className="h-3 w-3" />
									</Button>
								</div>
							))}
						</div>
						<div className="border-t pt-2 flex items-center justify-between">
							<div>
								<p className="text-sm font-semibold">Total: ${totalPrice()}</p>
								<p className="text-xs text-muted-foreground">
									{totalItems()} items
								</p>
							</div>
							<Button variant="outline" size="sm" onClick={clearCart}>
								Clear
							</Button>
						</div>
					</div>
				)}
			</CardContent>
		</Card>
	);
}
