import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Noto_Serif_Bengali, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const notoSerifBengali = Noto_Serif_Bengali({
  variable: "--font-noto-serif-bn",
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#F0F4F8",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    default: "নীলখাম (Neelkhaam) ✦ texts are boring, send a wax-sealed letter 💌",
    template: "%s | নীলখাম (Neelkhaam)",
  },
  description:
    "Romanticize your words into vintage wax-sealed digital letters. No accounts, zero tracking, just pure vibes.",
  keywords: [
    "নীলখাম",
    "Neelkhaam",
    "ইতি",
    "Iti",
    "digital love letter",
    "wax seal letter",
    "aesthetic letters",
    "চিঠি",
    "vintage letter",
    "private letter",
  ],
  openGraph: {
    title: "নীলখাম (Neelkhaam) ✦ texts are boring, send a wax-sealed letter 💌",
    description:
      "Romanticize your words into vintage wax-sealed digital letters. No accounts, zero tracking, just pure vibes.",
    url: "https://neelkhaam.vercel.app",
    siteName: "নীলখাম (Neelkhaam)",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "নীলখাম (Neelkhaam) ✦ texts are boring, send a wax-sealed letter 💌",
    description:
      "Romanticize your words into vintage wax-sealed digital letters. No accounts, zero tracking, just pure vibes.",
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/favicon.svg",
    apple: "/app-icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="bn"
      className={`${notoSerifBengali.variable} ${plusJakartaSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col selection:bg-blue-900/20 selection:text-blue-950 font-serif">
        {children}
      </body>
    </html>
  );
}
