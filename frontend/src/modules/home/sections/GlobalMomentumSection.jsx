"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import GlobalMomentumMapSection from "./GlobalMomentumMapSection";

const DEFAULT_PARTICLE_COUNT = 12;
const DEFAULT_SPOTLIGHT_RADIUS = 400;
const DEFAULT_GLOW_COLOR = "14, 165, 233";
const MOBILE_BREAKPOINT = 768;

const stats = [
  {
    value: "24%",
    countTo: 24,
    suffix: "%",
    label: "Regional growth momentum",
  },
  {
    value: "$11B+",
    countTo: 11,
    prefix: "$",
    suffix: "B+",
    label: "Projected global smart parking market",
  },
  {
    value: "UAE",
    label: "Leading digital-first urban mobility adoption",
  },
];

function formatCounterValue(value, decimals = 0) {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

function MomentumStatValue({
  value,
  countTo,
  prefix = "",
  suffix = "",
  decimals = 0,
  disableAnimations = false,
}) {
  const counterRef = useRef(null);
  const [displayNumber, setDisplayNumber] = useState(0);

  useEffect(() => {
    if (countTo == null || disableAnimations) {
      return undefined;
    }

    const element = counterRef.current;

    if (!element) {
      return undefined;
    }

    let frameId;
    let observer;
    let hasAnimated = false;

    const animateValue = () => {
      const duration = 1400;
      const startTime = performance.now();

      const tick = (currentTime) => {
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const easedProgress = 1 - (1 - progress) ** 3;
        const currentValue = countTo * easedProgress;
        const roundedValue =
          decimals > 0
            ? Number(currentValue.toFixed(decimals))
            : Math.round(currentValue);

        setDisplayNumber(roundedValue);

        if (progress < 1) {
          frameId = window.requestAnimationFrame(tick);
          return;
        }

        setDisplayNumber(countTo);
      };

      frameId = window.requestAnimationFrame(tick);
    };

    observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || hasAnimated) {
          return;
        }

        hasAnimated = true;
        animateValue();
        observer.disconnect();
      },
      { threshold: 0.45 },
    );

    observer.observe(element);

    return () => {
      if (observer) {
        observer.disconnect();
      }

      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, [countTo, decimals, disableAnimations]);

  const displayValue =
    countTo == null || disableAnimations
      ? value
      : `${prefix}${formatCounterValue(displayNumber, decimals)}${suffix}`;

  return <span ref={counterRef}>{displayValue}</span>;
}

function createParticleElement(x, y, glowColor = DEFAULT_GLOW_COLOR) {
  const particle = document.createElement("div");
  particle.style.cssText = `
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 9999px;
    background: rgba(${glowColor}, 1);
    box-shadow: 0 0 10px rgba(${glowColor}, 0.55);
    pointer-events: none;
    z-index: 20;
    left: ${x}px;
    top: ${y}px;
  `;
  return particle;
}

function updateCardGlowProperties(card, mouseX, mouseY, intensity, radius) {
  const rect = card.getBoundingClientRect();
  const relativeX = ((mouseX - rect.left) / rect.width) * 100;
  const relativeY = ((mouseY - rect.top) / rect.height) * 100;

  card.style.setProperty("--gm-glow-x", `${relativeX}%`);
  card.style.setProperty("--gm-glow-y", `${relativeY}%`);
  card.style.setProperty("--gm-glow-intensity", intensity.toString());
  card.style.setProperty("--gm-glow-radius", `${radius}px`);
}

function useMobileDetection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
}

function MomentumMagicCard({
  children,
  className,
  disableAnimations = false,
  particleCount = DEFAULT_PARTICLE_COUNT,
  glowColor = DEFAULT_GLOW_COLOR,
  clickEffect = true,
}) {
  const cardRef = useRef(null);
  const particlesRef = useRef([]);
  const timeoutsRef = useRef([]);
  const templatesRef = useRef([]);
  const particlesReadyRef = useRef(false);
  const hoveredRef = useRef(false);

  useEffect(() => {
    const element = cardRef.current;

    if (!element || disableAnimations) {
      return undefined;
    }

    const initializeParticles = () => {
      if (particlesReadyRef.current) {
        return;
      }

      const { width, height } = element.getBoundingClientRect();
      templatesRef.current = Array.from({ length: particleCount }, () =>
        createParticleElement(
          Math.random() * width,
          Math.random() * height,
          glowColor,
        ),
      );
      particlesReadyRef.current = true;
    };

    const clearAllParticles = () => {
      timeoutsRef.current.forEach((timeout) => window.clearTimeout(timeout));
      timeoutsRef.current = [];

      particlesRef.current.forEach((particle) => {
        gsap.to(particle, {
          scale: 0,
          opacity: 0,
          duration: 0.25,
          ease: "back.in(1.7)",
          onComplete: () => particle.remove(),
        });
      });

      particlesRef.current = [];
    };

    const animateParticles = () => {
      initializeParticles();

      templatesRef.current.forEach((template, index) => {
        const timeoutId = window.setTimeout(() => {
          if (!hoveredRef.current || !cardRef.current) {
            return;
          }

          const particle = template.cloneNode(true);
          cardRef.current.appendChild(particle);
          particlesRef.current.push(particle);

          gsap.fromTo(
            particle,
            { scale: 0, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.3,
              ease: "back.out(1.7)",
            },
          );

          gsap.to(particle, {
            x: (Math.random() - 0.5) * 90,
            y: (Math.random() - 0.5) * 90,
            rotation: Math.random() * 360,
            duration: 2 + Math.random() * 2,
            ease: "none",
            repeat: -1,
            yoyo: true,
          });

          gsap.to(particle, {
            opacity: 0.25,
            duration: 1.3,
            ease: "power2.inOut",
            repeat: -1,
            yoyo: true,
          });
        }, index * 90);

        timeoutsRef.current.push(timeoutId);
      });
    };

    const handleMouseEnter = () => {
      hoveredRef.current = true;
      animateParticles();
    };

    const handleMouseMove = (event) => {
      updateCardGlowProperties(
        element,
        event.clientX,
        event.clientY,
        1,
        DEFAULT_SPOTLIGHT_RADIUS * 0.82,
      );
    };

    const handleMouseLeave = () => {
      hoveredRef.current = false;
      clearAllParticles();
      element.style.setProperty("--gm-glow-intensity", "0");
    };

    const handleClick = (event) => {
      if (!clickEffect) {
        return;
      }

      const rect = element.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const maxDistance = Math.max(
        Math.hypot(x, y),
        Math.hypot(x - rect.width, y),
        Math.hypot(x, y - rect.height),
        Math.hypot(x - rect.width, y - rect.height),
      );

      const ripple = document.createElement("div");
      ripple.style.cssText = `
        position: absolute;
        width: ${maxDistance * 2}px;
        height: ${maxDistance * 2}px;
        left: ${x - maxDistance}px;
        top: ${y - maxDistance}px;
        border-radius: 9999px;
        pointer-events: none;
        z-index: 15;
        background: radial-gradient(circle, rgba(${glowColor}, 0.34) 0%, rgba(${glowColor}, 0.16) 34%, transparent 72%);
      `;

      element.appendChild(ripple);

      gsap.fromTo(
        ripple,
        { scale: 0, opacity: 1 },
        {
          scale: 1,
          opacity: 0,
          duration: 0.75,
          ease: "power2.out",
          onComplete: () => ripple.remove(),
        },
      );
    };

    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);
    element.addEventListener("click", handleClick);

    return () => {
      hoveredRef.current = false;
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
      element.removeEventListener("click", handleClick);
      clearAllParticles();
    };
  }, [clickEffect, disableAnimations, glowColor, particleCount]);

  return (
    <article
      ref={cardRef}
      data-magic-card="true"
      className={`group relative overflow-hidden transition-[transform,box-shadow] duration-300 hover:-translate-y-[2px] ${className}`}
      style={{
        "--gm-glow-x": "50%",
        "--gm-glow-y": "50%",
        "--gm-glow-intensity": 0,
        "--gm-glow-radius": `${DEFAULT_SPOTLIGHT_RADIUS}px`,
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
        style={{
          background: `radial-gradient(var(--gm-glow-radius) circle at var(--gm-glow-x) var(--gm-glow-y), rgba(${glowColor}, 0.12) 0%, transparent 68%)`,
          opacity: "var(--gm-glow-intensity)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] p-px"
        style={{
          background: `radial-gradient(var(--gm-glow-radius) circle at var(--gm-glow-x) var(--gm-glow-y), rgba(${glowColor}, calc(var(--gm-glow-intensity) * 0.92)) 0%, rgba(${glowColor}, calc(var(--gm-glow-intensity) * 0.4)) 32%, transparent 68%)`,
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </article>
  );
}

export default function GlobalMomentumSection() {
  const isMobile = useMobileDetection();
  const disableAnimations = isMobile;

  return (
    <section className="bg-white py-10 sm:py-12 md:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-4 sm:mb-6 md:mb-8 lg:mb-0">
          {/* <div className="flex items-center justify-center w-fit mx-auto gap-1.5 sm:gap-2 rounded-full px-3 sm:px-4 py-1.5 sm:py-2">
            <img
              src="/download(1).svg"
              alt="BLOG AND INSIGHTS"
              className="w-4 h-4 sm:w-5 sm:h-5 text-white shrink-0"
            />
            <p className="text-xs sm:text-sm lg:text-[14px] text-black max-w-2xl mx-auto">
              Global Momentum
            </p>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[56px] font-semibold text-gray-900 mb-3 sm:mb-4 tracking-tight">
            Smart Parking Is the Future and the UAE Is Leading It
          </h2> */}
          <div className="mx-auto max-w-[980px] text-center">
            <p className="text-[13px] font-medium uppercase tracking-[0.08em] text-[#0088FF] sm:text-[14px]">
              Global Momentum
            </p>

            <h2
              id="ai-powered-parking-service-title"
              className="mx-auto mt-4 max-w-[900px] text-[clamp(2.25rem,4vw,3.55rem)] font-normal leading-[1.03] tracking-[-0.06em] text-[#050A13]"
            >
              Smart Parking Is the Future and the UAE Is Leading It
            </h2>
          </div>
          {/* <p className="text-sm sm:text-base lg:text-[16px] font-medium text-[#6D6D6D] max-w-2xl mx-auto px-4 sm:px-0">
            The global smart parking market is growing rapidly, driven by
            urbanisation and digital-first mobility. HalaPark is at the
            forefront, bringing enterprise-grade technology to the UAE&apos;s
            fastest-growing properties and cities.
          </p> */}
        </div>
        <div className="relative overflow-hidden p-5 sm:p-7 md:p-8">
          <div className="relative">
            <div className="mx-auto mt-10 w-full max-w-6xl">
              <GlobalMomentumMapSection />
            </div>

            {/* <div className="grid gap-4">
              <div className="grid gap-4 sm:grid-cols-3">
                {stats.map((item, index) => (
                  <MomentumMagicCard
                    key={item.label}
                    disableAnimations={disableAnimations}
                    className={`rounded-[1.5rem] border border-[rgba(0,136,255,0.12)] p-5 shadow-[0_16px_32px_rgba(148,163,184,0.12)] sm:p-6 ${
                      index === 1
                        ? "bg-[linear-gradient(135deg,rgba(0,136,255,0.10)_0%,rgba(0,136,255,0.04)_100%)]"
                        : "bg-white/90"
                    }`}
                  >
                    <p className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
                      <MomentumStatValue
                        value={item.value}
                        countTo={item.countTo}
                        prefix={item.prefix}
                        suffix={item.suffix}
                        decimals={item.decimals}
                        disableAnimations={disableAnimations}
                      />
                    </p>
                    <p className="mt-2 text-sm leading-7 text-slate-600 sm:text-base">
                      {item.label}
                    </p>
                  </MomentumMagicCard>
                ))}
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}
