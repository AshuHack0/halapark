"use client";

import * as React from "react";
import { motion } from "framer-motion";

export default function FlowConnections({
    strokeWidth = 3,
    baseColor = "#0088FF",
    flowStart = "#0088FF",
    flowEnd = "#8B5CF6",
    speed = 2.5,
    paths = [
        "M500 500 C500 260 260 260 140 180",
        "M500 500 C740 260 820 300 900 220",
        "M500 500 C260 520 220 640 140 760",
        "M500 500 C740 560 840 700 900 820",
        "M500 500 C500 160 500 80 500 40",
        "M500 500 C500 840 500 920 500 960",
    ],
    centerSize = 34,
    flowLength = 160,
}) {
    return (
        <svg
            viewBox="0 0 1000 1000"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid meet"
            fill="none"
        >
            <defs>
                <linearGradient id="flowGradient" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="transparent" />
                    <stop offset="40%" stopColor={flowStart} />
                    <stop offset="60%" stopColor={flowEnd} />
                    <stop offset="100%" stopColor="transparent" />
                </linearGradient>
            </defs>

            {/* Center Node */}
            <circle cx="500" cy="500" r={centerSize} fill={flowStart} />

            {paths.map((d, i) => (
                <g key={i}>
                    {/* Base Path */}
                    <path
                        d={d}
                        stroke={baseColor}
                        strokeWidth={strokeWidth}
                        opacity="0.35"
                        fill="none"
                    />

                    {/* Flow Animation */}
                    <motion.path
                        d={d}
                        stroke="url(#flowGradient)"
                        strokeWidth={strokeWidth * 1.6}
                        fill="none"
                        strokeDasharray={`${flowLength} ${flowLength * 2}`}
                        animate={{
                            strokeDashoffset: [-flowLength * 2, flowLength * 2],
                        }}
                        transition={{
                            duration: speed + i * 0.25,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    />
                </g>
            ))}
        </svg>
    );
}

export function GradientOrb({
    size = 120,
    colorA = "#0088FF",
    colorB = "#0088FF",
    colorC = "#8B5CF6",
    shadowColor = "rgba(0,136,255,0.35)",
    blur = 50,
    speed = 24,
}) {
    // Convert speed (10-40 range) to seconds for animation duration
    const duration = speed / 10;

    return (
        <motion.div
            style={{
                width: size,
                height: size,
                borderRadius: "50%",
                backgroundImage: `
                    radial-gradient(circle at 30% 30%, ${colorA}, transparent 60%),
                    radial-gradient(circle at 70% 40%, ${colorB}, transparent 60%),
                    radial-gradient(circle at 50% 70%, ${colorC}, transparent 60%)
                `,
                backgroundSize: "200% 200%",
                filter: `drop-shadow(0 ${size * 0.12}px ${blur}px ${shadowColor})`,
            }}
            animate={{
                backgroundPosition: ["0% 0%", "100% 20%", "80% 100%", "0% 0%"],
            }}
            transition={{
                duration: duration,
                repeat: Infinity,
                ease: "easeInOut",
            }}
        />
    );
}

export function PulseLogo({
    size = 240,
    pulseColor = "#0088FF",
    coreColor = "#0088FF",
    glowColor = "#0088FF",
    duration = 2,
    logo = null,
}) {
    return (
        <div
            style={{
                position: "relative",
                width: size,
                height: size,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            {/* Outer Pulse Ring */}
            <motion.div
                style={{
                    position: "absolute",
                    width: size,
                    height: size,
                    borderRadius: "50%",
                    background: pulseColor,
                }}
                animate={{
                    scale: [1, 2.2, 2.2],
                    opacity: [0.6, 0.2, 0],
                }}
                transition={{
                    duration: duration,
                    repeat: Infinity,
                    ease: "easeOut",
                }}
            />

            {/* Glow Ring */}
            <motion.div
                style={{
                    position: "absolute",
                    width: size * 0.75,
                    height: size * 0.75,
                    borderRadius: "50%",
                    background: glowColor,
                    filter: "blur(20px)",
                }}
                animate={{
                    scale: [1, 1.8, 1.8],
                    opacity: [0.5, 0.2, 0],
                }}
                transition={{
                    duration: duration,
                    repeat: Infinity,
                    ease: "easeOut",
                    delay: duration * 0.3,
                }}
            />

            {/* Core Circle */}
            <div
                style={{
                    width: size * 0.55,
                    height: size * 0.55,
                    borderRadius: "50%",
                    background: coreColor,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 2,
                    boxShadow: `0 0 30px ${glowColor}`,
                }}
            >
                {logo}
            </div>
        </div>
    );
}