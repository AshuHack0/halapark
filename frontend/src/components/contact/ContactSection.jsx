import ContactFormPanel from "./ContactFormPanel";
import ContactInfoPanel from "./ContactInfoPanel";
import ContactMapSection from "./ContactMapSection";
import WhatsAppSection from "./WhatsAppSection";

export default function ContactSection() {
  return (
    <section className="bg-[linear-gradient(180deg,rgba(0,136,255,0.06)_0%,#FFFFFF_20%,#FFFFFF_100%)] pb-20 pt-32 sm:pb-24 sm:pt-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <span className="inline-flex rounded-full border border-[rgba(0,136,255,0.14)] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#0088FF]">
            Contact Us
          </span>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            Get In Touch With HalaPark
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-600 sm:text-xl">
            Have a question, want a demo, or ready to get started? Our team is
            here to help. Reach us through any of the channels below.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <ContactInfoPanel />
          <ContactFormPanel />
        </div>

        <WhatsAppSection />
        <ContactMapSection />
      </div>
    </section>
  );
}
