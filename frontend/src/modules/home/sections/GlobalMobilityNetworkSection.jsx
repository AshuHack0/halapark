"use client";

import { useEffect, useState } from "react";
import { fetchHomeSection } from "@/lib/cms";
import { useLanguage, t } from "@/context/LanguageContext";

const partnerLogos = [
  "Parkin Dubai",
  "Darb",
  "RTA",
  "Dubai Municipality",
  "Q Mobility",
  "VISA",
];

const capabilities = [
  {
    title: "Unified Ecosystem",
    description:
      "Seamless integration with leading industry partners across the UAE.",
    icon: "wallet",
  },
  {
    title: "Global Reach",
    description:
      "Designed to connect with third-party and toll systems across the UAE.",
    icon: "globe",
  },
  {
    title: "Cashless & Flexible",
    description: "Pay-later options with secure online payments via encrypted links.",
    icon: "phone",
  },
];

const impactStats = [
  // { value: "2+", label: "UAE Cities Connected", icon: "globe" },
  { value: "10K+", label: "Parking Zones Powered", icon: "building" },
  { value: "1M+", label: "Users Served", icon: "users" },
  { value: "100%", label: "Cashless Experience", icon: "card" },
  {
    value: "1 Vision",
    label: "Partnering for a Smarter Tomorrow",
    icon: "handshake",
  },
];

const mapNodes = [
  { id: "dubai", x: 56, y: 57, label: "Dubai" },
  { id: "europe", x: 46, y: 38, label: "Europe" },
  { id: "east-asia", x: 74, y: 44, label: "East Asia" },
  { id: "south-asia", x: 66, y: 52, label: "South Asia" },
  { id: "africa", x: 50, y: 66, label: "Africa" },
  { id: "americas", x: 23, y: 56, label: "Americas" },
];

const mapLinks = [
  { from: "dubai", to: "europe", curve: -14 },
  { from: "dubai", to: "east-asia", curve: -16 },
  { from: "dubai", to: "south-asia", curve: -10 },
  { from: "dubai", to: "africa", curve: 11 },
  { from: "dubai", to: "americas", curve: -26 },
];

function MetricIcon({ type }) {
  const common = "h-5 w-5 text-[#0088FF]";

  if (type === "globe") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        className={common}
        aria-hidden
      >
        <circle cx="12" cy="12" r="8" />
        <path d="M4 12h16M12 4a14 14 0 0 1 0 16M12 4a14 14 0 0 0 0 16" />
      </svg>
    );
  }
  if (type === "building") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        className={common}
        aria-hidden
      >
        <path d="M3 20h18M6 20V8h5v12M11 8V5h7v15" />
        <path d="M8 11h1M8 14h1M13 8h1M16 8h1M13 11h1M16 11h1" />
      </svg>
    );
  }
  if (type === "users") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        className={common}
        aria-hidden
      >
        <circle cx="9" cy="9" r="3" />
        <circle cx="16" cy="8" r="2.5" />
        <path d="M4 19c0-3 2.4-5 5-5s5 2 5 5M14 19c.2-2 1.7-3.5 4-3.8" />
      </svg>
    );
  }
  if (type === "card") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        className={common}
        aria-hidden
      >
        <rect x="3" y="6" width="18" height="12" rx="2.5" />
        <path d="M3 10h18M7 14h4" />
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className={common}
      aria-hidden
    >
      <path d="M9 12l2 2 4-4" />
      <path d="M20 12c0 4.4-3.6 8-8 8-2.5 0-4.8-1.1-6.3-2.9L4 20l.9-3.1A7.9 7.9 0 0 1 4 12c0-4.4 3.6-8 8-8s8 3.6 8 8Z" />
    </svg>
  );
}

function CapabilityIcon({ type }) {
  const common = "h-[18px] w-[18px] text-[#0088FF]";

  if (type === "wallet") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        className={common}
        aria-hidden
      >
        <rect x="3" y="6.5" width="18" height="11" rx="2.5" />
        <path d="M15 12h6M17 10.8v2.4" />
      </svg>
    );
  }
  if (type === "globe") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        className={common}
        aria-hidden
      >
        <circle cx="12" cy="12" r="8" />
        <path d="M4 12h16M12 4a14 14 0 0 1 0 16M12 4a14 14 0 0 0 0 16" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className={common}
      aria-hidden
    >
      <rect x="7.2" y="3.5" width="9.6" height="17" rx="2.2" />
      <path d="M10 6.5h4M10.5 17.5h3" />
    </svg>
  );
}

export default function GlobalMobilityNetworkSection() {
  const { language } = useLanguage();
  const nodesById = mapNodes.reduce((acc, node) => {
    acc[node.id] = node;
    return acc;
  }, {});

  // Merge CMS text onto the hardcoded capability/stat lists (keep icons by index).
  const [caps, setCaps] = useState(capabilities);
  const [stats, setStats] = useState(impactStats);
  const [content, setContent] = useState({});

  useEffect(() => {
    fetchHomeSection("globalMobility").then((d) => {
      if (!d || typeof d !== "object") return;
      setContent(d);
      if (Array.isArray(d.capabilities) && d.capabilities.length) {
        setCaps(capabilities.map((base, i) => ({ ...base, ...(d.capabilities[i] ?? {}) })));
      }
      if (Array.isArray(d.impactStats) && d.impactStats.length) {
        setStats(impactStats.map((base, i) => ({ ...base, ...(d.impactStats[i] ?? {}) })));
      }
    });
  }, []);

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#F6FAFF_0%,#FFFFFF_68%)] py-8 sm:py-10 md:py-12">
      <div className="pointer-events-none absolute -left-24 top-12 h-72 w-72 rounded-full bg-[#0088FF]/12 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-8 h-80 w-80 rounded-full bg-[#7CC6FF]/18 blur-3xl" />
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[24px] border border-[#D8E7F8] bg-white shadow-[0_20px_56px_rgba(15,23,42,0.08)]">
          <div className="relative z-10 text-center">
            <h2 className="mx-auto pt-5 text-[clamp(2.65rem,4.5vw,4rem)] font-semibold uppercase leading-[1.01] tracking-[-0.06em] text-[#050A13] sm:pt-6 [overflow-wrap:anywhere]">
              {t(content, "heading", language) ? (
                <>
                  {t(content, "heading", language)}
                  {t(content, "headingGradient", language) ? (
                    <>
                      {" "}
                      <span className="bg-[linear-gradient(120deg,#0078E0_10%,#1AB2FF_90%)] bg-clip-text text-transparent">
                        {t(content, "headingGradient", language)}
                      </span>
                    </>
                  ) : null}
                </>
              ) : (
                <>
                  Global Parking{" "}
                  <span className="bg-[linear-gradient(120deg,#0078E0_10%,#1AB2FF_90%)] bg-clip-text text-transparent">
                    Locations
                  </span>
                </>
              )}
            </h2>
            <p className="mx-auto mt-3 max-w-[650px] px-4 text-[0.88rem] leading-6 text-slate-800 sm:text-[0.94rem] text-bold [overflow-wrap:anywhere]">
              {t(content, "subtitle", language) ||
                "Shaping the future of smart parking from the UAE to the world through connected, intelligent parking experiences."}
            </p>
            <p className="mx-auto mt-2 max-w-[650px] px-4 text-[0.88rem] leading-6 text-slate-600 sm:text-[0.94rem]">
              Building a connected ecosystem for seamless, cashless, and
              barrier-free parking experiences across cities and borders.
            </p>
          </div>

          {/* <div className="relative z-10 mt-6 grid grid-cols-2 gap-2.5 border-y border-white/10 py-3 sm:mt-7 sm:grid-cols-3 sm:gap-3 lg:grid-cols-6">
            {partnerLogos.map((logo) => (
              <div
                key={logo}
                className="flex min-h-[52px] items-center justify-center px-2 text-center text-xs font-semibold tracking-[0.02em] text-white/90 sm:text-[13px] lg:border-r lg:border-white/15 last:lg:border-r-0"
              >
                {logo}
              </div>
            ))}
          </div> */}

          <div className="relative z-10 mt-4 isolate min-h-[420px] overflow-hidden sm:min-h-[460px] lg:min-h-[500px]">
            <div className="relative flex min-h-[420px] flex-col sm:min-h-[460px] lg:min-h-[500px]">
              <img
                src="/map_6824dc8ea581a9958227b98c_map.svg"
                alt="Global mobility map"
                className="absolute inset-0 h-full w-full object-cover opacity-[0.96]"
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_22%,rgba(0,136,255,0.08),transparent_32%),radial-gradient(circle_at_86%_18%,rgba(0,136,255,0.09),transparent_30%),linear-gradient(180deg,rgba(248,252,255,0.2),rgba(241,248,255,0.44))]" />
              <svg
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden
              >
                {mapLinks.map((link, index) => {
                  const from = nodesById[link.from];
                  const to = nodesById[link.to];
                  const cx = (from.x + to.x) / 2;
                  const cy = (from.y + to.y) / 2 + link.curve;
                  const path = `M ${from.x} ${from.y} Q ${cx} ${cy} ${to.x} ${to.y}`;

                  return (
                    <path
                      key={`${link.from}-${link.to}`}
                      d={path}
                      fill="none"
                      stroke="rgba(0,136,255,0.62)"
                      strokeWidth="0.26"
                      strokeLinecap="round"
                      className="gm-link-path"
                      style={{
                        animationDelay: `${index * 0.35}s`,
                      }}
                    />
                  );
                })}
              </svg>
              {mapNodes.map((node, index) => (
                <div
                  key={node.id}
                  className="absolute gm-map-node"
                  style={{
                    left: `${node.x}%`,
                    top: `${node.y}%`,
                    animationDelay: `${index * 0.3}s`,
                  }}
                  aria-label={node.label}
                >
                  <span className="gm-map-dot" />
                </div>
              ))}
              <div className="absolute left-[56.1%] top-[58.2%] z-20 -translate-x-1/2 -translate-y-1/2">
                <div className="gm-city-lens">
                  <span className="gm-city-label gm-city-label-main">DUBAI</span>
                  <span className="gm-city-label">ABU DHABI</span>
                </div>
              </div>
              <div className="absolute left-0 top-[10%] z-20 w-full max-w-[360px] px-4 sm:max-w-[390px] sm:px-6">
                <h3 className="text-[1.45rem] font-semibold uppercase leading-[1.18] tracking-[0.02em] text-[#071221] sm:text-[1.85rem]">
                  United by Mobility.
                  <br />
                  Connected Globally.
                </h3>
                <p className="mt-2 max-w-[300px] text-sm leading-relaxed text-slate-600">
                  HalaPark integrates with leading mobility platforms and
                  payment networks to deliver a unified and seamless parking
                  experience.
                </p>

                <ul className="mt-3 space-y-2.5">
                  {caps.map((item) => (
                    <li key={item.title}>
                      <div className="flex items-center gap-2.5">
                        <CapabilityIcon type={item.icon} />
                        <p className="text-[1.03rem] font-semibold text-[#050A13]">
                          {t(item, "title", language)}
                        </p>
                      </div>
                      <p className="mt-1 max-w-[290px] text-[0.92rem] leading-relaxed text-slate-600">
                        {t(item, "description", language)}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>

          <div className="relative z-20 grid gap-2 border-t border-[#DCE9F8] bg-[linear-gradient(180deg,#F8FBFF_0%,#F3F9FF_100%)] px-1 py-3 sm:grid-cols-2 sm:px-3 lg:grid-cols-4 lg:gap-0 lg:py-4">
            {stats.map((item, index) => (
              <div
                key={item.label}
                className={`px-2 py-2 text-center lg:px-5 ${index > 0 ? "lg:border-l lg:border-[#DCE9F8]" : ""}`}
              >
                <div className="mb-2 flex items-center justify-center">
                  <MetricIcon type={item.icon} />
                </div>
                <p className="text-[1.55rem] font-semibold leading-none tracking-[-0.02em] text-[#071221]">
                  {t(item, "value", language)}
                </p>
                <p className="mt-1.5 text-[0.76rem] font-medium uppercase tracking-[0.06em] text-slate-500">
                  {t(item, "label", language)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        .gm-map-node {
          transform: translate(-50%, -50%);
        }

        .gm-map-dot {
          display: block;
          width: 7px;
          height: 7px;
          border-radius: 999px;
          background: #0088ff;
          box-shadow: 0 0 0 0 rgba(0, 136, 255, 0.58);
          animation: gmPulse 2.4s ease-out infinite;
        }

        .gm-link-path {
          stroke-dasharray: 1.8 1;
          stroke-dashoffset: 0;
          animation: gmFlow 3.8s linear infinite;
          filter: drop-shadow(0 0 5px rgba(0, 136, 255, 0.3));
        }

        .gm-city-lens {
          width: 124px;
          height: 124px;
          border-radius: 999px;
          border: 1px solid rgba(0, 136, 255, 0.6);
          background: radial-gradient(
            circle,
            rgba(0, 136, 255, 0.22) 0%,
            rgba(0, 136, 255, 0.1) 45%,
            rgba(0, 136, 255, 0) 72%
          );
          box-shadow:
            0 0 34px rgba(0, 136, 255, 0.3),
            inset 0 0 20px rgba(0, 136, 255, 0.22);
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 4px;
          padding-left: 53px;
          transform: translate3d(0, 0, 0);
        }

        .gm-city-label {
          font-size: 10px;
          line-height: 1.1;
          font-weight: 600;
          letter-spacing: 0.08em;
          color: rgba(7, 18, 33, 0.85);
          white-space: nowrap;
        }

        .gm-city-label-main {
          color: #050a13;
        }

        @media (max-width: 1023px) {
          .gm-city-lens {
            width: 104px;
            height: 104px;
            padding-left: 44px;
          }
        }

        @media (max-width: 767px) {
          .gm-city-lens {
            width: 88px;
            height: 88px;
            padding-left: 34px;
          }

          .gm-city-label {
            font-size: 8px;
          }
        }

        @keyframes gmPulse {
          0% {
            box-shadow: 0 0 0 0 rgba(0, 136, 255, 0.58);
            transform: scale(0.95);
          }
          70% {
            box-shadow: 0 0 0 13px rgba(0, 136, 255, 0);
            transform: scale(1.1);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(196, 181, 253, 0);
            transform: scale(0.95);
          }
        }

        @keyframes gmFlow {
          0% {
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dashoffset: -6;
          }
        }
      `}</style>
    </section>
  );
}
