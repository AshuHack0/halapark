"use client";

import { useSyncExternalStore } from "react";

// The REAL operating-system "reduce motion" setting.
//
// useReducedMotion() from framer-motion is forced on for phones (see
// MobileMotionConfig), which is what we want for entrance animations — but not
// for things like muted background video, which should keep playing on a phone
// and only stop for someone who actually asked for less motion.
const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

const getSnapshot = () => window.matchMedia(QUERY).matches;
const getServerSnapshot = () => false;

export function usePrefersReducedMotionOS() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
