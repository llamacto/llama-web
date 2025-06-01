import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Llamacto Web Scaffold",
    template: "%s | Llamacto",
  },
  description: "The most powerful and modern web application scaffold. Built with Next.js 15, TypeScript, Tailwind CSS, and cutting-edge technologies to accelerate your development.",
  keywords: [
    "nextjs",
    "typescript",
    "tailwindcss",
    "scaffold",
    "web-app",
    "llamacto",
    "react",
    "modern",
  ],
  authors: [
    {
      name: "Llamacto Team",
      url: "https://llamacto.com",
    },
  ],
  creator: "Llamacto",
  publisher: "Llamacto",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://llamacto.com",
    siteName: "Llamacto Web Scaffold",
    title: "Llamacto Web Scaffold",
    description: "The most powerful and modern web application scaffold",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Llamacto Web Scaffold",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Llamacto Web Scaffold",
    description: "The most powerful and modern web application scaffold",
    images: ["/og-image.png"],
    creator: "@llamacto",
  },
  metadataBase: new URL("https://llamacto.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
