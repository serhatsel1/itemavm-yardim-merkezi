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
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "itemAVM Yardım Merkezi",
    description:
      "Sık sorulan sorulara göz atabilir, işlemlerinizle ilgili hızlıca destek alabilirsiniz.",
    url: "https://yardim-merkezi.vercel.app",
    siteName: "itemAVM",
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "itemAVM Yardım Merkezi",
    description:
      "Sık sorulan sorulara göz atabilir, işlemlerinizle ilgili hızlıca destek alabilirsiniz.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr" className={`${plusJakarta.variable}`}>
      <body className="min-h-screen bg-bg text-text antialiased lg:bg-panel">
        {children}
      </body>
    </html>
  );
}
