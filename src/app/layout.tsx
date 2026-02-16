import { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;700;800&family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" type="image/svg+xml" href="/images/ui/Canaan-logo-100x100.svg" />
      </head>
      <body className="bg-background-light text-text-primary font-display antialiased">
        {children}
      </body>
    </html>
  );
}