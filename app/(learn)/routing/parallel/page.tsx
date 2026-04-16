import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ParallelMainPage() {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-base">Main Content</CardTitle>
			</CardHeader>
			<CardContent>
				<p className="text-sm text-muted-foreground">
					This is the <code className="bg-muted px-1 rounded">children</code>{" "}
					slot — the default page.tsx content. The layout renders this alongside
					the @analytics and @dashboard slots simultaneously.
				</p>
			</CardContent>
		</Card>
	);
}
