import { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact & Location | Canaan International Hotel",
  description: "Get in touch with Canaan International Hotel in Adigrat. Find our location, contact details, and send us your inquiries.",
  openGraph: {
    title: "Contact Canaan International Hotel - Adigrat, Tigray",
    description: "Reach out to us for bookings, inquiries, or directions. We are here to assist you 24/7.",
  },
};

export default function ContactPage() {
  return (
    <main id="main-content" className="flex-1 px-4 sm:px-10 lg:px-20 py-10 sm:py-16">
      <ContactClient />
    </main>
  );
}
