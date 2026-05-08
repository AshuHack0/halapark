import Image from "next/image";
import { Monitor, Radar, SmartphoneNfc, Workflow } from "lucide-react";
import styles from "./SolutionIntegration.module.css";

const solutionCards = [
  {
    id: "barrier",
    title: "All-in-One Barrier Integration",
    description: "All-in-one compact system with barriers, AI cameras, and lighting for efficient parking.",
  },
  {
    id: "camera",
    title: "ANPR & AI Camera Integration",
    description:
      "ANPR and AI cameras enable secure, real-time parking detection.  ",
  },
  {
    id: "systems",
    title: "Guidance Display Integration",
    description:
      "Smart displays show real-time parking info for better user experience.",
  },
  {
    id: "kiosk",
    title: "Software & Kiosk Integration",
    description:
      "Unified system with apps, operations, and kiosks for quick payments and access.  ",
  },
  {
    id: "sensor",
    title: "Sensor-Based Parking Management",
    description:
      "Smart displays show real-time parking info for better user experience.",
  },
  {
    id: "end-to-end",
    title: "End-to-End System Integration",
    description:
      "Integrated platform for scalable, automated parking operations.",
  },
];

const integrationNodes = [
  {
    id: "camera",
    nodeClass:
      "left-[18%] top-[15%] h-[58px] w-[58px] rounded-[14px] sm:h-[54px] sm:w-[54px] lg:h-[62px] lg:w-[62px] lg:rounded-[16px]",
    iconClass:
      "h-[28px] w-[28px] sm:h-[32px] sm:w-[32px] lg:h-[36px] lg:w-[36px]",
  },
  {
    id: "barrier",
    nodeClass:
      "left-[0%] top-[41%] h-[58px] w-[58px] rounded-[14px] sm:h-[54px] sm:w-[54px] lg:h-[62px] lg:w-[62px] lg:rounded-[16px]",
    iconClass:
      "h-[28px] w-[28px] sm:h-[32px] sm:w-[32px] lg:h-[36px] lg:w-[36px]",
  },
  {
    id: "systems",
    nodeClass:
      "left-[18%] top-[64%] h-[58px] w-[58px] rounded-[14px] sm:h-[54px] sm:w-[54px] lg:h-[62px] lg:w-[62px] lg:rounded-[16px]",
    iconClass:
      "h-[28px] w-[28px] sm:h-[32px] sm:w-[32px] lg:h-[36px] lg:w-[36px]",
  },
];

const rightIntegrationNodes = [
  {
    id: "kiosk",
    nodeClass:
      "right-[18%] top-[15%] h-[58px] w-[58px] rounded-[14px] sm:h-[54px] sm:w-[54px] lg:h-[62px] lg:w-[62px] lg:rounded-[16px]",
    iconClass:
      "h-[28px] w-[28px] sm:h-[32px] sm:w-[32px] lg:h-[36px] lg:w-[36px]",
  },
  {
    id: "sensor",
    nodeClass:
      "right-[0%] top-[41%] h-[58px] w-[58px] rounded-[14px] sm:h-[54px] sm:w-[54px] lg:h-[62px] lg:w-[62px] lg:rounded-[16px]",
    iconClass:
      "h-[28px] w-[28px] sm:h-[32px] sm:w-[32px] lg:h-[36px] lg:w-[36px]",
  },
  {
    id: "end-to-end",
    nodeClass:
      "right-[18%] top-[64%] h-[58px] w-[58px] rounded-[14px] sm:h-[54px] sm:w-[54px] lg:h-[62px] lg:w-[62px] lg:rounded-[16px]",
    iconClass:
      "h-[28px] w-[28px] sm:h-[32px] sm:w-[32px] lg:h-[36px] lg:w-[36px]",
  },
];

const integrationConnectors = [
  { x1: 20, y: 26, x2: 49, delay: "0s" },
  { x1: 2, y: 51, x2: 49, delay: "0.18s" },
  { x1: 20, y: 76, x2: 49, delay: "0.36s" },
  { x1: 51, y: 26, x2: 80, delay: "0.08s" },
  { x1: 51, y: 51, x2: 98, delay: "0.26s" },
  { x1: 51, y: 76, x2: 80, delay: "0.44s" },
];

function SystemsIcon({ className = "", stroke = "#111111" }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle cx="10" cy="24" r="3.5" fill={stroke} />
      <circle cx="24" cy="12" r="3.5" fill={stroke} />
      <circle cx="24" cy="24" r="3.5" fill={stroke} />
      <circle cx="24" cy="36" r="3.5" fill={stroke} />
      <circle cx="38" cy="18" r="3.5" fill={stroke} />
      <circle cx="38" cy="30" r="3.5" fill={stroke} />
      <path
        d="M13.5 24H20.5M26.8 13.9 35 18M26.8 34.1 35 30M24 15.8V20.2M24 27.8V32.2M27.5 24H34.5"
        stroke={stroke}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

const lucideSolutionIcons = {
  systems: Monitor,
  kiosk: SmartphoneNfc,
  sensor: Radar,
  "end-to-end": Workflow,
};

function SolutionIcon({
  id,
  className = "",
  muted = false,
  imageClassName = "",
}) {
  if (id === "barrier") {
    return (
      <div
        className={`relative ${className}`}
        style={muted ? { opacity: 0.6 } : undefined}
      >
        <Image
          src="/Halapark Sample (1)/UI/Barrier 1.png"
          alt=""
          fill
          sizes="42px"
          className={`object-contain ${imageClassName}`}
        />
      </div>
    );
  }

  if (id === "camera") {
    return (
      <div
        className={`relative ${className}`}
        style={muted ? { opacity: 0.72 } : undefined}
      >
        <Image
          src="/Halapark Sample (2)/UI/cctv 1.png"
          alt=""
          fill
          sizes="42px"
          className={`object-contain ${imageClassName}`}
        />
      </div>
    );
  }

  const LucideIcon = lucideSolutionIcons[id];

  if (LucideIcon) {
    return (
      <LucideIcon
        aria-hidden="true"
        className={className}
        strokeWidth={1.65}
        style={{ color: muted ? "#9E9E9E" : "#111111" }}
      />
    );
  }

  return (
    <SystemsIcon className={className} stroke={muted ? "#9E9E9E" : "#111111"} />
  );
}

function NodeCard({ className, children }) {
  return (
    <div
      className={`absolute z-30 flex items-center justify-center border border-[#E7EAF0] bg-white shadow-[0_16px_40px_rgba(15,23,42,0.08)] ${className}`}
    >
      {children}
    </div>
  );
}

function IntegrationDiagram() {
  return (
    <div className="relative mx-auto mt-10 h-[220px] max-w-[370px] sm:h-[252px] sm:max-w-[470px] lg:mt-14 lg:h-[284px] lg:max-w-[650px]">
      {/* <div className="absolute inset-x-[18%] top-[10%] h-[132px] rounded-full bg-[radial-gradient(circle,rgba(0,136,255,0.12)_0%,rgba(17,136,255,0)_72%)] blur-2xl sm:h-[154px] lg:h-[190px] lg:blur-[36px]" /> */}

      <svg
        className="pointer-events-none absolute inset-0 z-10 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {integrationConnectors.map((connector) => (
          <line
            key={`${connector.x1}-${connector.y}-${connector.x2}`}
            className={styles.connectorPath}
            x1={connector.x1}
            y1={connector.y}
            x2={connector.x2}
            y2={connector.y}
            style={{ animationDelay: connector.delay }}
          />
        ))}
      </svg>

      {integrationNodes.map((node) => (
        <NodeCard key={node.id} className={node.nodeClass}>
          <SolutionIcon id={node.id} className={node.iconClass} muted />
        </NodeCard>
      ))}

      {rightIntegrationNodes.map((node) => (
        <NodeCard key={`right-${node.id}`} className={node.nodeClass}>
          <SolutionIcon id={node.id} className={node.iconClass} muted />
        </NodeCard>
      ))}

      <div className="absolute left-1/2 top-[16%] z-20 flex h-[136px] w-[136px] -translate-x-1/2 items-center justify-center overflow-hidden rounded-[20px] bg-[linear-gradient(180deg,#24A3FF_0%,#007EEA_100%)] shadow-[0_20px_44px_rgba(0,136,255,0.22)] sm:h-[158px] sm:w-[158px] sm:rounded-[22px] lg:h-[192px] lg:w-[192px] lg:rounded-[24px] lg:shadow-[0_26px_64px_rgba(0,136,255,0.25)]">
        <div className="absolute inset-0 rounded-[inherit] bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.55),transparent_58%)]" />
        <Image
          src="/Layer_1.svg"
          alt="HalaPark mark"
          width={80}
          height={102}
          className="relative h-[76px] w-[60px] object-contain sm:h-[88px] sm:w-[70px] lg:h-[102px] lg:w-[80px]"
        />
      </div>
    </div>
  );
}

function SolutionCard({ id, title, description }) {
  return (
    <article
      className={`${styles.solutionCard} h-full w-full rounded-[24px] border border-[#E7EAF0] bg-white p-5 sm:p-6`}
    >
      <SolutionIcon
        id={id}
        className={`${styles.cardIcon} h-[34px] w-[34px] sm:h-[38px] sm:w-[38px]`}
        imageClassName={styles.cardIconImage}
      />
      <h3
        className={`${styles.cardTitle} mt-3 text-[17px] font-medium leading-[1.14] tracking-[-0.04em] text-[#050A13] sm:text-[19px] lg:text-[20px]`}
      >
        {title}
      </h3>
      <p className="mt-3 text-[13px] font-normal leading-[1.35] text-[#8B919C] sm:text-[14px] lg:text-[15px]">
        {description}
      </p>
    </article>
  );
}

function SolutionCardsCarousel() {
  const loop = [...solutionCards, ...solutionCards];

  return (
    <div
      className="mx-auto mt-10 w-full overflow-x-hidden pb-2 lg:mt-12 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
      aria-label="Solution integrations, scrolling"
    >
      <style>{`
        @keyframes solutionMarquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .solution-cards-marquee {
          animation: solutionMarquee 45s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .solution-cards-marquee {
            animation: none;
          }
        }
      `}</style>
      <div className="flex w-max gap-4 sm:gap-5 md:gap-6 solution-cards-marquee">
        {loop.map((card, index) => (
          <div
            key={`${card.id}-${index}`}
            className="w-[min(88vw,380px)] shrink-0 sm:w-[min(45vw,420px)] md:w-[min(38vw,440px)] lg:w-[360px]"
          >
            <SolutionCard {...card} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SolutionIntegration() {
  return (
    <section className="bg-white py-12 sm:py-14 lg:py-16">
      <div className="mx-auto w-full max-w-[min(100%,1400px)] px-4 sm:px-6 lg:px-8">
        {/* <div className="mx-auto max-w-[980px] text-center">
          <p className="text-[16px] font-medium tracking-[-0.03em] text-[#0088FF]">
            Solution Integration
          </p>
          <h2 className="mx-auto mt-4 max-w-[900px] text-[24px] font-medium leading-[1.08] tracking-[-0.02em] text-[#050A13] sm:text-[26px] lg:text-[30px]">
            Hala Park enhances your current parking systems by connecting <br />
            hardware, software, and operations into one unified platform.
          </h2>
        </div> */}
        <div className="mx-auto max-w-[980px] text-center">
          <h2
            id="ai-powered-parking-service-title"
            className="mx-auto mt-4 max-w-[940px] text-[clamp(2.65rem,4.5vw,4rem)] font-semibold uppercase leading-[1.01] tracking-[-0.06em] text-[#050A13]"
          >
            Solution{" "}
            <span className="bg-[linear-gradient(120deg,#0078E0_10%,#1AB2FF_90%)] bg-clip-text text-transparent">
              Integration
            </span>
          </h2>
          <p className="mx-auto mt-3 max-w-[650px] text-[0.88rem] leading-6 text-slate-600 sm:text-[0.94rem]">
            End-to-end integrated parking solution that connects hardware,
            software, and operations into one unified platform.
          </p>
        </div>

        <IntegrationDiagram />

        <SolutionCardsCarousel />
      </div>
    </section>
  );
}
