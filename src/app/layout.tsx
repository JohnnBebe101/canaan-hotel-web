
import type { Metadata } from "next/types";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

export const dynamic = 'force-dynamic';

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://canaanhotel.com"),
  title: {
    template: "%s | Canaan International Hotel",
    default: "Canaan International Hotel - Your Gateway to Tigray's History and Comfort",
  },
  description: "Experience unparalleled hospitality at Canaan International Hotel in Adigrat, Tigray. Book direct for best rates, exclusive offers, and flexible cancellation.",
  keywords: "hotel Adigrat, Tigray hotel, Canaan International Hotel, Ethiopia hotel booking",
  authors: [{ name: "Canaan International Hotel" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://canaanhotel.com",
    title: "Canaan International Hotel - Your Gateway to Tigray's History and Comfort",
    description: "Experience unparalleled hospitality in the heart of Adigrat. Book direct for best rates and exclusive offers.",
    images: [
      {
        url: "/images/heroes/Ext-Compund.webp",
        width: 1200,
        height: 630,
        alt: "Canaan International Hotel Exterior",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Canaan International Hotel - Your Gateway to Tigray's History and Comfort",
    description: "Experience unparalleled hospitality in the heart of Adigrat.",
    images: ["/images/heroes/Ext-Compund.webp"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <link rel="icon" type="image/svg+xml" href="/images/ui/Canaan-logo-100x100.svg" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
        />
      </head>
      <body className="bg-sandstone text-forest font-sans antialiased selection:bg-cactus selection:text-white">
        {children}
      </body>
    </html>
  );
}