"use client";

import Image from "next/image";

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
                            <h1 className="text-4xl font-black leading-tight tracking-[-0.033em] text-text-primary dark:text-background-light">
                                Contact & Location
                            </h1>
                            <p className="text-base font-normal leading-normal text-text-secondary dark:text-text-secondary/90">
                                Get in touch with us or find our exact location in Adigrat.
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <span className="inline-block px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium" data-demo="true">
                                24/7 Support
                            </span>
                            <span className="inline-block px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-medium" data-demo="true">
                                Response {'<'}24h
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mb-12">
                <div
                    className="w-full h-64 md:h-96 bg-center bg-no-repeat bg-cover rounded-xl object-cover border border-border-color dark:border-text-secondary/20"
                    role="img"
                    aria-label="An interactive map showing the location of Canaan International Hotel in Adigrat, Tigray"
                    style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCW_Sq-6MxdZfXT6k0KVoAvToBcuaJQo1Pb0KSpz82y-aMoeeiwIEzyhdqqC1KDdSHxqtpaZP3zRwaYZ60UD6u3ThZnxGfZVf4EmCBx5FwFlnQ2RNHW1hprL2RnUFRyBjKg7Guc6N_ZNCpd-E9b8ySUje61I67QcQA7XLj2p0cEMdYKTKWaSY4-TYghE6qO0izjKtXCZ8-4xeWvGI7R3Qk3DWhLqveHDCd7GZUR7YsRZi8QPxYtSs-raDbPEopy8i7QrcaTGNllj6nQ")' }}
                ></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                <address className="flex flex-col not-italic">
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 text-primary pt-1" aria-hidden="true">
                                <span className="material-symbols-outlined">location_on</span>
                            </div>
                            <div>
                                <p className="text-sm font-medium leading-normal text-text-secondary dark:text-text-secondary/90">
                                    Address
                                </p>
                                <p className="mt-1 text-base font-normal leading-normal text-text-primary dark:text-background-light">
                                    123 Hotel Street, Adigrat, Tigray, Ethiopia
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 text-primary pt-1" aria-hidden="true">
                                <span className="material-symbols-outlined">call</span>
                            </div>
                            <div>
                                <p className="text-sm font-medium leading-normal text-text-secondary dark:text-text-secondary/90">
                                    Phone
                                </p>
                                <a
                                    className="mt-1 block text-base font-normal leading-normal text-text-primary dark:text-background-light hover:text-primary transition-colors"
                                    href="tel:+251123456789"
                                >
                                    +251 12 345 6789
                                </a>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 text-primary pt-1" aria-hidden="true">
                                <span className="material-symbols-outlined">mail</span>
                            </div>
                            <div>
                                <p className="text-sm font-medium leading-normal text-text-secondary dark:text-text-secondary/90">
                                    Email
                                </p>
                                <a
                                    className="mt-1 block text-base font-normal leading-normal text-text-primary dark:text-background-light hover:text-primary transition-colors"
                                    href="mailto:contact@cannanhotel.com"
                                >
                                    contact@cannanhotel.com
                                </a>
                            </div>
                        </div>
                    </div>
                </address>

                <div className="flex flex-col">
                    <h2 className="text-[22px] font-bold leading-tight tracking-[-0.015em] mb-6">
                        Ask a Question
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-6" aria-label="Contact form">
                        <div>
                            <label className="block text-sm font-medium text-text-primary dark:text-background-light mb-1" htmlFor="name">
                                Name
                            </label>
                            <input
                                autoComplete="name"
                                className="block w-full rounded-lg border border-border-color dark:border-text-secondary/50 bg-white dark:bg-background-light/10 px-3 py-2 focus:border-primary focus:ring-2 focus:ring-primary dark:placeholder:text-text-secondary/70 transition"
                                id="name"
                                name="name"
                                placeholder="Your Name"
                                type="text"
                                required
                                aria-required="true"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-text-primary dark:text-background-light mb-1" htmlFor="email">
                                Email
                            </label>
                            <input
                                autoComplete="email"
                                className="block w-full rounded-lg border border-border-color dark:border-text-secondary/50 bg-white dark:bg-background-light/10 px-3 py-2 focus:border-primary focus:ring-2 focus:ring-primary dark:placeholder:text-text-secondary/70 transition"
                                id="email"
                                name="email"
                                placeholder="Your Email Address"
                                type="email"
                                required
                                aria-required="true"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-text-primary dark:text-background-light mb-1" htmlFor="message">
                                Message
                            </label>
                            <textarea
                                className="block w-full rounded-lg border border-border-color dark:border-text-secondary/50 bg-white dark:bg-background-light/10 px-3 py-2 focus:border-primary focus:ring-2 focus:ring-primary dark:placeholder:text-text-secondary/70 transition"
                                id="message"
                                name="message"
                                placeholder="Your Message..."
                                rows={4}
                                required
                                aria-required="true"
                            ></textarea>
                        </div>

                        <div>
                            <button
                                className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-amber-500 text-white text-base font-bold leading-normal tracking-[0.015em] hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 dark:focus:ring-offset-background-dark"
                                type="submit"
                            >
                                <span className="truncate">SUBMIT</span>
                            </button>
                        </div>
                    </form>

                    {/* Demo: Contact Management */}
                    <div className="mt-6 p-4 border border-gray-300 rounded-lg shadow-sm" data-demo="true">
                        <div className="flex items-center justify-between mb-3">
                            <h4 className="font-semibold text-gray-900">Demo: Contact Management</h4>
                            <span className="inline-block px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-xs">CRM</span>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-3">
                            <span className="inline-block px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs">NEW</span>
                            <span className="inline-block px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-xs">RESPONDED</span>
                            <span className="inline-block px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs">RESOLVED</span>
                        </div>
                        <div className="flex gap-2">
                            <button className="px-3 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-sm" data-demo="true">
                                Demo: Auto-Reply
                            </button>
                            <button className="px-3 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-sm" data-demo="true">
                                Demo: Ticket System
                            </button>
                            <button className="px-3 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-sm" data-demo="true">
                                Demo: Follow-up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
