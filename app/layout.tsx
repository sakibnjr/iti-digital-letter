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
  themeColor: "#FAF6EE",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    default: "ইতি (Iti) ✦ texts are boring, send a wax-sealed letter 💌",
    template: "%s | ইতি (Iti)",
  },
  description:
    "Romanticize your words into vintage wax-sealed digital letters. No accounts, zero tracking, just pure vibes.",
  keywords: [
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
    title: "ইতি (Iti) ✦ texts are boring, send a wax-sealed letter 💌",
    description:
      "Romanticize your words into vintage wax-sealed digital letters. No accounts, zero tracking, just pure vibes.",
    url: "https://iti.app",
    siteName: "ইতি (Iti)",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ইতি (Iti) ✦ texts are boring, send a wax-sealed letter 💌",
    description:
      "Romanticize your words into vintage wax-sealed digital letters. No accounts, zero tracking, just pure vibes.",
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
      <body className="min-h-full flex flex-col selection:bg-amber-800/20 selection:text-amber-950 font-serif">
        {children}
      </body>
    </html>
  );
}
