"use client";

import OptimizedImage from "@/components/OptimizedImage";
import Button from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icons";

export default function ContactClient() {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission
    };

    return (
        <div className="mx-auto max-w-5xl">
            <div className="flex flex-wrap justify-between gap-3 mb-8">
                <div className="flex min-w-72 flex-col gap-3">
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-4xl font-black leading-tight tracking-tight text-text-primary dark:text-background-light">
                                Contact Us
                              </h1>
                              <p className="text-base font-normal leading-normal text-text-secondary dark:text-text-secondary/90">
                                We&apos;re here to help plan your stay.
                              </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mb-12 overflow-hidden rounded-xl border border-border-color dark:border-text-secondary/20 shadow-xl">
                <OptimizedImage
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCW_Sq-6MxdZfXT6k0KVoAvToBcuaJQo1Pb0KSpz82y-aMoeeiwIEzyhdqqC1KDdSHxqtpaZP3zRwaYZ60UD6u3ThZnxGfZVf4EmCBx5FwFlnQ2RNHW1hprL2RnUFRyBjKg7Guc6N_ZNCpd-E9b8ySUje61I67QcQA7XLj2p0cEMdYKTKWaSY4-TYghE6qO0izjKtXCZ8-4xeWvGI7R3Qk3DWhLqveHDCd7GZUR7YsRZi8QPxYtSs-raDbPEopy8i7QrcaTGNllj6nQ"
                    alt="Interactive map showing the location of Canaan International Hotel in Adigrat"
                    width={1200}
                    height={600}
                    className="w-full h-64 md:h-96 object-cover"
                    unoptimized
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                <address className="flex flex-col not-italic">
                    <div className="space-y-6">
                        <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                            <div className="flex-shrink-0 text-primary pt-1" aria-hidden="true">
                                <Icon name="location_on" className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-sm font-bold uppercase tracking-wider text-text-secondary dark:text-text-secondary/70">
                                    Address
                                </p>
                                <p className="mt-1 text-base font-normal leading-normal text-text-primary dark:text-background-light">
                                    Kebele 03, Adigrat, Tigray, 1000, Ethiopia
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                            <div className="flex-shrink-0 text-primary pt-1" aria-hidden="true">
                                <Icon name="call" className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-sm font-bold uppercase tracking-wider text-text-secondary dark:text-text-secondary/70">
                                    Phone
                                </p>
                                <a
                                    className="mt-1 block text-base font-bold leading-normal text-text-primary dark:text-background-light hover:text-primary transition-colors"
                                    href="tel:+251935406334"
                                >
                                    +251 935 406 334
                                </a>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                            <div className="flex-shrink-0 text-primary pt-1" aria-hidden="true">
                                <Icon name="mail" className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-sm font-bold uppercase tracking-wider text-text-secondary dark:text-text-secondary/70">
                                    Email
                                </p>
                                <a
                                    className="mt-1 block text-base font-bold leading-normal text-text-primary dark:text-background-light hover:text-primary transition-colors"
                                    href="mailto:stay@canaanhotel.com"
                                >
                                    stay@canaanhotel.com
                                </a>
                            </div>
                        </div>
                    </div>
                </address>

                <div className="flex flex-col">
                    <h2 className="text-2xl font-black text-text-primary dark:text-white mb-6">
                        Ask a Question
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-6" aria-label="Contact form">
                        <div>
                            <label className="block text-sm font-bold text-text-primary dark:text-background-light mb-1.5" htmlFor="name">
                                Full Name
                            </label>
                            <input
                                autoComplete="name"
                                className="block w-full rounded-lg border border-border-color dark:border-text-secondary/50 bg-white dark:bg-background-light/10 px-4 py-3 focus:border-primary focus:ring-2 focus:ring-primary dark:placeholder:text-text-secondary/70 transition"
                                id="name"
                                name="name"
                                placeholder="What's your name?"
                                type="text"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-text-primary dark:text-background-light mb-1.5" htmlFor="email">
                                Email Address
                            </label>
                            <input
                                autoComplete="email"
                                className="block w-full rounded-lg border border-border-color dark:border-text-secondary/50 bg-white dark:bg-background-light/10 px-4 py-3 focus:border-primary focus:ring-2 focus:ring-primary dark:placeholder:text-text-secondary/70 transition"
                                id="email"
                                name="email"
                                placeholder="How can we reach you back?"
                                type="email"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-text-primary dark:text-background-light mb-1.5" htmlFor="message">
                                Your Message
                            </label>
                            <textarea
                                className="block w-full rounded-lg border border-border-color dark:border-text-secondary/50 bg-white dark:bg-background-light/10 px-4 py-3 focus:border-primary focus:ring-2 focus:ring-primary dark:placeholder:text-text-secondary/70 transition resize-none"
                                id="message"
                                name="message"
                                placeholder="Tell us how we can help..."
                                rows={4}
                                required
                            ></textarea>
                        </div>

                        <div className="pt-2">
                            <Button type="submit" size="lg" className="w-full py-4 uppercase tracking-widest">
                                Send Message
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
