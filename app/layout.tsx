import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header";
import { ThemeProvider } from "@/components/theme-providers";
import Footer from "@/components/layout/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://sigerace.pages.dev"),
  title: "Sigerace 2025 | Championship",
  verification: {
    google: process.env.GOOGLE_VERIFICATION || "",
  },
  description: "Sigerace 2025 | by Pushbike Lampung Academy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system">
          <div className="flex flex-col min-h-screen bg-background dark:bg-background [background:radial-gradient(circle_at_top_left,hsl(var(--background))_0%,hsl(var(--primary)/_0.3)_25%,hsl(var(--accent)/_0.3)_50%,hsl(var(--primary)/_0.3)_75%,hsl(var(--background))_100%)]">
            <Header />

            <main className="flex-1 flex flex-col items-center p-2">
              {children}
            </main>

            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
