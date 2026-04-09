import { MessageCircleMore } from "lucide-react";

export default function WhatsAppSection() {
  return (
    <section className="mt-8 rounded-[32px] border border-emerald-200 bg-[linear-gradient(135deg,#EFFFF6_0%,#FFFFFF_100%)] p-6 shadow-[0_20px_70px_rgba(22,101,52,0.08)] sm:p-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <span className="inline-flex rounded-full border border-emerald-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.26em] text-emerald-700">
            WhatsApp Section
          </span>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            Prefer to Chat?
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600">
            Send us a message on WhatsApp for a fast response. The direct
            WhatsApp link can be activated here as soon as the confirmed number
            is provided.
          </p>
        </div>

        <div className="flex flex-col items-start gap-3">
          <button
            type="button"
            disabled
            className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-base font-semibold text-white opacity-80"
          >
            <MessageCircleMore className="h-5 w-5" />
            Chat on WhatsApp
          </button>
          <p className="text-sm text-slate-500">
            WhatsApp number or link to be confirmed by client.
          </p>
        </div>
      </div>
    </section>
  );
}
