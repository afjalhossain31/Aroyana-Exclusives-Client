import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from 'next-themes';
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aroyana Exclusives",
  description: "Premium clothing brand for the modern generation.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300`}>
        {/* ThemeProvider পুরো ওয়েবসাইটকে ডার্ক/লাইট মোড কন্ট্রোল করতে সাহায্য করবে */}
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}