"use client";

import { useState } from "react";

export default function CorporateInquiryForm() {
  const [formData, setFormData] = useState({
    organization: "",
    contactName: "",
    email: "",
    phone: "",
    groupSize: "",
    dates: "",
    requirements: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent("Corporate/Group Inquiry");
    const body = encodeURIComponent(
      `Hello Canaan Hotel,\n\n` +
      `I would like to make a corporate/group booking inquiry:\n\n` +
      `Organization: ${formData.organization}\n` +
      `Contact Name: ${formData.contactName}\n` +
      `Email: ${formData.email}\n` +
      `Phone: ${formData.phone}\n` +
      `Estimated Group Size: ${formData.groupSize}\n` +
      `Preferred Dates: ${formData.dates}\n` +
      `Requirements:\n${formData.requirements}\n\n` +
      `Please provide availability and pricing.\n\n` +
      `Thank you!`
    );
    window.location.href = `mailto:info@canaanhotels.com?subject=${subject}&body=${body}`;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-bold text-stone-700 mb-1.5" htmlFor="organization">
            Organization Name
          </label>
          <input
            className="w-full rounded-lg border border-stone-200 px-4 py-2.5 focus:ring-2 focus:ring-amber-700 focus:border-amber-700 outline-none"
            id="organization"
            type="text"
            value={formData.organization}
            onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-stone-700 mb-1.5" htmlFor="contactName">
            Contact Name
          </label>
          <input
            className="w-full rounded-lg border border-stone-200 px-4 py-2.5 focus:ring-2 focus:ring-amber-700 focus:border-amber-700 outline-none"
            id="contactName"
            type="text"
            value={formData.contactName}
            onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-bold text-stone-700 mb-1.5" htmlFor="email">
            Email Address
          </label>
          <input
            className="w-full rounded-lg border border-stone-200 px-4 py-2.5 focus:ring-2 focus:ring-amber-700 focus:border-amber-700 outline-none"
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-stone-700 mb-1.5" htmlFor="phone">
            Phone Number
          </label>
          <input
            className="w-full rounded-lg border border-stone-200 px-4 py-2.5 focus:ring-2 focus:ring-amber-700 focus:border-amber-700 outline-none"
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-bold text-stone-700 mb-1.5" htmlFor="groupSize">
            Estimated Group Size
          </label>
          <input
            className="w-full rounded-lg border border-stone-200 px-4 py-2.5 focus:ring-2 focus:ring-amber-700 focus:border-amber-700 outline-none"
            id="groupSize"
            type="number"
            min="5"
            placeholder="5+ rooms"
            value={formData.groupSize}
            onChange={(e) => setFormData({ ...formData, groupSize: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-stone-700 mb-1.5" htmlFor="dates">
            Preferred Dates
          </label>
          <input
            className="w-full rounded-lg border border-stone-200 px-4 py-2.5 focus:ring-2 focus:ring-amber-700 focus:border-amber-700 outline-none"
            id="dates"
            type="text"
            placeholder="e.g., March 15-20, 2026"
            value={formData.dates}
            onChange={(e) => setFormData({ ...formData, dates: e.target.value })}
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-stone-700 mb-1.5" htmlFor="requirements">
          Requirements
        </label>
        <textarea
          className="w-full rounded-lg border border-stone-200 px-4 py-2.5 focus:ring-2 focus:ring-amber-700 focus:border-amber-700 outline-none resize-none"
          id="requirements"
          rows={4}
          placeholder="Tell us about your event needs, meeting space requirements, etc."
          value={formData.requirements}
          onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-bronze text-white py-3 rounded-lg font-medium hover:bg-bronze/90 transition-colors"
      >
        Submit Inquiry
      </button>
    </form>
  );
}