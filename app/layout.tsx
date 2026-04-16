import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "itemAVM Yardım Merkezi",
  description:
    "itemAVM Yardım Merkezi — sık sorulan sorular, makaleler ve canlı destek.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr" className={`${plusJakarta.variable}`}>
      <body className="min-h-screen bg-panel text-text antialiased">
        {children}
      </body>
    </html>
  );
}
