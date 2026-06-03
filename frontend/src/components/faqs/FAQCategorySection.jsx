"use client";

import { useMemo, useState } from "react";
import {
  BadgePercent,
  BellRing,
  Building2,
  CalendarCheck2,
  CarFront,
  ChevronDown,
  Clock3,
  Droplets,
  Headset,
  KeyRound,
  LockKeyhole,
  MapPin,
  PlayCircle,
  PlugZap,
  ScanLine,
  Settings2,
  ShieldAlert,
  ShieldCheck,
  Smartphone,
  Store,
  Truck,
  TriangleAlert,
  WalletCards,
} from "lucide-react";

const iconMap = {
  BadgePercent,
  BellRing,
  Building2,
  CalendarCheck2,
  CarFront,
  Clock3,
  Droplets,
  Headset,
  KeyRound,
  LockKeyhole,
  MapPin,
  PlayCircle,
  PlugZap,
  ScanLine,
  Settings2,
  ShieldAlert,
  ShieldCheck,
  Smartphone,
  Store,
  Truck,
  TriangleAlert,
  WalletCards,
};

function normalizeVideoUrl(url) {
  if (!url || typeof url !== "string") return null;
  const trimmed = url.trim();
  if (!trimmed) return null;

  // Already embeddable URL
  if (trimmed.includes("youtube.com/embed/") || trimmed.includes("player.vimeo.com/video/")) {
    return trimmed;
  }

  // Convert common YouTube watch/share links to embed links
  try {
    const parsed = new URL(trimmed);
    if (parsed.hostname.includes("youtube.com")) {
      const id = parsed.searchParams.get("v");
      if (id) return `https://www.youtube.com/embed/${id}`;
    }
    if (parsed.hostname === "youtu.be") {
      const id = parsed.pathname.replace("/", "");
      if (id) return `https://www.youtube.com/embed/${id}`;
    }
    // Convert a Google Drive *file* link to its embeddable preview form.
    // Drive *folder* links cannot be embedded — those fall through and are
    // surfaced as a normal "Open tutorial" link instead (see render below).
    if (parsed.hostname.includes("drive.google.com")) {
      const fileMatch = parsed.pathname.match(/\/file\/d\/([^/]+)/);
      if (fileMatch) return `https://drive.google.com/file/d/${fileMatch[1]}/preview`;
      return null;
    }
  } catch {
    return null;
  }

  return trimmed;
}

function externalLink(url) {
  if (!url || typeof url !== "string") return null;
  const trimmed = url.trim();
  return trimmed ? trimmed : null;
}

// Direct video file (Cloudinary raw upload, or a plain .mp4/.webm/.mov/.ogg
// link) — rendered with a native <video> player rather than an iframe.
function directVideoSrc(url) {
  if (!url || typeof url !== "string") return null;
  const trimmed = url.trim();
  if (!trimmed) return null;
  try {
    const parsed = new URL(trimmed);
    const path = parsed.pathname.toLowerCase();
    if (/\.(mp4|webm|mov|ogg|m4v)$/.test(path)) return trimmed;
    // Cloudinary raw video delivery URLs (e.g. .../video/upload/...) may omit
    // the extension but are still direct files.
    if (parsed.hostname.includes("res.cloudinary.com") && path.includes("/video/upload/")) {
      return trimmed;
    }
  } catch {
    return null;
  }
  return null;
}

// Collect every non-empty video URL for an item, supporting the dynamic
// `videos` array as well as the legacy single `videoUrl` field.
function collectVideos(item) {
  const list = [];
  if (Array.isArray(item.videos)) list.push(...item.videos);
  if (item.videoUrl) list.push(item.videoUrl);
  return list
    .map((u) => (typeof u === "string" ? u.trim() : ""))
    .filter(Boolean);
}

export default function FAQCategorySection({ categories = [] }) {
  const [activeCategoryId, setActiveCategoryId] = useState(categories[0]?.id);
  const makeKey = (catId, itemId) => `${catId}::${itemId}`;
  const [openQuestionKey, setOpenQuestionKey] = useState(
    categories[0] ? makeKey(categories[0].id, categories[0].items?.[0]?.id ?? "") : null
  );

  const activeCategory = useMemo(
    () => categories.find((c) => c.id === activeCategoryId),
    [activeCategoryId, categories]
  );

  const handleCategoryClick = (category) => {
    setActiveCategoryId(category.id);
    setOpenQuestionKey(category.items[0] ? makeKey(category.id, category.items[0].id) : null);
  };

  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section heading */}
        <div className="mx-auto mb-12 max-w-[780px] text-center">
          <h2 className="text-[clamp(2.4rem,4.5vw,3.8rem)] font-semibold leading-[1.01] tracking-[-0.06em] text-[#050A13]">
            What would you like to{" "}
            <span className="bg-gradient-to-r from-[#0088FF] to-[#1AB2FF] bg-clip-text text-transparent">
              know?
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-[560px] text-[0.88rem] leading-6 text-slate-500 sm:text-[0.94rem]">
            Browse by category to find quick answers, or scroll through all topics below.
          </p>
        </div>

        {categories.length === 0 ? (
          <div className="mx-auto max-w-3xl rounded-[20px] border border-[#E7EAF0] bg-[#F8FBFF] px-6 py-8 text-center">
            <p className="text-sm text-slate-500">
              No FAQs configured yet. Add <code className="text-xs">sections.faqCategories</code> from admin panel for the FAQs page.
            </p>
          </div>
        ) : (
        <div className="grid gap-8 lg:grid-cols-[260px_1fr] lg:items-start lg:gap-10">

          {/* LEFT: sticky category list */}
          <div className="lg:sticky lg:top-24">
            <div className="rounded-[20px] border border-[#E7EAF0] bg-white p-3 shadow-[0_4px_24px_rgba(6,6,22,0.05)]">
              <p className="mb-2 px-3 pt-1 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-slate-400">Categories</p>
              <ul className="space-y-0.5">
                {categories.map((category) => {
                  const Icon = iconMap[category.icon] ?? Building2;
                  const isActive = category.id === activeCategoryId;
                  return (
                    <li key={category.id}>
                      <button
                        type="button"
                        onClick={() => handleCategoryClick(category)}
                        className={`group flex w-full items-center gap-3 rounded-[12px] px-3 py-2.5 text-left transition-all duration-200 ${
                          isActive
                            ? "bg-[#0088FF] text-white"
                            : "text-[#050A13] hover:bg-[#F4F8FF]"
                        }`}
                      >
                        <Icon className={`h-3.5 w-3.5 shrink-0 ${isActive ? "text-white" : "text-[#0088FF]"}`} strokeWidth={1.8} aria-hidden />
                        <span className={`flex-1 text-[0.82rem] font-medium leading-snug ${isActive ? "text-white" : "text-[#050A13]"}`}>
                          {category.title}
                        </span>
                        <span className={`text-[0.72rem] font-semibold tabular-nums ${isActive ? "text-white/70" : "text-slate-300"}`}>
                          {category.items.length}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* RIGHT: Accordion */}
          <div className="min-w-0">
            <div className="mb-5 flex items-center gap-3">
              {(() => {
                const Icon = iconMap[activeCategory?.icon] ?? Building2;
                return (
                  <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-[#EEF6FF]">
                    <Icon className="h-5 w-5 text-[#0088FF]" strokeWidth={1.7} aria-hidden />
                  </div>
                );
              })()}
              <div>
                <h3 className="text-[1.05rem] font-semibold tracking-[-0.02em] text-[#050A13]">{activeCategory?.title}</h3>
                <p className="text-[0.78rem] text-slate-400">{activeCategory?.items.length} questions</p>
              </div>
            </div>

            <div className="divide-y divide-slate-100 rounded-[20px] border border-[#E7EAF0] bg-white shadow-[0_4px_24px_rgba(6,6,22,0.05)]">
              {activeCategory?.items?.map((item) => {
                const key = makeKey(activeCategoryId, item.id);
                const isOpen = openQuestionKey === key;
                return (
                  <div key={key}>
                    <button
                      type="button"
                      onClick={() => setOpenQuestionKey(isOpen ? null : key)}
                      className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                      aria-expanded={isOpen}
                      aria-controls={`${key}-content`}
                    >
                      <span className={`text-[0.94rem] font-medium leading-snug transition-colors ${isOpen ? "text-[#0088FF]" : "text-[#050A13]"}`}>
                        {item.question}
                      </span>
                      <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                        isOpen ? "border-[#0088FF] bg-[#0088FF] text-white" : "border-[#E7EAF0] bg-white text-slate-400"
                      }`}>
                        <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} strokeWidth={2.5} aria-hidden />
                      </span>
                    </button>
                    {isOpen && (
                      <div id={`${key}-content`} className="px-6 pb-5">
                        {item.answer && (
                          <p className="text-[0.88rem] leading-6 text-slate-500">{item.answer}</p>
                        )}
                        {(() => {
                          const videos = collectVideos(item);
                          const folder = externalLink(item.videoFolderUrl);
                          if (videos.length === 0 && !folder) return null;
                          // Single video → full width. Two or more → 2-up grid
                          // (50% each on sm+, stacking on mobile).
                          const multi = videos.length > 1;
                          return (
                            <div
                              className={`mt-4 grid gap-3 ${multi ? "sm:grid-cols-2" : "grid-cols-1"}`}
                            >
                              {videos.map((url, i) => {
                                const fileSrc = directVideoSrc(url);
                                const embed = fileSrc ? null : normalizeVideoUrl(url);
                                return fileSrc ? (
                                  <div key={`${key}-vid-${i}`} className="overflow-hidden rounded-[14px] border border-[#E7EAF0] bg-black">
                                    <video
                                      src={fileSrc}
                                      controls
                                      preload="metadata"
                                      playsInline
                                      className="aspect-video w-full"
                                    />
                                  </div>
                                ) : embed ? (
                                  <div key={`${key}-vid-${i}`} className="overflow-hidden rounded-[14px] border border-[#E7EAF0]">
                                    <iframe
                                      src={embed}
                                      title={`${item.question} — video ${i + 1}`}
                                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                      allowFullScreen
                                      className="aspect-video w-full"
                                    />
                                  </div>
                                ) : (
                                  <a
                                    key={`${key}-vid-${i}`}
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 self-start rounded-full bg-[#EEF6FF] px-4 py-2 text-[0.82rem] font-semibold text-[#0088FF] transition hover:bg-[#DCEEFF]"
                                  >
                                    <PlayCircle className="h-4 w-4" strokeWidth={2} aria-hidden />
                                    {videos.length > 1 ? `Watch video ${i + 1}` : "Open video tutorial"}
                                  </a>
                                );
                              })}
                              {videos.length === 0 && folder ? (
                                <a
                                  href={folder}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 self-start rounded-full bg-[#EEF6FF] px-4 py-2 text-[0.82rem] font-semibold text-[#0088FF] transition hover:bg-[#DCEEFF]"
                                >
                                  <PlayCircle className="h-4 w-4" strokeWidth={2} aria-hidden />
                                  Open video tutorials
                                </a>
                              ) : null}
                            </div>
                          );
                        })()}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>
        )}
      </div>
    </section>
  );
}
