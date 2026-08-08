import type { Metadata } from "next/types";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Privacy Policy",
  alternates: { canonical: canonical("/legal/privacy") },
  description: "Privacy policy for Canaan International Hotel, Adigrat, Tigray. Your privacy is important to us.",
  openGraph: {
    title: 'Privacy Policy | Canaan International Hotel',
    description: 'Your privacy is important to us. Read our privacy policy.',
    images: ['/images/heroes/Ext-Compund.webp'],
  },
};

export default function PrivacyPage() {
  return (
    <main id="main-content" className="flex flex-col items-center py-16 px-4">
      <div className="max-w-3xl w-full">
        <Breadcrumbs items={[{ name: "Privacy Policy" }]} />
        <h1 className="text-4xl font-serif font-bold text-forest mb-8">Privacy Policy</h1>
        <div className="prose prose-sandstone max-w-none">
          <p className="text-text-secondary leading-relaxed mb-6">
            At Canaan International Hotel, we respect your privacy and are committed to protecting your personal information.
          </p>
          <p className="text-text-secondary leading-relaxed mb-6">
            This privacy policy explains how we collect, use, and safeguard your information when you visit our website or stay at our hotel.
          </p>
          <h2 className="text-2xl font-bold text-forest mt-8 mb-4">Information We Collect</h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            We may collect personal information such as your name, email address, phone number, and booking details when you:
          </p>
          <ul className="list-disc pl-6 text-text-secondary mb-6">
            <li>Make a reservation</li>
            <li>Contact us through our website</li>
            <li>Sign up for our newsletter</li>
          </ul>
          <h2 className="text-2xl font-bold text-forest mt-8 mb-4">How We Use Your Information</h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            Your information is used to:
          </p>
          <ul className="list-disc pl-6 text-text-secondary mb-6">
            <li>Process and confirm your booking</li>
            <li>Communicate with you about your reservation</li>
            <li>Send you updates about our hotel and special offers</li>
            <li>Improve our services</li>
          </ul>
          <h2 className="text-2xl font-bold text-forest mt-8 mb-4">Contact Us</h2>
          <p className="text-text-secondary leading-relaxed">
            If you have questions about this privacy policy, please contact us at <a href="mailto:info@canaanhotels.com" className="text-cactus hover:underline">info@canaanhotels.com</a>.
          </p>
        </div>
      </div>
    </main>
  );
}