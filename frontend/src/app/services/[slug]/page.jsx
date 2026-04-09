import { notFound } from "next/navigation";
import Link from "next/link";
import {
  servicesBySlug,
  servicesData,
  servicesPageHero,
} from "@/modules/home/servicesData";

export function generateStaticParams() {
  return servicesData.map((service) => ({ slug: service.slug }));
}

export default async function ServiceDetailPage({ params }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const service = servicesBySlug[slug];

  if (!service) {
    notFound();
  }

  const serviceIndex = servicesData.findIndex((item) => item.slug === slug);
  const relatedServices = servicesData.filter((item) => item.slug !== slug);

  return (
    <main className="bg-[rgba(0,136,255,0.05)]">
      <section className="border-b border-[rgba(0,136,255,0.14)] bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-18">
          <Link
            href="/#what-we-do"
            className="inline-flex items-center rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-[#0088FF] hover:text-[#0088FF]"
          >
            Back to Services
          </Link>

          <div className="mt-8 max-w-4xl">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#0088FF]">
              {servicesPageHero.tag}
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl lg:text-6xl">
              {servicesPageHero.headline}
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
              {servicesPageHero.subtext}
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-14 md:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <article className="rounded-[2rem] border border-[rgba(0,136,255,0.14)] bg-white p-6 shadow-[0_18px_48px_rgba(15,23,42,0.06)] sm:p-8 md:p-10">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#0088FF]">
                Service {serviceIndex + 1}
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                {service.detailHeadline}
              </h2>
              <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
                {service.detailBody}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={service.detailCtaHref}
                  className="inline-flex items-center justify-center rounded-full bg-[#0088FF] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0088FF]"
                >
                  {service.detailCtaLabel}
                </Link>
                <Link
                  href="/#what-we-do"
                  className="inline-flex items-center justify-center rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-[#0088FF] hover:text-[#0088FF]"
                >
                  View All Services
                </Link>
              </div>
            </article>

            <aside className="rounded-[2rem] bg-[#103d73] p-6 text-white shadow-[0_18px_48px_rgba(15,23,42,0.12)] sm:p-8">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-[rgba(0,136,255,0.30)]">
                {service.name}
              </p>
              <p className="mt-4 text-2xl font-semibold leading-tight sm:text-3xl">
                Built to simplify the full parking journey.
              </p>
              <p className="mt-4 text-sm leading-7 text-white/80 sm:text-base">
                {service.summary}
              </p>

              <div className="mt-8 space-y-3">
                {service.highlights.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/15 bg-white/10 px-4 py-4 text-sm leading-6 text-white/90"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </aside>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            <section className="rounded-[1.5rem] border border-[rgba(0,136,255,0.14)] bg-white p-5 sm:p-6">
              <h3 className="text-lg font-semibold text-slate-900">
                Key Highlights
              </h3>
              <div className="mt-4 space-y-3">
                {service.highlights.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-600"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[1.5rem] border border-[rgba(0,136,255,0.14)] bg-white p-5 sm:p-6">
              <h3 className="text-lg font-semibold text-slate-900">
                Typical Use Cases
              </h3>
              <div className="mt-4 space-y-3">
                {service.useCases.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-600"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[1.5rem] border border-[rgba(0,136,255,0.14)] bg-white p-5 sm:p-6">
              <h3 className="text-lg font-semibold text-slate-900">
                Expected Outcomes
              </h3>
              <div className="mt-4 space-y-3">
                {service.outcomes.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-[rgba(0,136,255,0.14)] bg-[#f4f9ff] px-4 py-3 text-sm leading-6 text-slate-700"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </section>
          </div>

          <section className="mt-10">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#0088FF]">
                  More Services
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
                  Explore the rest of the platform
                </h2>
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {relatedServices.map((item) => (
                <article
                  key={item.slug}
                  className="rounded-[1.5rem] border border-[rgba(0,136,255,0.14)] bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.04)]"
                >
                  <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#0088FF]">
                    {item.name}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {item.summary}
                  </p>
                  <Link
                    href={`/services/${item.slug}`}
                    className="mt-5 inline-flex text-sm font-semibold text-[#0088FF] transition hover:text-[#0088FF]"
                  >
                    View Service
                  </Link>
                </article>
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
