import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Should I Keep It? - OSRS Quest Item Checker",
  description:
    "Check if you should keep or dispose of Old School RuneScape quest items. Instant lookup with detailed reasoning for each item.",
  keywords: [
    "OSRS",
    "Old School RuneScape",
    "quest items",
    "item checker",
    "RuneScape guide",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
