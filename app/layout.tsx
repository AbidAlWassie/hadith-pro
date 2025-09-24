import { ThemeProvider } from "@/components/theme-provider";
import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import { Noto_Sans_Arabic } from "next/font/google";
import type React from "react";
import { Suspense } from "react";

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hadith Study - Islamic Research Platform",
  description:
    "Modern platform for studying and researching hadith with authentic sources and scholarly references",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script src="https://js.puter.com/v2/"></script>
      </head>
      <body
        className={`font-sans antialiased ${GeistSans.variable} ${GeistMono.variable} ${notoSansArabic.variable}`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Suspense fallback={null}>{children}</Suspense>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
