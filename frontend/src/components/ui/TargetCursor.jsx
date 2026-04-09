"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import styles from "./TargetCursor.module.css";

function shouldEnableCursor() {
  if (typeof window === "undefined") {
    return false;
  }

  const hasTouchScreen =
    "ontouchstart" in window || navigator.maxTouchPoints > 0;
  const isSmallScreen = window.innerWidth <= 768;
  const userAgent = navigator.userAgent || navigator.vendor || "";
  const mobileRegex =
    /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
  const isMobileUserAgent = mobileRegex.test(userAgent.toLowerCase());

  return !((hasTouchScreen && isSmallScreen) || isMobileUserAgent);
}

function getResetCornerPositions(cornerSize) {
  return [
    { x: -cornerSize * 1.5, y: -cornerSize * 1.5 },
    { x: cornerSize * 0.5, y: -cornerSize * 1.5 },
    { x: cornerSize * 0.5, y: cornerSize * 0.5 },
    { x: -cornerSize * 1.5, y: cornerSize * 0.5 },
  ];
}

export default function TargetCursor({
  scopeRef,
  targetSelector = ".cursor-target",
  spinDuration = 2,
  hideDefaultCursor = true,
  hoverDuration = 0.2,
  parallaxOn = true,
}) {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const cornersRef = useRef([]);
  const spinTlRef = useRef(null);
  const activeTargetRef = useRef(null);
  const currentLeaveHandlerRef = useRef(null);
  const targetCornerPositionsRef = useRef(null);
  const tickerFnRef = useRef(null);
  const activeStrengthRef = useRef(0);
  const isInsideScopeRef = useRef(false);
  const resumeTimeoutRef = useRef(null);
  const scopeNodeRef = useRef(null);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    const updateSupport = () => {
      setIsEnabled(shouldEnableCursor());
    };

    updateSupport();
    window.addEventListener("resize", updateSupport);

    return () => window.removeEventListener("resize", updateSupport);
  }, []);

  useEffect(() => {
    if (!isEnabled || !cursorRef.current) {
      return undefined;
    }

    const scopeNode = scopeRef?.current;

    if (!scopeNode) {
      return undefined;
    }

    scopeNodeRef.current = scopeNode;
    cornersRef.current = Array.from(
      cursorRef.current.querySelectorAll("[data-target-corner]"),
    );

    const constants = {
      borderWidth: 3,
      cornerSize: 12,
    };

    const resetCorners = () => {
      const positions = getResetCornerPositions(constants.cornerSize);

      cornersRef.current.forEach((corner, index) => {
        gsap.to(corner, {
          x: positions[index].x,
          y: positions[index].y,
          duration: 0.3,
          ease: "power3.out",
          overwrite: "auto",
        });
      });
    };

    const cleanupTarget = () => {
      const activeTarget = activeTargetRef.current;
      const leaveHandler = currentLeaveHandlerRef.current;

      if (activeTarget && leaveHandler) {
        activeTarget.removeEventListener("mouseleave", leaveHandler);
      }

      currentLeaveHandlerRef.current = null;
      activeTargetRef.current = null;
    };

    const createSpinTimeline = () => {
      spinTlRef.current?.kill();
      spinTlRef.current = gsap
        .timeline({ repeat: -1 })
        .to(cursorRef.current, {
          rotation: "+=360",
          duration: spinDuration,
          ease: "none",
        });
    };

    const hideCursor = () => {
      gsap.to(cursorRef.current, {
        autoAlpha: 0,
        duration: 0.18,
        ease: "power2.out",
      });
    };

    const showCursor = () => {
      gsap.to(cursorRef.current, {
        autoAlpha: 1,
        duration: 0.18,
        ease: "power2.out",
      });
    };

    const moveCursor = (x, y) => {
      gsap.to(cursorRef.current, {
        x,
        y,
        duration: 0.1,
        ease: "power3.out",
        overwrite: "auto",
      });
    };

    const leaveActiveTarget = () => {
      if (!activeTargetRef.current) {
        return;
      }

      gsap.ticker.remove(tickerFnRef.current);
      targetCornerPositionsRef.current = null;
      gsap.set(activeStrengthRef, { current: 0, overwrite: true });
      cleanupTarget();
      resetCorners();

      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current);
      }

      resumeTimeoutRef.current = window.setTimeout(() => {
        if (!activeTargetRef.current && spinTlRef.current) {
          const currentRotation = Number(
            gsap.getProperty(cursorRef.current, "rotation"),
          );
          const normalizedRotation = ((currentRotation % 360) + 360) % 360;

          createSpinTimeline();
          gsap.to(cursorRef.current, {
            rotation: normalizedRotation + 360,
            duration: spinDuration * (1 - normalizedRotation / 360),
            ease: "none",
            onComplete: () => {
              spinTlRef.current?.restart();
            },
          });
        }

        resumeTimeoutRef.current = null;
      }, 50);
    };

    tickerFnRef.current = () => {
      if (!targetCornerPositionsRef.current || !activeTargetRef.current) {
        return;
      }

      const strength = activeStrengthRef.current;

      if (strength === 0) {
        return;
      }

      const cursorX = Number(gsap.getProperty(cursorRef.current, "x"));
      const cursorY = Number(gsap.getProperty(cursorRef.current, "y"));

      cornersRef.current.forEach((corner, index) => {
        const currentX = Number(gsap.getProperty(corner, "x"));
        const currentY = Number(gsap.getProperty(corner, "y"));
        const targetX = targetCornerPositionsRef.current[index].x - cursorX;
        const targetY = targetCornerPositionsRef.current[index].y - cursorY;
        const nextX = currentX + (targetX - currentX) * strength;
        const nextY = currentY + (targetY - currentY) * strength;
        const duration = strength >= 0.99 ? (parallaxOn ? 0.2 : 0) : 0.05;

        gsap.to(corner, {
          x: nextX,
          y: nextY,
          duration,
          ease: duration === 0 ? "none" : "power1.out",
          overwrite: "auto",
        });
      });
    };

    if (hideDefaultCursor) {
      scopeNode.classList.add(styles.cursorHidden);
    }

    gsap.set(cursorRef.current, {
      xPercent: -50,
      yPercent: -50,
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      autoAlpha: 0,
    });

    resetCorners();
    createSpinTimeline();

    const handleScopeEnter = (event) => {
      isInsideScopeRef.current = true;
      moveCursor(event.clientX, event.clientY);
      showCursor();
    };

    const handleScopeMove = (event) => {
      moveCursor(event.clientX, event.clientY);
    };

    const handleScopeLeave = () => {
      isInsideScopeRef.current = false;
      leaveActiveTarget();
      hideCursor();
    };

    const handleScopeOver = (event) => {
      const rawTarget = event.target;

      if (!(rawTarget instanceof Element)) {
        return;
      }

      const target = rawTarget.closest(targetSelector);

      if (!target || !scopeNode.contains(target)) {
        return;
      }

      if (activeTargetRef.current === target) {
        return;
      }

      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current);
        resumeTimeoutRef.current = null;
      }

      leaveActiveTarget();
      activeTargetRef.current = target;

      gsap.killTweensOf(cursorRef.current, "rotation");
      spinTlRef.current?.pause();
      gsap.set(cursorRef.current, { rotation: 0 });

      const rect = target.getBoundingClientRect();
      const cursorX = Number(gsap.getProperty(cursorRef.current, "x"));
      const cursorY = Number(gsap.getProperty(cursorRef.current, "y"));

      targetCornerPositionsRef.current = [
        { x: rect.left - constants.borderWidth, y: rect.top - constants.borderWidth },
        {
          x: rect.right + constants.borderWidth - constants.cornerSize,
          y: rect.top - constants.borderWidth,
        },
        {
          x: rect.right + constants.borderWidth - constants.cornerSize,
          y: rect.bottom + constants.borderWidth - constants.cornerSize,
        },
        {
          x: rect.left - constants.borderWidth,
          y: rect.bottom + constants.borderWidth - constants.cornerSize,
        },
      ];

      gsap.ticker.add(tickerFnRef.current);
      gsap.to(activeStrengthRef, {
        current: 1,
        duration: hoverDuration,
        ease: "power2.out",
        overwrite: true,
      });

      cornersRef.current.forEach((corner, index) => {
        gsap.to(corner, {
          x: targetCornerPositionsRef.current[index].x - cursorX,
          y: targetCornerPositionsRef.current[index].y - cursorY,
          duration: 0.2,
          ease: "power2.out",
          overwrite: "auto",
        });
      });

      const handleTargetLeave = () => {
        leaveActiveTarget();
      };

      currentLeaveHandlerRef.current = handleTargetLeave;
      target.addEventListener("mouseleave", handleTargetLeave);
    };

    const handleScroll = () => {
      const activeTarget = activeTargetRef.current;

      if (!activeTarget || !isInsideScopeRef.current) {
        return;
      }

      const cursorX = Number(gsap.getProperty(cursorRef.current, "x"));
      const cursorY = Number(gsap.getProperty(cursorRef.current, "y"));
      const elementUnderMouse = document.elementFromPoint(cursorX, cursorY);
      const nextTarget =
        elementUnderMouse instanceof Element
          ? elementUnderMouse.closest(targetSelector)
          : null;

      if (nextTarget !== activeTarget) {
        leaveActiveTarget();
      }
    };

    const handleMouseDown = () => {
      if (!isInsideScopeRef.current) {
        return;
      }

      gsap.to(dotRef.current, {
        scale: 0.7,
        duration: 0.3,
        overwrite: "auto",
      });
      gsap.to(cursorRef.current, {
        scale: 0.9,
        duration: 0.2,
        overwrite: "auto",
      });
    };

    const handleMouseUp = () => {
      if (!isInsideScopeRef.current) {
        return;
      }

      gsap.to(dotRef.current, {
        scale: 1,
        duration: 0.3,
        overwrite: "auto",
      });
      gsap.to(cursorRef.current, {
        scale: 1,
        duration: 0.2,
        overwrite: "auto",
      });
    };

    scopeNode.addEventListener("mouseenter", handleScopeEnter);
    scopeNode.addEventListener("mousemove", handleScopeMove);
    scopeNode.addEventListener("mouseleave", handleScopeLeave);
    scopeNode.addEventListener("mouseover", handleScopeOver);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      gsap.ticker.remove(tickerFnRef.current);
      scopeNode.removeEventListener("mouseenter", handleScopeEnter);
      scopeNode.removeEventListener("mousemove", handleScopeMove);
      scopeNode.removeEventListener("mouseleave", handleScopeLeave);
      scopeNode.removeEventListener("mouseover", handleScopeOver);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);

      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current);
        resumeTimeoutRef.current = null;
      }

      cleanupTarget();
      spinTlRef.current?.kill();

      if (hideDefaultCursor) {
        scopeNode.classList.remove(styles.cursorHidden);
      }
    };
  }, [
    hideDefaultCursor,
    hoverDuration,
    isEnabled,
    parallaxOn,
    scopeRef,
    spinDuration,
    targetSelector,
  ]);

  if (!isEnabled) {
    return null;
  }

  return (
    <div ref={cursorRef} className={styles.wrapper} aria-hidden="true">
      <div ref={dotRef} className={styles.dot} />
      <div
        data-target-corner
        className={`${styles.corner} ${styles.cornerTl}`}
      />
      <div
        data-target-corner
        className={`${styles.corner} ${styles.cornerTr}`}
      />
      <div
        data-target-corner
        className={`${styles.corner} ${styles.cornerBr}`}
      />
      <div
        data-target-corner
        className={`${styles.corner} ${styles.cornerBl}`}
      />
    </div>
  );
}
