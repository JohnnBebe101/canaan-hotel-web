import { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://canaanhotel.com"),
  title: {
    template: "%s | Cannan International Hotel",
    default: "Cannan International Hotel - Your Gateway to Tigray's History and Comfort",
  },
  description: "Experience unparalleled hospitality at Cannan International Hotel in Adigrat, Tigray. Book direct for best rates, exclusive offers, and flexible cancellation.",
  keywords: "hotel Adigrat, Tigray hotel, Cannan International Hotel, Ethiopia hotel booking",
  authors: [{ name: "Cannan International Hotel" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://canaanhotel.com",
    title: "Cannan International Hotel - Your Gateway to Tigray's History and Comfort",
    description: "Experience unparalleled hospitality in the heart of Adigrat. Book direct for best rates and exclusive offers.",
    images: [
      {
        url: "/images/room-placeholder.jpg",
        width: 1200,
        height: 630,
        alt: "Cannan International Hotel Exterior",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cannan International Hotel - Your Gateway to Tigray's History and Comfort",
    description: "Experience unparalleled hospitality in the heart of Adigrat.",
    images: ["/images/room-placeholder.jpg"],
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
        <link rel="icon" type="image/png" href="/favicon.ico" />
      </head>
      <body className="bg-background-light text-text-primary font-display antialiased">
        {children}
      </body>
    </html>
  );
}