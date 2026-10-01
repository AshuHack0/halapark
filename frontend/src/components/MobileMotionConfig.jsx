"use client";

import { useSyncExternalStore } from "react";
import { MotionConfig } from "framer-motion";

// Below this width we turn every framer-motion entrance animation off, per
// client request: no fade-in / slide-in while scrolling on phones and tablets.
// Components already branch on useReducedMotion(), and MotionConfig's
// reducedMotion="always" makes that hook return true for the whole tree, so the
// final state renders immediately instead of animating in.
const MOBILE_QUERY = "(max-width: 1023px)";

function subscribe(onChange) {
  const mq = window.matchMedia(MOBILE_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

const getSnapshot = () => window.matchMedia(MOBILE_QUERY).matches;
// On the server there is no viewport; desktop is the safe default because the
// mobile branch only ever removes animation.
const getServerSnapshot = () => false;

export default function MobileMotionConfig({ children }) {
  const isMobile = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return <MotionConfig reducedMotion={isMobile ? "always" : "user"}>{children}</MotionConfig>;
}
