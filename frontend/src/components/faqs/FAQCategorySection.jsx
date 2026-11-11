"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
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
import { fetchPage } from "@/lib/cms";
import { useLanguage, t } from "@/context/LanguageContext";
import RichText from "@/components/common/RichText";

// Fixed FAQ-page chrome — inline EN/AR. Only functional labels live here; the
// heading/subtitle/search placeholder come from the CMS (sections.searchHeader).
const FAQ_UI = {
  categories: { en: "Categories", ar: "الفئات" },
  questions: { en: "questions", ar: "سؤال" },
  noMatch: { en: "No FAQs match your search. Try a different query.", ar: "لا توجد أسئلة تطابق بحثك. جرّب كلمة أخرى." },
};

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

// YouTube video id from any common link form — watch?v=, youtu.be/, /shorts/,
// /embed/, /live/, /v/, m./music. hosts, youtube-nocookie. "" when the link is
// not a YouTube video. (Same rule as the admin's validator.)
function youtubeId(url) {
  const v = (typeof url === "string" ? url : "").trim();
  if (!v) return "";
  let u;
  try { u = new URL(/^https?:\/\//i.test(v) ? v : `https://${v}`); } catch { return ""; }
  const host = u.hostname.replace(/^(www\.|m\.|music\.)/, "");
  let id = "";
  if (host === "youtu.be") id = u.pathname.split("/")[1] || "";
  else if (host === "youtube.com" || host === "youtube-nocookie.com") {
    id = u.searchParams.get("v") || "";
    if (!id) {
      const m = u.pathname.match(/^\/(?:shorts|embed|live|v)\/([^/?#]+)/);
      if (m) id = m[1];
    }
  }
  return /^[A-Za-z0-9_-]{11}$/.test(id) ? id : "";
}

function youtubeEmbed(url) {
  const id = youtubeId(url);
  return id ? `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1` : null;
}

function normalizeVideoUrl(url) {
  if (!url || typeof url !== "string") return null;
  const trimmed = url.trim();
  if (!trimmed) return null;

  // Any YouTube link form (incl. Shorts) → embed URL.
  const yt = youtubeEmbed(trimmed);
  if (yt) return yt;

  // Already embeddable URL
  if (trimmed.includes("player.vimeo.com/video/")) {
    return trimmed;
  }

  try {
    const parsed = new URL(trimmed);
    // Any other YouTube URL (channel, playlist page…) can't be framed —
    // fall back to a plain "Open video" link.
    if (parsed.hostname.includes("youtube.com") || parsed.hostname === "youtu.be") return null;
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

export default function FAQCategorySection({ categories: rawCategories = [] }) {
  const { language } = useLanguage();
  // A question is listed when it has an answer OR a video (in the current
  // language — the Arabic page uses the Arabic answer/YouTube link). With
  // neither it's hidden; a category left with no questions is hidden too.
  const categories = useMemo(
    () =>
      (Array.isArray(rawCategories) ? rawCategories : [])
        .map((cat) => ({
          ...cat,
          items: (cat.items || []).filter((item) => {
            const hasAnswer = String(t(item, "answer", language) ?? "").replace(/<[^>]*>/g, "").trim() !== "";
            const hasVideo =
              Boolean(youtubeEmbed(language === "ar" ? item.ar?.youtubeUrl : item.youtubeUrl)) ||
              collectVideos(item).length > 0 ||
              Boolean(externalLink(item.videoFolderUrl));
            return hasAnswer || hasVideo;
          }),
        }))
        .filter((cat) => cat.items.length > 0),
    [rawCategories, language],
  );
  const fq = (key) => FAQ_UI[key]?.[language] ?? FAQ_UI[key]?.en ?? "";
  const [searchHeader, setSearchHeader] = useState(null);
  const [activeCategoryId, setActiveCategoryId] = useState(categories[0]?.id);
  const [searchQuery, setSearchQuery] = useState("");
  const makeKey = (catId, itemId) => `${catId}::${itemId}`;
  const [openQuestionKey, setOpenQuestionKey] = useState(
    categories[0] ? makeKey(categories[0].id, categories[0].items?.[0]?.id ?? "") : null
  );

  // The search header (heading/subtitle/placeholder) is CMS-driven — fetch once.
  useEffect(() => {
    let active = true;
    fetchPage("faqs").then((data) => {
      if (active) setSearchHeader(data?.sections?.searchHeader ?? null);
    });
    return () => {
      active = false;
    };
  }, []);

  // Search matches the question/answer text in the CURRENT language (HTML
  // tags in rich answers ignored).
  const plain = (v) => String(v ?? "").replace(/<[^>]*>/g, " ").toLowerCase();
  const filteredCategories = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return categories;
    return categories
      .map((cat) => ({
        ...cat,
        items: (cat.items || []).filter(
          (item) =>
            plain(t(item, "question", language)).includes(query) ||
            plain(t(item, "answer", language)).includes(query)
        ),
      }))
      .filter((cat) => cat.items.length > 0);
  }, [categories, searchQuery, language]);

  // While searching, the question panel shows the MATCHING questions (the
  // selected category if it has matches, else the first category that does) —
  // previously it kept showing the unfiltered category, so hits were invisible.
  const activeCategory = useMemo(() => {
    const list = searchQuery.trim() ? filteredCategories : categories;
    return list.find((c) => c.id === activeCategoryId) ?? list[0];
  }, [activeCategoryId, categories, filteredCategories, searchQuery]);

  // Typing a search opens the first matching question so the hit is visible.
  useEffect(() => {
    if (!searchQuery.trim()) return;
    const cat = filteredCategories.find((c) => c.id === activeCategoryId) ?? filteredCategories[0];
    if (cat?.items?.[0]) setOpenQuestionKey(makeKey(cat.id, cat.items[0].id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  const handleCategoryClick = (category) => {
    setActiveCategoryId(category.id);
    setOpenQuestionKey(category.items[0] ? makeKey(category.id, category.items[0].id) : null);
  };

  // Admin "Show this section on the website" toggle (Search Header section).
  if (searchHeader?.enabled === false) return null;

  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section heading — CMS-driven (sections.searchHeader) */}
        <div className="mx-auto mb-12 max-w-[780px] text-center">
          {t(searchHeader, "heading", language) || t(searchHeader, "headingAccent", language) ? (
            <h2 className="text-[clamp(2.4rem,4.5vw,3.8rem)] font-semibold leading-[1.01] tracking-[-0.06em] text-[#050A13] [overflow-wrap:anywhere]" dir={language === "ar" ? "rtl" : "ltr"}>
              {t(searchHeader, "heading", language)}{" "}
              {t(searchHeader, "headingAccent", language) ? (
                <span className="bg-gradient-to-r from-[#0088FF] to-[#1AB2FF] bg-clip-text text-transparent">
                  {t(searchHeader, "headingAccent", language)}
                </span>
              ) : null}
            </h2>
          ) : null}
          {t(searchHeader, "subtitle", language) ? (
            <p className="mx-auto mt-4 max-w-[560px] text-[0.88rem] leading-6 text-slate-500 sm:text-[0.94rem] [overflow-wrap:anywhere]" dir={language === "ar" ? "rtl" : "ltr"}>
              {t(searchHeader, "subtitle", language)}
            </p>
          ) : null}

          {/* Search input */}
          <div className="mt-8">
            <input
              type="text"
              placeholder={t(searchHeader, "searchPlaceholder", language) || ""}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              dir={language === "ar" ? "rtl" : "ltr"}
              className="mx-auto block w-full max-w-md rounded-full border border-[#E7EAF0] bg-white px-5 py-3 text-sm placeholder-slate-400 outline-none transition focus:border-[#0088FF] focus:ring-2 focus:ring-[#0088FF]/20"
              aria-label={t(searchHeader, "searchPlaceholder", language) || undefined}
            />
          </div>
        </div>

        {categories.length === 0 || (searchQuery && filteredCategories.length === 0) ? (
          <div className="mx-auto max-w-3xl rounded-[20px] border border-[#E7EAF0] bg-[#F8FBFF] px-6 py-8 text-center">
            {categories.length === 0 ? (
              <p className="text-sm text-slate-500">
                No FAQs configured yet. Add <code className="text-xs">sections.faqCategories</code> from admin panel for the FAQs page.
              </p>
            ) : (
              <p className="text-sm text-slate-500" dir={language === "ar" ? "rtl" : "ltr"}>
                {fq("noMatch")}
              </p>
            )}
          </div>
        ) : categories.length === 0 ? (
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
              <p className="mb-2 px-3 pt-1 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-slate-400" dir={language === "ar" ? "rtl" : "ltr"}>{fq("categories")}</p>
              <ul className="space-y-0.5">
                {filteredCategories.map((category) => {
                  const Icon = iconMap[category.icon] ?? Building2;
                  const isActive = category.id === activeCategory?.id;
                  return (
                    <li key={category.id}>
                      <button
                        type="button"
                        onClick={() => handleCategoryClick(category)}
                        className={`group flex w-full items-center gap-3 rounded-[12px] px-3 py-2.5 text-start transition-all duration-200 ${
                          isActive
                            ? "bg-[#0088FF] text-white"
                            : "text-[#050A13] hover:bg-[#F4F8FF]"
                        }`}
                      >
                        {category.iconImage ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={category.iconImage} alt="" aria-hidden className="h-5 w-5 shrink-0 object-contain" />
                        ) : (
                          <Icon className={`h-3.5 w-3.5 shrink-0 ${isActive ? "text-white" : "text-[#0088FF]"}`} strokeWidth={1.8} aria-hidden />
                        )}
                        <span className={`flex-1 text-[0.82rem] font-medium leading-snug ${isActive ? "text-white" : "text-[#050A13]"}`}>
                          {t(category, "title", language)}
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
                    {activeCategory?.iconImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={activeCategory.iconImage} alt="" aria-hidden className="h-7 w-7 object-contain" />
                    ) : (
                      <Icon className="h-5 w-5 text-[#0088FF]" strokeWidth={1.7} aria-hidden />
                    )}
                  </div>
                );
              })()}
              <div>
                <h3 className="text-[1.05rem] font-semibold tracking-[-0.02em] text-[#050A13]">{t(activeCategory, "title", language)}</h3>
                <p className="text-[0.78rem] text-slate-400" dir={language === "ar" ? "rtl" : "ltr"}>{activeCategory?.items.length} {fq("questions")}</p>
              </div>
            </div>

            <div className="divide-y divide-slate-100 rounded-[20px] border border-[#E7EAF0] bg-white shadow-[0_4px_24px_rgba(6,6,22,0.05)]">
              {activeCategory?.items?.map((item) => {
                const key = makeKey(activeCategory?.id, item.id);
                const isOpen = openQuestionKey === key;
                return (
                  <div key={key}>
                    <button
                      type="button"
                      onClick={() => setOpenQuestionKey(isOpen ? null : key)}
                      className="flex w-full items-center justify-between gap-3 px-4 py-4 text-start sm:gap-4 sm:px-6 sm:py-5"
                      aria-expanded={isOpen}
                      aria-controls={`${key}-content`}
                    >
                      <span className={`text-[0.94rem] font-medium leading-snug transition-colors ${isOpen ? "text-[#0088FF]" : "text-[#050A13]"}`}>
                        {t(item, "question", language)}
                      </span>
                      <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                        isOpen ? "border-[#0088FF] bg-[#0088FF] text-white" : "border-[#E7EAF0] bg-white text-slate-400"
                      }`}>
                        <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} strokeWidth={2.5} aria-hidden />
                      </span>
                    </button>
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      overflow="hidden"
                      id={`${key}-content`}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 sm:px-6 sm:pb-5">
                        {item.answer && (
                          <RichText text={t(item, "answer", language)} className="text-[0.88rem] leading-6 text-slate-500 block" />
                        )}
                        {(() => {
                          const videos = collectVideos(item);
                          const folder = externalLink(item.videoFolderUrl);
                          // Per-language YouTube link (admin: YouTube English /
                          // Arabic). Strict — the Arabic page only plays the
                          // Arabic link, never the English one.
                          const ytLink = language === "ar" ? item.ar?.youtubeUrl : item.youtubeUrl;
                          const ytEmbed = youtubeEmbed(ytLink);
                          // Admin → FAQ question → Video orientation. Portrait
                          // (phone-recorded / Shorts) gets an upright 9:16 frame
                          // instead of a wide one with black bars both sides.
                          const ytPortrait =
                            item.videoOrientation === "portrait" ||
                            (!item.videoOrientation && /\/shorts\//i.test(String(ytLink || "")));
                          if (videos.length === 0 && !folder && !ytEmbed) return null;
                          // Single video → full width. Two or more → 2-up grid
                          // (50% each on sm+, stacking on mobile).
                          const multi = videos.length + (ytEmbed ? 1 : 0) > 1;
                          return (
                            <div
                              className={`mt-4 grid gap-3 ${multi ? "sm:grid-cols-2" : "grid-cols-1"}`}
                            >
                              {ytEmbed ? (
                                <div
                                  className={`overflow-hidden rounded-[14px] border border-[#E7EAF0] bg-black ${
                                    ytPortrait ? "w-full max-w-[340px] justify-self-center" : ""
                                  }`}
                                >
                                  <iframe
                                    src={ytEmbed}
                                    title={`${t(item, "question", language) || "FAQ"} — YouTube video`}
                                    loading="lazy"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                    className={`${ytPortrait ? "aspect-[9/16]" : "aspect-video"} block w-full`}
                                  />
                                </div>
                              ) : null}
                              {videos.map((url, i) => {
                                const fileSrc = directVideoSrc(url);
                                const embed = fileSrc ? null : normalizeVideoUrl(url);
                                return fileSrc ? (
                                  <div key={`${key}-vid-${i}`} className="overflow-hidden rounded-[14px] border border-[#E7EAF0] bg-black">
                                    <video
                                      src={fileSrc}
                                      controls
                                      controlsList="nodownload"
                                      disablePictureInPicture
                                      onContextMenu={(e) => e.preventDefault()}
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
                    </motion.div>
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
