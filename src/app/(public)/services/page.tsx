import { Metadata } from "next";
import Link from "next/link";
import HeroImage from "@/components/HeroImage";
import ServiceCard from "@/components/ServiceCard";
import DemoIntegrationCard from "@/components/DemoIntegrationCard";
import DemoFeatureCard from "@/components/DemoFeatureCard";

export const metadata: Metadata = {
  title: "Our Services | Cannan International Hotel",
  description: "Experience world-class hospitality at Cannan International Hotel. From fine dining to business essentials, discover our comprehensive range of services.",
  openGraph: {
    title: "Premium Services & Facilities in Adigrat - Cannan Hotel",
    description: "Explore our amenities including 24-hour concierge, secure parking, and professional business facilities.",
    images: ["/assets/images/hotel-exterior.jpg"],
  },
};

export default function ServicesPage() {
  return (
    <main id="main-content" className="flex flex-1 flex-col items-center">
      <div className="w-full max-w-7xl">
        {/* Hero Section */}
        <section
          className="relative flex min-h-[60vh] w-full flex-col items-center justify-center p-4 py-20 text-center text-white"
          aria-label="Hero section with hotel services"
        >
          <HeroImage
            src="/assets/images/hotel-exterior.jpg"
            alt="Canaan International Hotel services and facilities"
            overlayOpacity={0.5}
            className="absolute inset-0 -z-10"
          />
          <div className="flex flex-col gap-4 relative z-10">
            <h1 className="text-4xl font-black leading-tight tracking-tighter md:text-6xl">
              Our Services & Facilities
            </h1>
            <p className="mx-auto max-w-2xl text-base font-normal leading-normal text-gray-200 md:text-lg">
              Experience world-class hospitality with our comprehensive range of services designed for your comfort.
            </p>
          </div>
        </section>

        {/* Why Book Direct Section */}
        <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="why-book-direct">
          <div className="text-center">
            <h2 id="why-book-direct" className="text-3xl font-bold tracking-tight text-text-primary dark:text-background-light">
              Why Book Direct?
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            <ServiceCard
              icon="sell"
              title="Best Price Guarantee"
              description="Always get the best available rate when you book directly with us."
            />
            <ServiceCard
              icon="star"
              title="Exclusive Offers"
              description="Access special packages and deals you won't find anywhere else."
            />
            <ServiceCard
              icon="task_alt"
              title="Flexible Cancellation"
              description="Enjoy peace of mind with our flexible cancellation policies."
            />
          </div>
        </section>

        {/* Email Marketing Suite Demo Section */}
        <section className="px-4 py-8 sm:px-6 lg:px-8" aria-labelledby="demo-newsletter">
          <div className="max-w-4xl mx-auto">
            <div className="p-6 my-6 border border-gray-300 rounded-lg shadow-sm">
              <div className="text-center mb-6">
                <h2 id="demo-newsletter" className="text-xl font-bold text-text-primary dark:text-background-light mb-2">
                  Demo: Email Marketing Suite
                </h2>
                <p className="text-sm text-text-secondary dark:text-text-secondary/90">
                  Automated campaigns, guest communications, and marketing analytics
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <div className="flex-1">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="inline-block px-2 py-1 rounded-full bg-gray-200 text-gray-800">Demo: Welcome Series</span>
                    <span className="inline-block px-2 py-1 rounded-full bg-gray-200 text-gray-800">Demo: Booking Confirmations</span>
                    <span className="inline-block px-2 py-1 rounded-full bg-gray-200 text-gray-800">Demo: Promotional Campaigns</span>
                  </div>
                </div>
                <div className="w-full sm:w-auto">
                  <div className="flex gap-2">
                    <input
                      type="email"
                      placeholder="Enter email for demo"
                      className="flex-1 sm:w-64 h-10 rounded-lg border border-border-color bg-white px-3 text-sm text-text-primary focus:border-primary focus:ring-2 focus:ring-primary dark:border-text-secondary/50 dark:bg-background-light/10 dark:text-background-light"
                    />
                    <button
                      type="button"
                      className="px-6 py-3 rounded-lg bg-amber-500 hover:bg-amber-600 text-white"
                      data-demo="true"
                    >
                      Subscribe
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Demo Integration Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 py-8" data-demo="true">
          <DemoIntegrationCard
            icon="people"
            iconBgColor="bg-blue-100"
            iconColor="text-blue-600"
            title="Demo: CRM System"
            stats={[
              { label: "Active Guests", value: "247", variant: "green" },
              { label: "Loyalty Members", value: "1,203", variant: "blue" },
            ]}
            buttonText="Demo: Manage Guests"
          />
          <DemoIntegrationCard
            icon="credit_card"
            iconBgColor="bg-green-100"
            iconColor="text-green-600"
            title="Demo: Payments"
            stats={[
              { label: "Today's Revenue", value: "$2,847", variant: "green" },
              { label: "Pending", value: "$423", variant: "yellow" },
            ]}
            buttonText="Demo: Process Payments"
          />
          <DemoIntegrationCard
            icon="mail"
            iconBgColor="bg-purple-100"
            iconColor="text-purple-600"
            title="Demo: Email Marketing"
            stats={[
              { label: "Open Rate", value: "68%", variant: "green" },
              { label: "Subscribers", value: "3,492", variant: "blue" },
            ]}
            buttonText="Demo: Send Campaign"
          />
          <DemoIntegrationCard
            icon="travel_explore"
            iconBgColor="bg-orange-100"
            iconColor="text-orange-600"
            title="Demo: OTA Integration"
            stats={[
              { label: "Booking.com", value: "Sync", variant: "green" },
              { label: "Expedia", value: "Sync", variant: "green" },
            ]}
            buttonText="Demo: Manage Channels"
          />
        </div>

        {/* Demo: Advanced CRM Suite */}
        <section className="px-4 sm:px-6 lg:px-8">
          <div className="p-6 my-6 border border-gray-300 rounded-lg shadow-sm" data-demo="true">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-text-primary dark:text-background-light">Demo: Advanced CRM Suite</h3>
              <div className="flex gap-2">
                <span className="inline-block px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs">Active</span>
                <span className="inline-block px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-xs">Tier-3</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <DemoFeatureCard
                icon="group"
                iconColor="text-blue-600"
                title="Guest Database"
                subtitle="2,847 profiles"
                badges={[
                  { text: "VIP", variant: "blue" },
                  { text: "Loyal", variant: "green" },
                ]}
                gradient="bg-gradient-to-br from-blue-50 to-blue-100"
              />
              <DemoFeatureCard
                icon="loyalty"
                iconColor="text-yellow-600"
                title="Loyalty Program"
                subtitle="1,203 members"
                badges={[
                  { text: "Gold", variant: "yellow" },
                  { text: "Platinum", variant: "purple" },
                ]}
                gradient="bg-gradient-to-br from-yellow-50 to-yellow-100"
              />
              <DemoFeatureCard
                icon="analytics"
                iconColor="text-purple-600"
                title="Analytics"
                subtitle="Real-time insights"
                badges={[
                  { text: "+15%", variant: "green" },
                  { text: "ROI", variant: "blue" },
                ]}
                gradient="bg-gradient-to-br from-purple-50 to-purple-100"
              />
              <DemoFeatureCard
                icon="campaign"
                iconColor="text-green-600"
                title="Campaigns"
                subtitle="12 active"
                badges={[
                  { text: "A/B Test", variant: "orange" },
                  { text: "Auto", variant: "red" },
                ]}
                gradient="bg-gradient-to-br from-green-50 to-green-100"
              />
            </div>
            <div className="flex flex-wrap gap-3">
              <button className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium" data-demo="true">
                Demo: Guest Segmentation
              </button>
              <button className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium" data-demo="true">
                Demo: Loyalty Dashboard
              </button>
              <button className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium" data-demo="true">
                Demo: Behavioral Analytics
              </button>
              <button className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium" data-demo="true">
                Demo: Campaign Builder
              </button>
            </div>
          </div>
        </section>

        {/* Demo: Payment Gateway Hub */}
        <section className="px-4 sm:px-6 lg:px-8">
          <div className="p-6 my-6 border border-gray-300 rounded-lg shadow-sm" data-demo="true">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-text-primary dark:text-background-light">Demo: Payment Gateway Hub</h3>
              <div className="flex gap-2">
                <span className="inline-block px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs">PCI DSS</span>
                <span className="inline-block px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-xs">SSL</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="p-5 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-gray-900 dark:text-background-light">Card Processing</h4>
                  <span className="inline-block px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs">Live</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-text-secondary">Visa/Mastercard</span>
                    <span className="inline-block px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs">✓</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-text-secondary">American Express</span>
                    <span className="inline-block px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs">✓</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-text-secondary">Apple Pay</span>
                    <span className="inline-block px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-xs">New</span>
                  </div>
                </div>
              </div>
              <div className="p-5 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-gray-900 dark:text-background-light">Bank Transfers</h4>
                  <span className="inline-block px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-xs">Direct</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-text-secondary">Instant Transfer</span>
                    <span className="inline-block px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs">✓</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-text-secondary">Wire Transfer</span>
                    <span className="inline-block px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs">2-3 days</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-text-secondary">Currency Conversion</span>
                    <span className="inline-block px-2 py-1 rounded-full bg-purple-100 text-purple-800 text-xs">Auto</span>
                  </div>
                </div>
              </div>
              <div className="p-5 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-gray-900 dark:text-background-light">Security & Compliance</h4>
                  <span className="inline-block px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs">Verified</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-text-secondary">Fraud Detection</span>
                    <span className="inline-block px-2 py-1 rounded-full bg-red-100 text-red-800 text-xs">AI</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-text-secondary">Chargeback Protection</span>
                    <span className="inline-block px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs">✓</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-text-secondary">Multi-currency</span>
                    <span className="inline-block px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-xs">25+</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <button className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium" data-demo="true">
                Demo: Payment Dashboard
              </button>
              <button className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium" data-demo="true">
                Demo: Refund Portal
              </button>
              <button className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium" data-demo="true">
                Demo: Risk Management
              </button>
              <button className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium" data-demo="true">
                Demo: Settlement Reports
              </button>
            </div>
          </div>
        </section>

        {/* Demo: Email Marketing Automation */}
        <section className="px-4 sm:px-6 lg:px-8">
          <div className="p-6 my-6 border border-gray-300 rounded-lg shadow-sm" data-demo="true">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-text-primary dark:text-background-light">Demo: Email Marketing Automation</h3>
              <div className="flex gap-2">
                <span className="inline-block px-2 py-1 rounded-full bg-orange-100 text-orange-800 text-xs">95% Deliver</span>
                <span className="inline-block px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs">Smart</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <span className="material-symbols-outlined text-blue-600 text-xl">auto_mode</span>
                  <h4 className="font-semibold text-gray-900 dark:text-background-light">Welcome Flows</h4>
                </div>
                <p className="text-sm text-gray-600 dark:text-text-secondary mb-2">Automated onboarding</p>
                <div className="flex gap-2">
                  <span className="inline-block px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-xs">7 steps</span>
                  <span className="inline-block px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs">85% complete</span>
                </div>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <span className="material-symbols-outlined text-green-600 text-xl">confirmation_number</span>
                  <h4 className="font-semibold text-gray-900 dark:text-background-light">Transactional</h4>
                </div>
                <p className="text-sm text-gray-600 dark:text-text-secondary mb-2">Booking confirmations</p>
                <div className="flex gap-2">
                  <span className="inline-block px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs">Real-time</span>
                  <span className="inline-block px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-xs">iCal</span>
                </div>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <span className="material-symbols-outlined text-purple-600 text-xl">segment</span>
                  <h4 className="font-semibold text-gray-900 dark:text-background-light">Segmentation</h4>
                </div>
                <p className="text-sm text-gray-600 dark:text-text-secondary mb-2">Smart targeting</p>
                <div className="flex gap-2">
                  <span className="inline-block px-2 py-1 rounded-full bg-purple-100 text-purple-800 text-xs">AI-powered</span>
                  <span className="inline-block px-2 py-1 rounded-full bg-orange-100 text-orange-800 text-xs">Dynamic</span>
                </div>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <span className="material-symbols-outlined text-orange-600 text-xl">monitoring</span>
                  <h4 className="font-semibold text-gray-900 dark:text-background-light">Analytics</h4>
                </div>
                <p className="text-sm text-gray-600 dark:text-text-secondary mb-2">Performance tracking</p>
                <div className="flex gap-2">
                  <span className="inline-block px-2 py-1 rounded-full bg-orange-100 text-orange-800 text-xs">A/B Test</span>
                  <span className="inline-block px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-xs">Heatmaps</span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <button className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium" data-demo="true">
                Demo: Template Builder
              </button>
              <button className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium" data-demo="true">
                Demo: Subscriber Insights
              </button>
              <button className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium" data-demo="true">
                Demo: Automation Workflows
              </button>
              <button className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium" data-demo="true">
                Demo: Compliance Tools
              </button>
            </div>
          </div>
        </section>

        {/* Demo: Backend Features */}
        <section className="px-4 sm:px-6 lg:px-8 py-8">
          <div className="p-6 my-6 border border-gray-300 rounded-lg shadow-sm" aria-labelledby="demo-features">
            <div className="text-center mb-12">
              <h2 id="demo-features" className="text-2xl font-bold tracking-tight text-text-primary dark:text-background-light mb-2">
                Demo: Backend Features
              </h2>
              <p className="text-sm text-text-secondary dark:text-text-secondary/90">
                Integrated systems ready for production deployment
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5 max-w-6xl mx-auto">
              <div className="p-6 border border-gray-300 rounded-lg shadow-sm text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-primary mx-auto mb-3" aria-hidden="true">
                  <span className="material-symbols-outlined text-2xl">edit_note</span>
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-sm font-bold text-text-primary dark:text-background-light">CMS Demo</h3>
                  <p className="text-xs text-text-secondary dark:text-text-secondary/90">Content Management</p>
                  <span className="inline-block px-2 py-1 rounded-full bg-gray-200 text-gray-800 text-xs mt-2">Active</span>
                </div>
              </div>
              <div className="p-6 border border-gray-300 rounded-lg shadow-sm text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-primary mx-auto mb-3" aria-hidden="true">
                  <span className="material-symbols-outlined text-2xl">group</span>
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-sm font-bold text-text-primary dark:text-background-light">CRM Demo</h3>
                  <p className="text-xs text-text-secondary dark:text-text-secondary/90">Guest Management</p>
                  <span className="inline-block px-2 py-1 rounded-full bg-gray-200 text-gray-800 text-xs mt-2">Active</span>
                </div>
              </div>
              <div className="p-6 border border-gray-300 rounded-lg shadow-sm text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-primary mx-auto mb-3" aria-hidden="true">
                  <span className="material-symbols-outlined text-2xl">credit_card</span>
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-sm font-bold text-text-primary dark:text-background-light">Payments Demo</h3>
                  <p className="text-xs text-text-secondary dark:text-text-secondary/90">Secure Processing</p>
                  <span className="inline-block px-2 py-1 rounded-full bg-gray-200 text-gray-800 text-xs mt-2">Active</span>
                </div>
              </div>
              <div className="p-6 border border-gray-300 rounded-lg shadow-sm text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-primary mx-auto mb-3" aria-hidden="true">
                  <span className="material-symbols-outlined text-2xl">mail</span>
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-sm font-bold text-text-primary dark:text-background-light">Emails Demo</h3>
                  <p className="text-xs text-text-secondary dark:text-text-secondary/90">Marketing & Transactional</p>
                  <span className="inline-block px-2 py-1 rounded-full bg-gray-200 text-gray-800 text-xs mt-2">Active</span>
                </div>
              </div>
              <div className="p-6 border border-gray-300 rounded-lg shadow-sm text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-primary mx-auto mb-3" aria-hidden="true">
                  <span className="material-symbols-outlined text-2xl">travel_explore</span>
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-sm font-bold text-text-primary dark:text-background-light">OTA Demo</h3>
                  <p className="text-xs text-text-secondary dark:text-text-secondary/90">Booking Integrations</p>
                  <span className="inline-block px-2 py-1 rounded-full bg-gray-200 text-gray-800 text-xs mt-2">Active</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="px-4 py-16 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-text-primary dark:text-background-light mb-4">
            Ready to Experience Our Services?
          </h2>
          <p className="mx-auto max-w-2xl text-text-secondary dark:text-text-secondary/90 mb-8">
            Book your stay today and enjoy world-class hospitality with our comprehensive range of services.
          </p>
          <Link
            href="/rooms"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-4 text-base font-bold text-white transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Book Now
          </Link>
        </section>
      </div>
    </main>
  );
}
