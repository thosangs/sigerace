import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header";
import { ThemeProvider } from "@/components/theme-providers";
import Footer from "@/components/layout/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	metadataBase: new URL("https://racephoria.pages.dev"),
	title: "X-Anda | Racephoria",
	verification: {
		google: process.env.GOOGLE_VERIFICATION || "",
	},
	description:
		"X-Anda | Racephoria by Pushbike Lampung Academy ~ Lampung Selatan",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html suppressHydrationWarning lang="en">
			<body className={inter.className}>
				<ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
					<div className="flex flex-col min-h-screen bg-gradient-to-b from-primary dark:to-primary-foreground to-primary">
						<Header />

						<main className="flex-1 flex flex-col items-center p-2">{children}</main>

						<Footer />
					</div>
				</ThemeProvider>
			</body>
		</html>
	);
}
