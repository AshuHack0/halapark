"use client";

import { createContext, useEffect, useEffectEvent, useRef } from "react";
import { usePathname } from "next/navigation";
import "locomotive-scroll/dist/locomotive-scroll.css";

export const ScrollContainerRefContext = createContext(null);

const LOCOMOTIVE_CONFIG = {
  smooth: true,
  multiplier: 1,
  lerp: 0.1,
};

const NAVBAR_OFFSET = 70;
const ROUTE_REFRESH_DELAY = 250;

export default function SmoothScroll({ children }) {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const locomotiveRef = useRef(null);
  const refreshFrameRef = useRef(0);
  const refreshTimeoutRef = useRef(null);
  const pathname = usePathname();

  const clearPendingRefresh = useEffectEvent(() => {
    if (refreshFrameRef.current) {
      window.cancelAnimationFrame(refreshFrameRef.current);
      refreshFrameRef.current = 0;
    }

    if (refreshTimeoutRef.current) {
      window.clearTimeout(refreshTimeoutRef.current);
      refreshTimeoutRef.current = null;
    }
  });

  const syncScrollPosition = useEffectEvent(
    ({ honorHash = true, resetToTop = true } = {}) => {
      const locomotive = locomotiveRef.current;

      if (!locomotive) {
        return;
      }

      const hash = honorHash
        ? decodeURIComponent(window.location.hash.replace(/^#/, ""))
        : "";
      const anchorTarget = hash ? document.getElementById(hash) : null;

      if (anchorTarget) {
        locomotive.scrollTo(anchorTarget, { offset: -NAVBAR_OFFSET });
      } else if (resetToTop) {
        locomotive.scrollTo(0, { immediate: true, force: true });
      }

      locomotive.resize();
    },
  );

  const scheduleRefresh = useEffectEvent((options) => {
    clearPendingRefresh();

    refreshFrameRef.current = window.requestAnimationFrame(() => {
      refreshFrameRef.current = window.requestAnimationFrame(() => {
        syncScrollPosition(options);
      });
    });

    refreshTimeoutRef.current = window.setTimeout(() => {
      locomotiveRef.current?.resize();
    }, ROUTE_REFRESH_DELAY);
  });

  useEffect(() => {
    let isMounted = true;

    const initLocomotive = async () => {
      if (!containerRef.current || !contentRef.current) {
        return;
      }

      const { default: LocomotiveScroll } = await import("locomotive-scroll");

      if (!isMounted || !containerRef.current || !contentRef.current) {
        return;
      }

      document.documentElement.classList.add("has-scroll-smooth");

      // Map the requested Locomotive config to the current Lenis-based API.
      locomotiveRef.current = new LocomotiveScroll({
        lenisOptions: {
          wrapper: containerRef.current,
          content: contentRef.current,
          eventsTarget: containerRef.current,
          smoothWheel: LOCOMOTIVE_CONFIG.smooth,
          wheelMultiplier: LOCOMOTIVE_CONFIG.multiplier,
          touchMultiplier: LOCOMOTIVE_CONFIG.multiplier,
          lerp: LOCOMOTIVE_CONFIG.lerp,
          autoResize: true,
        },
        autoStart: true,
      });

      scheduleRefresh();
    };

    initLocomotive();

    return () => {
      isMounted = false;
      clearPendingRefresh();
      locomotiveRef.current?.destroy();
      locomotiveRef.current = null;
      document.documentElement.classList.remove("has-scroll-smooth");
    };
  }, []);

  useEffect(() => {
    if (!locomotiveRef.current) {
      return;
    }

    scheduleRefresh();
  }, [pathname]);

  useEffect(() => {
    const handleHashChange = () => {
      syncScrollPosition({ honorHash: true, resetToTop: false });
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      data-scroll-container
      className="h-screen overflow-x-hidden overflow-y-auto"
    >
      <div ref={contentRef} className="min-h-full">
        <ScrollContainerRefContext.Provider value={containerRef}>
          {children}
        </ScrollContainerRefContext.Provider>
      </div>
    </div>
  );
}
