import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: "Career Trade-Offs | Choose your struggles",
  description: "Every career has a price. Choose a career whose price you are willing and able to pay.",
  openGraph: {
    title: "Career Trade-Offs | Choose your struggles",
    description: "Every path demands a sacrifice. Uncover the hidden friction, mental toll, and financial runway of any career path.",
    url: '/',
    siteName: 'Career Trade-Offs',
    images: [
      {
        url: '/images/hero.jpg', // We can use the hero image as default og-image
        width: 1200,
        height: 630,
        alt: 'Career Trade-Offs',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Career Trade-Offs | Choose your struggles",
    description: "Every path demands a sacrifice. Uncover the hidden friction, mental toll, and financial runway of any career path.",
    images: ['/images/hero.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-neutral-50`}
      >
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
