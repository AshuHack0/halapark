import Image from "next/image";
import styles from "./SolutionIntegration.module.css";

const solutionCards = [
  {
    id: "barrier",
    title: "Barrier Installation",
    description: "Automated entry and exit systems for controlled access.",
  },
  {
    id: "camera",
    title: "Camera Integration (ANPR / CCTV)",
    description:
      "Licence plate recognition and surveillance for security and automation.",
  },
  {
    id: "systems",
    title: "All-in-One Parking Systems",
    description:
      "End-to-end setup combining hardware, software, and operational management.",
  },
];

const integrationNodes = [
  {
    id: "camera",
    nodeClass:
      "left-[23%] top-[15%] h-[58px] w-[58px] rounded-[14px] sm:h-[54px] sm:w-[54px] lg:h-[62px] lg:w-[62px] lg:rounded-[16px]",
    iconClass:
      "h-[28px] w-[28px] sm:h-[32px] sm:w-[32px] lg:h-[36px] lg:w-[36px]",
  },
  {
    id: "barrier",
    nodeClass:
      "left-[4%] top-[41%] h-[58px] w-[58px] rounded-[14px] sm:h-[54px] sm:w-[54px] lg:h-[62px] lg:w-[62px] lg:rounded-[16px]",
    iconClass:
      "h-[28px] w-[28px] sm:h-[32px] sm:w-[32px] lg:h-[36px] lg:w-[36px]",
  },
  {
    id: "systems",
    nodeClass:
      "left-[23%] top-[64%] h-[58px] w-[58px] rounded-[14px] sm:h-[54px] sm:w-[54px] lg:h-[62px] lg:w-[62px] lg:rounded-[16px]",
    iconClass:
      "h-[28px] w-[28px] sm:h-[32px] sm:w-[32px] lg:h-[36px] lg:w-[36px]",
  },
];

const integrationConnectors = [
  { className: "left-[32%] top-[26%]", width: "39%", delay: "0s" },
  { className: "left-[13%] top-[51%]", width: "58%", delay: "0.18s" },
  { className: "left-[32%] top-[76%]", width: "39%", delay: "0.36s" },
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
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

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

  return (
    <SystemsIcon className={className} stroke={muted ? "#9E9E9E" : "#111111"} />
  );
}

function NodeCard({ className, children }) {
  return (
    <div
      className={`absolute flex items-center justify-center border border-[#E7EAF0] bg-white shadow-[0_16px_40px_rgba(15,23,42,0.08)] ${className}`}
    >
      {children}
    </div>
  );
}

function ConnectorLine({ className, width, delay = "0s" }) {
  return (
    <div
      aria-hidden="true"
      className={`absolute flex items-center ${className}`}
      style={{ width }}
    >
      <span className="h-[7px] w-[7px] rounded-full bg-[#0088FF]" />
      <span
        className={`${styles.connectorTrack} mx-[7px] h-[2px] flex-1 rounded-full`}
        style={{
          animationDelay: delay,
        }}
      />
      <span className="h-[7px] w-[7px] rounded-full bg-[#0088FF]" />
    </div>
  );
}

function IntegrationDiagram() {
  return (
    <div className="relative mx-auto mt-10 h-[220px] max-w-[370px] sm:h-[252px] sm:max-w-[470px] lg:mt-14 lg:h-[284px] lg:max-w-[650px]">
      {/* <div className="absolute inset-x-[18%] top-[10%] h-[132px] rounded-full bg-[radial-gradient(circle,rgba(0,136,255,0.12)_0%,rgba(17,136,255,0)_72%)] blur-2xl sm:h-[154px] lg:h-[190px] lg:blur-[36px]" /> */}

      {integrationConnectors.map((connector) => (
        <ConnectorLine
          key={`${connector.className}-${connector.width}`}
          className={connector.className}
          width={connector.width}
          delay={connector.delay}
        />
      ))}

      {integrationNodes.map((node) => (
        <NodeCard key={node.id} className={node.nodeClass}>
          <SolutionIcon id={node.id} className={node.iconClass} muted />
        </NodeCard>
      ))}

      <div className="absolute right-[4%] top-[16%] flex h-[136px] w-[136px] items-center justify-center overflow-hidden rounded-[20px] bg-[linear-gradient(180deg,#24A3FF_0%,#007EEA_100%)] shadow-[0_20px_44px_rgba(0,136,255,0.22)] sm:h-[158px] sm:w-[158px] sm:rounded-[22px] lg:h-[192px] lg:w-[192px] lg:rounded-[24px] lg:shadow-[0_26px_64px_rgba(0,136,255,0.25)]">
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
      className={`${styles.solutionCard} w-full rounded-[24px] border border-[#E7EAF0] bg-white p-5 sm:p-6`}
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

export default function SolutionIntegration() {
  return (
    <section className="bg-white py-12 sm:py-14 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
          <p className="text-[15px] font-semibold uppercase tracking-[0.1em] text-[#0088FF] sm:text-[16px]">
            Solution Integration
          </p>

          <h2
            id="ai-powered-parking-service-title"
            className="mx-auto mt-4 max-w-[900px] text-[clamp(2.6rem,4.4vw,3.95rem)] font-medium leading-[1.03] tracking-[-0.06em] text-[#050A13]"
          >
            Unify Hardware, Software, and Operations
          </h2>
        </div>

        <IntegrationDiagram />

        <div className="mx-auto mt-10 grid max-w-[1080px] gap-4 sm:grid-cols-2 sm:gap-6 lg:mt-12 lg:grid-cols-3 lg:gap-8">
          {solutionCards.map((card) => (
            <SolutionCard key={card.id} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}
