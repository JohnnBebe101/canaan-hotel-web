
import type { Metadata } from "next/types";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://canaan11.netlify.app'
),
  title: {
    template: '%s | Canaan Hotel',
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-sandstone text-forest font-sans antialiased selection:bg-cactus selection:text-white">
        {children}
      </body>
    </html>
  );
}