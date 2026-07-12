import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer"; // Footer Import করা হলো

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
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <Navbar />
        {/* flex-grow নিশ্চিত করবে যে পেজে কন্টেন্ট কম থাকলেও ফুটার নিচে থাকবে */}
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}