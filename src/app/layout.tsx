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
      {/* flex এবং flex-col যোগ করা হলো ফুটার নিচে রাখার জন্য */}
      <body 
        className={`${inter.className} flex flex-col min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300`}
        suppressHydrationWarning={true} // <--- ঠিক এই লাইনটি এখানে থাকতে হবে!
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          
          {/* flex-grow যোগ করা হলো যাতে এই অংশটি পুরো ফাঁকা জায়গা নিয়ে নেয় */}
          <main className="flex-grow">
            {children}
          </main>
          
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}