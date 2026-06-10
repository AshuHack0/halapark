"use client";

import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useState } from "react";

export default function ContactMapSection() {
  const [mapLoaded, setMapLoaded] = useState(true);

  const officeLocation = {
    name: "HalaPark Office",
    address: "Dubai, United Arab Emirates",
    phone: "+971 4 3782022",
    email: "info@halapark.com",
    hours: "Monday - Friday: 9:00 AM - 6:00 PM",
    latitude: 25.2048,
    longitude: 55.2708,
  };

  // Google Maps embed URL with the office location
  const mapEmbedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3611.0816849547654!2d${officeLocation.longitude}!3d${officeLocation.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43348c88e54b%3A0x1234567890abcdef!2s${encodeURIComponent(officeLocation.address)}!5e0!3m2!1sen!2sae!4v1234567890`;

  return (
    <section className="mt-8 overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
      <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
        {/* Left Panel: Office Info */}
        <div className="border-b border-slate-200 bg-[linear-gradient(180deg,rgba(0,136,255,0.05)_0%,#FFFFFF_100%)] p-6 sm:p-8 lg:border-b-0 lg:border-r">
          <span className="inline-flex rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.26em] text-slate-600">
            Map
          </span>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            Office location
          </h2>

          <div className="mt-8 space-y-6">
            {/* Address */}
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[rgba(0,136,255,0.1)]">
                <MapPin className="h-5 w-5 text-[#0088FF]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-600 uppercase tracking-[0.08em]">
                  Address
                </p>
                <p className="mt-1 text-base text-slate-900 font-medium">
                  {officeLocation.address}
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  {officeLocation.name}
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[rgba(0,136,255,0.1)]">
                <Phone className="h-5 w-5 text-[#0088FF]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-600 uppercase tracking-[0.08em]">
                  Phone
                </p>
                <a
                  href={`tel:${officeLocation.phone.replace(/\s/g, "")}`}
                  className="mt-1 text-base text-[#0088FF] font-medium hover:underline"
                >
                  {officeLocation.phone}
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[rgba(0,136,255,0.1)]">
                <Mail className="h-5 w-5 text-[#0088FF]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-600 uppercase tracking-[0.08em]">
                  Email
                </p>
                <a
                  href={`mailto:${officeLocation.email}`}
                  className="mt-1 text-base text-[#0088FF] font-medium hover:underline"
                >
                  {officeLocation.email}
                </a>
              </div>
            </div>

            {/* Hours */}
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[rgba(0,136,255,0.1)]">
                <Clock className="h-5 w-5 text-[#0088FF]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-600 uppercase tracking-[0.08em]">
                  Business Hours
                </p>
                <p className="mt-1 text-base text-slate-900 font-medium">
                  {officeLocation.hours}
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  Saturday & Sunday: Closed
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel: Google Map */}
        <div className="relative min-h-[400px] overflow-hidden bg-white">
          {mapLoaded ? (
            <iframe
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "400px" }}
              loading="lazy"
              allowFullScreen=""
              referrerPolicy="no-referrer-when-downgrade"
              src={mapEmbedUrl}
              title="HalaPark Office Location"
            />
          ) : (
            <div className="flex min-h-[400px] items-center justify-center bg-[radial-gradient(circle_at_top,rgba(0,136,255,0.12)_0%,rgba(0,136,255,0.05)_38%,#FFFFFF_100%)] p-6">
              <div className="flex w-full max-w-md flex-col items-center rounded-[28px] border border-dashed border-slate-300 bg-white/85 px-6 py-10 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[rgba(0,136,255,0.08)] text-[#0088FF]">
                  <MapPin className="h-8 w-8" />
                </div>
                <p className="mt-5 text-lg font-semibold text-slate-900">
                  Loading map...
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
