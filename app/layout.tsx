import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/shop/CartProvider";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vanhat.netlify.app"),

  title: {
    default: "Katedralskolan i Åbo – 750 vuotta",
    template: "%s | Katedralskolan i Åbo",
  },

  description:
    "Tutustu Katedralskolan i Åbon 750-vuotiseen historiaan ja tue koulun Vanhojen Tanssien järjestämistä Kakkutukun kautta.",

  keywords: [
    "Katedralskolan i Åbo",
    "Katedralskolan",
    "Katedralskolan 750 vuotta",
    "Vanhojen Tanssit",
    "Kakkutukku",
    "Turku",
    "Åbo",
  ],

  openGraph: {
    title: "Katedralskolan i Åbo - 750 vuotta",
    description:
      "Tutustu Katedralskolan i Åbon historiaan ja tue koulun Vanhojen Tanssien järjestämistä.",
    url: "https://vanhat.netlify.app",
    siteName: "Katedralskolan i Åbo - 750 vuotta",
    locale: "fi_FI",
    type: "website",
    images: [
      {
        url: "/vanhojen_tanssit_katedralskolan.png",
        width: 1200,
        height: 630,
        alt: "Katedralskolan Vanhojen Tanssit",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Katedralskolan i Åbo - 750 vuotta",
    description:
      "Tutustu Katedralskolan i Åbon historiaan ja tue Vanhojen Tanssien järjestämistä.",
    images: ["/vanhojen_tanssit_katedralskolan.png"],
  },

  robots: {
    index: true,
    follow: true,
  },

  verification: {
    google: "ZMK8JAdtxF2qIg6OC1Zle9t4u8djjaqb1QsqdWZEJzU",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fi">
      <body className={`${display.variable} ${sans.variable} antialiased`}>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}