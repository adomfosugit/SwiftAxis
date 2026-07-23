import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SwiftAxis",
  description: "Payment Management Company for Businesses",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <ClerkProvider  appearance={{
    options: {
      socialButtonsPlacement: 'bottom',
      termsPageUrl: 'https://clerk.com/terms',
      unsafe_disableDevelopmentModeWarnings: true,
    },
  }}>

      <body className="min-h-full flex flex-col">{children}</body>
      </ClerkProvider>
    </html>
  );
}
