import Link from "next/link";

const solutionCards = [
  {
    eyebrow: "Solution 1",
    title: "One Platform. All Systems Connected.",
    description:
      "Barrier cameras, ANPR, RFID, operator dashboards, and app payments are all integrated and managed from a single system. No fragmented tools. No manual workarounds.",
  },
  {
    eyebrow: "Solution 2",
    title: "Full Visibility. Real-Time Control.",
    description:
      "Monitor occupancy, revenue, transactions, and incidents from a single cloud-based dashboard - accessible from anywhere, 24/7.",
  },
  {
    eyebrow: "Solution 3",
    title: "Built for Scale.",
    description:
      "Whether you manage 5 bays or 500, HalaPark scales with you. Tailored deployments for residential towers, retail malls, hospitals, and corporate campuses.",
  },
];

const integrationCategories = [
  "Payment Gateways",
  "Access Control Systems",
  "Property Management Platforms",
  "Building Management Systems",
];

export default function SolutionsPage() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <section className="relative overflow-hidden bg-[linear-gradient(180deg,rgba(0,136,255,0.06)_0%,#ffffff_70%)]">
        <div className="absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle_at_top_right,rgba(0,136,255,0.18),transparent_52%)]" />
        <div className="absolute left-0 top-24 h-72 w-72 rounded-full bg-[rgba(0,136,255,0.10)] blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="max-w-4xl">
            <span className="inline-flex rounded-full border border-[rgba(0,136,255,0.16)] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#0088FF] shadow-sm">
              Our Solutions
            </span>

            <h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-[64px] lg:leading-[1.05]">
              Intelligent Parking Technology, Ready to Integrate
            </h1>

            <p className="mt-6 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
              HalaPark connects with your existing infrastructure - no ripping
              out, no starting over. Our platform layers on top of what you have
              and makes it smarter.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl bg-[#0088FF] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0088FF]"
              >
                Request a Demo
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:border-[rgba(0,136,255,0.16)] hover:bg-[rgba(0,136,255,0.08)]"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)] sm:p-8 lg:p-10">
          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#0088FF]">
                System Integration
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                Built to work with the parking ecosystem you already run.
              </h2>
            </div>

            <p className="text-sm leading-7 text-slate-600 sm:text-base">
              From entry hardware to back-office tools, HalaPark unifies the
              moving parts into one connected operating layer for parking owners
              and enterprise teams.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {integrationCategories.map((category) => (
              <div
                key={category}
                className="rounded-2xl border border-slate-200 bg-white px-5 py-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-4 h-11 w-11 rounded-2xl bg-[linear-gradient(135deg,#0088FF,#0088FF)]" />
                <p className="text-base font-semibold text-slate-900">
                  {category}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {solutionCards.map((card, index) => (
            <article
              key={card.title}
              className="group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(15,23,42,0.12)] sm:p-8"
            >
              <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-[rgba(0,136,255,0.12)] blur-3xl transition group-hover:bg-[rgba(0,136,255,0.18)]" />
              <div className="relative">
                <div className="flex items-center justify-between gap-4">
                  <span className="inline-flex rounded-full border border-[rgba(0,136,255,0.12)] bg-[rgba(0,136,255,0.08)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-[#0088FF]">
                    {card.eyebrow}
                  </span>
                  <span className="text-4xl font-semibold leading-none text-slate-200">
                    0{index + 1}
                  </span>
                </div>

                <h3 className="mt-8 text-2xl font-semibold tracking-tight text-slate-950">
                  {card.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
                  {card.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="rounded-[2rem] bg-[linear-gradient(135deg,#0f172a_0%,#0088FF_55%,#0088FF_100%)] p-8 text-white shadow-[0_28px_70px_rgba(0,136,255,0.24)] sm:p-10 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#0088FF]">
                Enterprise Deployment
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                Technology and integration solutions for property owners and
                enterprises.
              </h2>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-[#0088FF]/90 sm:text-base">
                B2B-focused deployment across mixed-use developments,
                residential communities, retail destinations, healthcare
                campuses, and corporate portfolios.
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-white/15 bg-white/10 p-6 backdrop-blur-sm sm:p-7">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#0088FF]">
                Integrates with Your Existing Setup
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                {integrationCategories.map((category) => (
                  <span
                    key={category}
                    className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="rounded-[2rem] border border-slate-200 bg-[#f8fbff] p-8 shadow-[0_18px_50px_rgba(15,23,42,0.06)] sm:p-10 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#0088FF]">
                Ready to Modernise Your Parking?
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                Move from disconnected tools to one intelligent parking layer.
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                We help owners and operators modernise without replacing the
                infrastructure they already trust.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link
                href="/contact"
                className="inline-flex min-w-[190px] items-center justify-center rounded-xl bg-[#0088FF] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0088FF]"
              >
                Request a Demo
              </Link>
              <Link
                href="/contact"
                className="inline-flex min-w-[190px] items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:border-[rgba(0,136,255,0.16)] hover:bg-[rgba(0,136,255,0.08)]"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
