import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";

// আমরা প্রফেশনাল লুকের জন্য Inter ফন্ট ব্যবহার করছি
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aroyana Exclusives | Premium Clothing",
  description: "Your ultimate destination for premium and exclusive fashion.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}