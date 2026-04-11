import type { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Cookie Policy | Canaan International Hotel",
  description: "Cookie policy for Canaan International Hotel website.",
  openGraph: {
    title: 'Cookie Policy | Canaan International Hotel',
    description: 'Our cookie policy and privacy practices.',
    images: ['/images/heroes/Ext-Compund.webp'],
  },
};

export default function CookiesPage() {
  return (
    <main id="main-content" className="flex flex-col items-center py-16 px-4">
      <div className="max-w-3xl w-full">
        <h1 className="text-4xl font-serif font-bold text-forest mb-8">Cookie Policy</h1>
        <div className="prose prose-sandstone max-w-none">
          <p className="text-text-secondary leading-relaxed mb-6">
            This website uses cookies to enhance your browsing experience and provide personalized content.
          </p>
          <h2 className="text-2xl font-bold text-forest mt-8 mb-4">What Are Cookies</h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            Cookies are small text files stored on your device when you visit websites. They help remember your preferences and improve your experience.
          </p>
          <h2 className="text-2xl font-bold text-forest mt-8 mb-4">How We Use Cookies</h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            We use cookies for:
          </p>
          <ul className="list-disc pl-6 text-text-secondary mb-6">
            <li>Essential website functionality</li>
            <li>Analyzing website traffic and usage</li>
            <li>Remembering your preferences</li>
            <li>Improving our services</li>
          </ul>
          <h2 className="text-2xl font-bold text-forest mt-8 mb-4">Managing Cookies</h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            You can disable cookies through your browser settings. However, some features of our website may not work properly without cookies.
          </p>
          <h2 className="text-2xl font-bold text-forest mt-8 mb-4">Contact Us</h2>
          <p className="text-text-secondary leading-relaxed">
            For questions about this cookie policy, please contact us at <a href="mailto:info@canaanhotels.com" className="text-cactus hover:underline">info@canaanhotels.com</a>.
          </p>
        </div>
      </div>
    </main>
  );
}