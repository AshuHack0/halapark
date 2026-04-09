"use client";

import { useEffect, useMemo, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const INITIAL_TEXT_OPACITY = 0.12;

function SplitText({ children, className = "" }) {
  const content = useMemo(() => {
    const lines = children.split("\n");

    return lines.map((line, lineIndex) => {
      const words = line.split(" ");

      return (
        <span key={lineIndex}>
          {words.map((word, wordIndex) => (
            <span
              key={`${lineIndex}-${wordIndex}`}
              className="inline-block whitespace-nowrap"
            >
              {word.split("").map((character, charIndex) => (
                <span
                  key={`${lineIndex}-${wordIndex}-${charIndex}`}
                  data-who-char
                  className="inline-block"
                >
                  {character}
                </span>
              ))}
              {wordIndex < words.length - 1 && (
                <span data-who-char className="inline-block">
                  {"\u00A0"}
                </span>
              )}
            </span>
          ))}
          {lineIndex < lines.length - 1 && <br />}
        </span>
      );
    });
  }, [children]);

  return <span className={className}>{content}</span>;
}

const headingText = "Who We Are";
const lineOneText = "Built to Redefine Parking as an Asset Class";
const lineTwoText =
  "Hala Park is a smart parking infrastructure company focused on helping businesses";
const lineThreeText =
  "unlock the full financial and operational potential of their parking spaces";

export default function WhoWeAre() {
  const sectionRef = useRef(null);
  const panelRef = useRef(null);
  const labelRef = useRef(null);
  const lineOneRef = useRef(null);
  const lineTwoRef = useRef(null);
  const lineThreeRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const panel = panelRef.current;
    const label = labelRef.current;
    const lineOne = lineOneRef.current;
    const lineTwo = lineTwoRef.current;
    const lineThree = lineThreeRef.current;

    if (!section || !panel || !label || !lineOne || !lineTwo || !lineThree) {
      return;
    }

    const scroller = document.querySelector("[data-scroll-container]");
    const triggerOptions = scroller instanceof HTMLElement ? { scroller } : {};

    const lineOneChars = Array.from(
      lineOne.querySelectorAll("[data-who-char]"),
    );
    const lineTwoChars = Array.from(
      lineTwo.querySelectorAll("[data-who-char]"),
    );
    const lineThreeChars = Array.from(
      lineThree.querySelectorAll("[data-who-char]"),
    );

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(panel, { opacity: 1, scale: 1 });
        gsap.set([label, ...lineOneChars, ...lineTwoChars, ...lineThreeChars], {
          opacity: 1,
        });
        return;
      }

      gsap.set(panel, {
        opacity: 0,
        scale: 0.96,
        transformOrigin: "50% 50%",
      });
      gsap.set(label, { opacity: INITIAL_TEXT_OPACITY });
      gsap.set([...lineOneChars, ...lineTwoChars, ...lineThreeChars], {
        opacity: INITIAL_TEXT_OPACITY,
      });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: panel,
            start: "top 95%",
            toggleActions: "play none none none",
            ...triggerOptions,
          },
        })
        .to(panel, {
          opacity: 1,
          scale: 1,
          duration: 0.7,
          ease: "power2.out",
        });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: panel,
            start: "top 76%",
            end: "top 14%",
            scrub: 0.8,
            invalidateOnRefresh: true,
            ...triggerOptions,
          },
        })
        .to(label, {
          opacity: 1,
          duration: 0.5,
          ease: "none",
        })
        .to(
          lineOneChars,
          {
            opacity: 1,
            duration: 0.5,
            ease: "none",
            stagger: 0.02,
          },
          "-=0.3",
        )
        .to(
          lineTwoChars,
          {
            opacity: 1,
            duration: 0.5,
            ease: "none",
            stagger: 0.02,
          },
          "-=0.5",
        )
        .to(
          lineThreeChars,
          {
            opacity: 1,
            duration: 0.5,
            ease: "none",
            stagger: 0.02,
          },
          "-=0.3",
        );

      window.requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="who-we-are-heading"
      className="bg-white pb-4 sm:pb-5 lg:pb-6"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          ref={panelRef}
          className="relative flex min-h-[760px] items-center justify-center overflow-hidden rounded-[24px] bg-[#BDE3FF] max-[1200px]:min-h-[640px] max-[1200px]:rounded-[22px] max-lg:min-h-[500px] max-lg:rounded-[20px] max-md:min-h-[560px] max-md:rounded-[16px]"
        >
          <div className="relative z-[2] flex max-w-[820px] flex-col items-center gap-6 px-12 py-[80px] text-center max-[1200px]:gap-5 max-[1200px]:px-8 max-lg:gap-4 max-lg:px-8 max-md:gap-3 max-md:px-8">
            <h2
              id="who-we-are-heading"
              ref={labelRef}
              className="text-[18px] font-semibold uppercase leading-[24px] tracking-[0.1em] text-[#181D1F] max-[1200px]:text-[16px] max-md:text-[14px] max-md:leading-[20px]"
            >
              {headingText}
            </h2>

            <p className="text-[52px] font-normal leading-[60px] tracking-[-0.025em] text-[#181D1F] [text-wrap:balance] max-[1200px]:text-[40px] max-[1200px]:leading-[48px] max-md:text-[28px] max-md:leading-[34px]">
              <span ref={lineOneRef}>
                <SplitText>{lineOneText}</SplitText>
              </span>
            </p>

            <p className="text-[52px] font-normal leading-[60px] tracking-[-0.025em] text-[#181D1F] [text-wrap:balance] max-[1200px]:text-[40px] max-[1200px]:leading-[48px] max-md:text-[28px] max-md:leading-[34px]">
              <span ref={lineTwoRef}>
                <SplitText>{lineTwoText}</SplitText>
              </span>
            </p>

            <p className="text-[52px] font-normal leading-[60px] tracking-[-0.025em] text-[#181D1F] max-[1200px]:text-[40px] max-[1200px]:leading-[48px] max-md:text-[28px] max-md:leading-[34px]">
              <span ref={lineThreeRef}>
                <SplitText>{lineThreeText}</SplitText>
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
