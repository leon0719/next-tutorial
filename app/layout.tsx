import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { Providers } from "./providers";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

const spaceMono = Space_Mono({
	variable: "--font-space-mono",
	subsets: ["latin"],
	weight: ["400", "700"],
});

export const metadata: Metadata = {
	title: {
		template: "%s · Next.js Learning Hub",
		default: "Next.js Learning Hub",
	},
	description:
		"Interactive Next.js feature showcase — learn every feature with live demos",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const locale = await getLocale();
	const messages = await getMessages();

	return (
		<html
			lang={locale}
			className={`${geistSans.variable} ${geistMono.variable} ${spaceMono.variable}`}
			suppressHydrationWarning
		>
			<body>
				<NextIntlClientProvider messages={messages}>
					<Providers>{children}</Providers>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
