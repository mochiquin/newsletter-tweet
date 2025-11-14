import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Newsletter to Tweet | AI-Powered Tweet Generator",
  description: "Convert your Newsletter articles into Twitter-ready tweets using AI. Works with Substack, Beehiiv, Medium, and more.",
  keywords: ["newsletter", "twitter", "tweets", "AI", "substack", "social media", "content marketing"],
  authors: [{ name: "Newsletter Tweet" }],
  openGraph: {
    title: "Newsletter to Tweet",
    description: "Turn your Newsletter articles into Twitter-ready tweets with AI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Newsletter to Tweet",
    description: "Turn your Newsletter articles into Twitter-ready tweets with AI",
  },
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
