import { ArrowUpRight } from "lucide-react";

import { contactDetails } from "./contactData";

function ContactDetailItem({ detail }) {
  const Icon = detail.icon;
  const value = detail.href ? (
    <a
      href={detail.href}
      className="inline-flex items-center gap-2 text-base font-semibold text-slate-900 transition hover:text-[#0088FF]"
    >
      {detail.value}
      <ArrowUpRight className="h-4 w-4" />
    </a>
  ) : (
    <p className="text-base font-semibold text-slate-900">{detail.value}</p>
  );

  return (
    <li className="rounded-[28px] border border-slate-200 bg-white/90 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[rgba(0,136,255,0.08)] text-[#0088FF]">
          <Icon className="h-5 w-5" />
        </div>

        <div className="min-w-0">
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-slate-500">
            {detail.title}
          </p>
          <div className="mt-2 break-words">{value}</div>
          {detail.description ? (
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {detail.description}
            </p>
          ) : null}
        </div>
      </div>
    </li>
  );
}

export default function ContactInfoPanel() {
  return (
    <aside className="rounded-[32px] border border-slate-200 bg-[linear-gradient(180deg,#FFFFFF_0%,rgba(0,136,255,0.06)_100%)] p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:p-8">
      <div className="max-w-md">
        <span className="inline-flex rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.26em] text-slate-600">
          Contact Info
        </span>
        <h2 className="mt-5 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
          Reach the HalaPark team through the channel that works best for you.
        </h2>
        <p className="mt-4 text-base leading-7 text-slate-600">
          Need product guidance, technical support, or a business conversation?
          Start with any of the details below and we will route your enquiry to
          the right team.
        </p>
      </div>

      <ul className="mt-8 space-y-4">
        {contactDetails.map((detail) => (
          <ContactDetailItem key={detail.title} detail={detail} />
        ))}
      </ul>
    </aside>
  );
}
