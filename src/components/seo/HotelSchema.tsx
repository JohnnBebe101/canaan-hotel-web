import { SITE_URL } from "@/lib/site";

const SAME_AS = [
  "https://www.tripadvisor.com/Hotel_Review-g1401789-d13207473-Reviews-Canaan_Hotel-Adigrat_Tigray_Region.html",
  "https://www.booking.com/hotel/et/canaan-international-adigrat2.en-gb.html",
  "https://g.page/GfaOOMjriRenNsEqI/review",
];

export default function HotelSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Hotel",
        "@id": `${SITE_URL}/#hotel`,
        name: "Canaan International Hotel",
        alternateName: "Canaan Hotel",
        url: `${SITE_URL}/`,
        image: `${SITE_URL}/images/heroes/Ext-Compund.webp`,
        description:
          "Canaan International Hotel in Adigrat, Tigray — 24 rooms, 24-hour service, complimentary breakfast, free Wi-Fi and parking.",
        telephone: "+251911095728",
        email: "info@canaanhotels.com",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Kebele 03",
          addressLocality: "Adigrat",
          addressRegion: "Tigray",
          postalCode: "1000",
          addressCountry: "ET",
        },
        geo: { "@type": "GeoCoordinates", latitude: 14.2845872, longitude: 39.4624769 },
        checkinTime: "12:00",
        checkoutTime: "11:00",
        petsAllowed: false,
        sameAs: SAME_AS,
      },
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "Canaan International Hotel",
        alternateName: "Canaan Hotel",
        url: `${SITE_URL}/`,
        sameAs: SAME_AS,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}