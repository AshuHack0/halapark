"use client";

import { forwardRef, useEffect, useMemo, useRef } from "react";
import { Roboto_Flex } from "next/font/google";

const robotoFlex = Roboto_Flex({
  subsets: ["latin"],
  display: "swap",
});

const srOnlyStyle = {
  position: "absolute",
  width: "1px",
  height: "1px",
  padding: 0,
  margin: "-1px",
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  border: 0,
};

function parseVariationSettings(settings) {
  return new Map(
    settings
      .split(",")
      .map((segment) => segment.trim())
      .filter(Boolean)
      .map((segment) => {
        const [axis, value] = segment.split(/\s+/);
        return [axis.replace(/['"]/g, ""), Number.parseFloat(value)];
      }),
  );
}

function useAnimationFrame(callback) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    let frameId = 0;

    const loop = () => {
      callbackRef.current();
      frameId = window.requestAnimationFrame(loop);
    };

    frameId = window.requestAnimationFrame(loop);
    return () => window.cancelAnimationFrame(frameId);
  }, []);
}

function useMousePositionRef(containerRef) {
  const positionRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const updatePosition = (x, y) => {
      if (containerRef?.current) {
        const rect = containerRef.current.getBoundingClientRect();
        positionRef.current = { x: x - rect.left, y: y - rect.top };
        return;
      }

      positionRef.current = { x, y };
    };

    const handleMouseMove = (event) => {
      updatePosition(event.clientX, event.clientY);
    };

    const handleTouchMove = (event) => {
      const touch = event.touches[0];

      if (!touch) {
        return;
      }

      updatePosition(touch.clientX, touch.clientY);
    };

    const resetPosition = () => {
      positionRef.current = { x: -9999, y: -9999 };
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("mouseleave", resetPosition);
    window.addEventListener("touchend", resetPosition);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("mouseleave", resetPosition);
      window.removeEventListener("touchend", resetPosition);
    };
  }, [containerRef]);

  return positionRef;
}

const VariableProximityText = forwardRef(function VariableProximityText(
  {
    label,
    fromFontVariationSettings = "'wght' 400, 'opsz' 9",
    toFontVariationSettings = "'wght' 1000, 'opsz' 40",
    containerRef,
    radius = 80,
    falloff = "linear",
    preserveWords = true,
    className = "",
    style,
    ...restProps
  },
  ref,
) {
  const letterRefs = useRef([]);
  const mousePositionRef = useMousePositionRef(containerRef);
  const lastPositionRef = useRef({ x: null, y: null });

  const parsedSettings = useMemo(() => {
    const fromSettings = parseVariationSettings(fromFontVariationSettings);
    const toSettings = parseVariationSettings(toFontVariationSettings);

    return Array.from(fromSettings.entries()).map(([axis, fromValue]) => ({
      axis,
      fromValue,
      toValue: toSettings.get(axis) ?? fromValue,
    }));
  }, [fromFontVariationSettings, toFontVariationSettings]);

  const words = useMemo(() => {
    const splitWords = label.split(" ");

    return splitWords.map((word, wordIndex) => {
      const offset = splitWords
        .slice(0, wordIndex)
        .reduce((count, currentWord) => count + currentWord.length, 0);

      return {
        key: `${word}-${wordIndex}`,
        letters: word.split("").map((character, characterIndex) => ({
          character,
          index: offset + characterIndex,
        })),
      };
    });
  }, [label]);

  useEffect(() => {
    letterRefs.current.forEach((letterRef) => {
      if (!letterRef) {
        return;
      }

      letterRef.style.fontVariationSettings = fromFontVariationSettings;
    });

    letterRefs.current = letterRefs.current.slice(
      0,
      words.reduce((count, word) => count + word.letters.length, 0),
    );
  }, [fromFontVariationSettings, label, words]);

  useAnimationFrame(() => {
    if (!containerRef?.current) {
      return;
    }

    const { x, y } = mousePositionRef.current;

    if (lastPositionRef.current.x === x && lastPositionRef.current.y === y) {
      return;
    }

    lastPositionRef.current = { x, y };

    const containerRect = containerRef.current.getBoundingClientRect();

    letterRefs.current.forEach((letterRef) => {
      if (!letterRef) {
        return;
      }

      const rect = letterRef.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2 - containerRect.left;
      const centerY = rect.top + rect.height / 2 - containerRect.top;
      const distance = Math.hypot(x - centerX, y - centerY);

      if (distance >= radius) {
        letterRef.style.fontVariationSettings = fromFontVariationSettings;
        return;
      }

      const normalized = Math.min(Math.max(1 - distance / radius, 0), 1);
      const falloffValue =
        falloff === "gaussian"
          ? Math.exp(-((distance / (radius / 2)) ** 2) / 2)
          : falloff === "exponential"
            ? normalized ** 2
            : normalized;

      const settings = parsedSettings
        .map(({ axis, fromValue, toValue }) => {
          const interpolatedValue =
            fromValue + (toValue - fromValue) * falloffValue;
          return `'${axis}' ${interpolatedValue}`;
        })
        .join(", ");

      letterRef.style.fontVariationSettings = settings;
    });
  });

  return (
    <span
      ref={ref}
      className={`${robotoFlex.className} ${className}`.trim()}
      style={{
        display: "inline",
        fontFamily: robotoFlex.style.fontFamily,
        fontWeight: "normal",
        fontOpticalSizing: "none",
        ...style,
      }}
      {...restProps}
    >
      {words.map((word, wordIndex) => (
        <span
          key={word.key}
          style={{
            display: preserveWords ? "inline-block" : "inline",
            whiteSpace: preserveWords ? "nowrap" : "normal",
            fontFamily: "inherit",
          }}
        >
          {word.letters.map(({ character, index }) => {
            return (
              <span
                key={`${character}-${index}`}
                ref={(element) => {
                  letterRefs.current[index] = element;
                }}
                aria-hidden="true"
                style={{
                  display: "inline-block",
                  fontFamily: "inherit",
                  fontWeight: "normal",
                  fontOpticalSizing: "none",
                  fontVariationSettings: fromFontVariationSettings,
                }}
              >
                {character}
              </span>
            );
          })}
          {wordIndex < words.length - 1 && (
            <span
              aria-hidden="true"
              style={{
                display: preserveWords ? "inline-block" : "inline",
                fontFamily: "inherit",
              }}
            >
              {preserveWords ? "\u00A0" : " "}
            </span>
          )}
        </span>
      ))}
      <span style={srOnlyStyle}>{label}</span>
    </span>
  );
});

export default VariableProximityText;
