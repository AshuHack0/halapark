"use client";

import Image from "next/image";
import { useState } from "react";

const categories = [
  "All",
  "Industry News",
  "Product Updates",
  "Property Owners",
  "Drivers",
  "Technology",
];

const blogPosts = [
  {
    slug: "smart-parking-demand-2026",
    category: "Industry News",
    title: "Why Smart Parking Demand Keeps Rising Across Urban Properties",
    date: "March 18, 2026",
    readTime: "5 min read",
    description:
      "Cities, retail destinations, and mixed-use developments are investing in better parking experiences as occupancy pressure and driver expectations continue to climb.",
    image: "/imgi_188_WnsbD4yww7gkGwGcZ8z0c6oSc9U.png",
  },
  {
    slug: "halapark-owner-dashboard",
    category: "Product Updates",
    title: "Inside the New HalaPark Dashboard for Faster Parking Operations",
    date: "March 15, 2026",
    readTime: "4 min read",
    description:
      "A closer look at the latest operator tools for monitoring occupancy, tracking transactions, and improving day-to-day parking visibility.",
    image: "/imgi_183_duJmg8i6Rpv49UWkPseSAewzew.png",
  },
  {
    slug: "parking-revenue-for-property-owners",
    category: "Property Owners",
    title: "How Property Owners Can Turn Underused Bays Into Steady Revenue",
    date: "March 12, 2026",
    readTime: "6 min read",
    description:
      "From residential towers to commercial compounds, owners are rethinking pricing, access, and reporting to make parking assets work harder.",
    image: "/imgi_180_1kzCxED38jsjIKuhRBA6i4NjDGw.png",
  },
  {
    slug: "driver-experience-with-cashless-parking",
    category: "Drivers",
    title: "What Drivers Actually Want From a Modern Parking Experience",
    date: "March 9, 2026",
    readTime: "3 min read",
    description:
      "Speed at entry, transparent pricing, and simple mobile payments matter more than ever when drivers choose where and how to park.",
    image: "/imgi_183_duJmg8i6Rpv49UWkPseSAewzew.png",
  },
  {
    slug: "barrier-free-tech-explained",
    category: "Technology",
    title: "Barrier-Free Parking Explained: ANPR, Access Logic, and Payments",
    date: "March 6, 2026",
    readTime: "5 min read",
    description:
      "A practical breakdown of the technology stack behind seamless parking journeys, including licence plate recognition and digital checkout.",
    image: "/imgi_188_WnsbD4yww7gkGwGcZ8z0c6oSc9U.png",
  },
  {
    slug: "portfolio-level-parking-reporting",
    category: "Property Owners",
    title: "The Metrics Property Teams Should Track Across Every Parking Site",
    date: "March 2, 2026",
    readTime: "7 min read",
    description:
      "Occupancy, peak arrival windows, failed payments, and repeat users can reveal where parking friction is hurting both revenue and reputation.",
    image: "/imgi_180_1kzCxED38jsjIKuhRBA6i4NjDGw.png",
  },
];

const categoryStyles = {
  "Industry News": "bg-slate-100 text-slate-700",
  "Product Updates": "bg-[rgba(0,136,255,0.10)] text-[#0088FF]",
  "Property Owners": "bg-emerald-100 text-emerald-700",
  Drivers: "bg-amber-100 text-amber-700",
  Technology: "bg-violet-100 text-violet-700",
};

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPosts =
    activeCategory === "All"
      ? blogPosts
      : blogPosts.filter((post) => post.category === activeCategory);

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <section className="relative overflow-hidden bg-[linear-gradient(180deg,rgba(0,136,255,0.06)_0%,#ffffff_72%)]">
        <div className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top_right,rgba(0,136,255,0.20),transparent_48%)]" />
        <div className="absolute -left-16 top-20 h-56 w-56 rounded-full bg-[rgba(0,136,255,0.12)] blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div className="max-w-4xl">
              <span className="inline-flex rounded-full border border-[rgba(0,136,255,0.16)] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#0088FF] shadow-sm">
                Blog &amp; Insights
              </span>

              <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-[64px] lg:leading-[1.05]">
                Parking News, Tips &amp; Industry Insights
              </h1>

              <p className="mt-6 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
                Stay up to date with smart parking trends, HalaPark updates,
                and practical guides for property owners and drivers.
              </p>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white/90 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#0088FF]">
                What You&apos;ll Find Here
              </p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-2xl font-semibold text-slate-950">06</p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    Featured reads across technology, drivers, and operations
                  </p>
                </div>
                <div className="rounded-2xl bg-[rgba(0,136,255,0.08)] p-4">
                  <p className="text-2xl font-semibold text-slate-950">05</p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    Focus categories for owners, operators, and drivers
                  </p>
                </div>
              </div>
              <p className="mt-5 text-sm leading-7 text-slate-600">
                Fresh thinking on parking operations, product updates, and the
                trends shaping smarter mobility.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-4 shadow-[0_12px_40px_rgba(15,23,42,0.05)] sm:p-5">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => {
              const isActive = activeCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition sm:px-5 ${
                    isActive
                      ? "bg-[#0088FF] text-white shadow-sm"
                      : "bg-white text-slate-600 hover:bg-[rgba(0,136,255,0.08)] hover:text-[#0088FF]"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#0088FF]">
              Blog Listing
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              {activeCategory === "All"
                ? "Latest articles and insights"
                : `${activeCategory} articles`}
            </h2>
          </div>

          <p className="text-sm leading-7 text-slate-600">
            Showing {filteredPosts.length} post
            {filteredPosts.length === 1 ? "" : "s"}.
          </p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredPosts.map((post) => (
            <article
              key={post.slug}
              id={post.slug}
              className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.07)] transition hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(15,23,42,0.12)]"
            >
              <div className="relative h-56 overflow-hidden bg-slate-100">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(min-width: 1280px) 384px, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950/35 to-transparent" />
              </div>

              <div className="p-6 sm:p-7">
                <div className="flex flex-wrap items-center gap-3 text-sm">
                  <span
                    className={`rounded-full px-3 py-1 font-semibold ${
                      categoryStyles[post.category]
                    }`}
                  >
                    {post.category}
                  </span>
                  <span className="text-slate-400">|</span>
                  <span className="text-slate-500">{post.date}</span>
                </div>

                <h3 className="mt-5 text-2xl font-semibold tracking-tight text-slate-950">
                  {post.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
                  {post.description}
                </p>

                <div className="mt-6 flex items-center justify-between gap-4">
                  <span className="text-sm font-medium text-slate-500">
                    {post.readTime}
                  </span>

                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#0088FF]">
                    Read More
                    <span aria-hidden="true">-&gt;</span>
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,#081a33_0%,#0088FF_58%,#0088FF_100%)] shadow-[0_28px_70px_rgba(0,136,255,0.25)]">
          <div className="grid gap-8 p-8 text-white sm:p-10 lg:grid-cols-[1.05fr_0.95fr] lg:p-12">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#0088FF]">
                Newsletter Signup
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                Get Parking Insights Delivered
              </h2>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-[#0088FF]/90 sm:text-base">
                Subscribe for smart parking updates, product news, and helpful
                guides for property owners, operators, and drivers.
              </p>
            </div>

            <form
              onSubmit={(event) => event.preventDefault()}
              className="rounded-[1.75rem] border border-white/15 bg-white/10 p-6 backdrop-blur-sm sm:p-7"
            >
              <label
                htmlFor="newsletter-email"
                className="text-sm font-semibold uppercase tracking-[0.22em] text-[#0088FF]"
              >
                Subscribe
              </label>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <input
                  id="newsletter-email"
                  type="email"
                  placeholder="Enter your email"
                  className="h-12 flex-1 rounded-xl border border-white/20 bg-white px-4 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-[rgba(0,136,255,0.16)]"
                />
                <button
                  type="submit"
                  className="inline-flex h-12 items-center justify-center rounded-xl bg-slate-950 px-6 text-sm font-semibold text-white transition hover:bg-slate-900"
                >
                  Subscribe
                </button>
              </div>
              <p className="mt-4 text-sm leading-6 text-[#0088FF]/85">
                One helpful email at a time. No clutter, just relevant parking
                insights.
              </p>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
