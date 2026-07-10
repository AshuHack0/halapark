"use client";

import { Fragment } from "react";

// Safe lightweight rich-text renderer for CMS text. Parses a tiny, controlled
// markup language into React elements — it NEVER injects raw HTML, so there is
// no XSS surface. Supported markup (all admin-inserted via a toolbar):
//   **bold**              → <strong>
//   *italic*              → <em>
//   [[#0088ff]]text[[/]]  → <span style="color:#0088ff">
//   line breaks           → preserved (rendered as <br/>)
//
// Anything that isn't valid markup renders as plain text.

const COLOR_OPEN = /\[\[(#[0-9a-fA-F]{3,8})\]\]/;

// Only allow a strict hex color — reject anything else so no arbitrary CSS.
function safeColor(value) {
  return /^#[0-9a-fA-F]{3,8}$/.test(value) ? value : null;
}

// Parse inline formatting (bold, italic, color) within a single line into an
// array of React nodes. Colors can wrap bold/italic; bold/italic are parsed
// recursively inside a color span.
function parseInline(text, keyPrefix) {
  const nodes = [];
  let rest = text;
  let k = 0;

  while (rest.length > 0) {
    // Color: [[#hex]] ... [[/]]
    const colorMatch = rest.match(COLOR_OPEN);
    const boldIdx = rest.indexOf("**");
    // Italic: a lone "*" that is not part of "**".
    let italicIdx = -1;
    for (let i = 0; i < rest.length; i += 1) {
      if (rest[i] === "*" && rest[i + 1] !== "*" && rest[i - 1] !== "*") {
        italicIdx = i;
        break;
      }
    }

    // Find the earliest marker.
    const candidates = [
      colorMatch ? { type: "color", idx: colorMatch.index } : null,
      boldIdx !== -1 ? { type: "bold", idx: boldIdx } : null,
      italicIdx !== -1 ? { type: "italic", idx: italicIdx } : null,
    ].filter(Boolean);

    if (candidates.length === 0) {
      nodes.push(<Fragment key={`${keyPrefix}-t${k}`}>{rest}</Fragment>);
      break;
    }

    candidates.sort((a, b) => a.idx - b.idx);
    const next = candidates[0];

    // Emit any plain text before the marker.
    if (next.idx > 0) {
      nodes.push(<Fragment key={`${keyPrefix}-t${k}`}>{rest.slice(0, next.idx)}</Fragment>);
      k += 1;
    }

    if (next.type === "color") {
      const color = safeColor(colorMatch[1]);
      const afterOpen = rest.slice(next.idx + colorMatch[0].length);
      const closeIdx = afterOpen.indexOf("[[/]]");
      if (closeIdx === -1 || !color) {
        // No closing tag / bad color → treat the opener as literal text.
        nodes.push(<Fragment key={`${keyPrefix}-t${k}`}>{colorMatch[0]}</Fragment>);
        k += 1;
        rest = afterOpen;
        continue;
      }
      const inner = afterOpen.slice(0, closeIdx);
      nodes.push(
        <span key={`${keyPrefix}-c${k}`} style={{ color }}>
          {parseInline(inner, `${keyPrefix}-c${k}`)}
        </span>,
      );
      k += 1;
      rest = afterOpen.slice(closeIdx + 5);
      continue;
    }

    if (next.type === "bold") {
      const afterOpen = rest.slice(next.idx + 2);
      const closeIdx = afterOpen.indexOf("**");
      if (closeIdx === -1) {
        nodes.push(<Fragment key={`${keyPrefix}-t${k}`}>{rest.slice(next.idx)}</Fragment>);
        break;
      }
      const inner = afterOpen.slice(0, closeIdx);
      nodes.push(
        <strong key={`${keyPrefix}-b${k}`} className="font-semibold">
          {parseInline(inner, `${keyPrefix}-b${k}`)}
        </strong>,
      );
      k += 1;
      rest = afterOpen.slice(closeIdx + 2);
      continue;
    }

    // italic
    const afterOpen = rest.slice(next.idx + 1);
    const closeIdx = afterOpen.indexOf("*");
    if (closeIdx === -1) {
      nodes.push(<Fragment key={`${keyPrefix}-t${k}`}>{rest.slice(next.idx)}</Fragment>);
      break;
    }
    const inner = afterOpen.slice(0, closeIdx);
    nodes.push(
      <em key={`${keyPrefix}-i${k}`}>{parseInline(inner, `${keyPrefix}-i${k}`)}</em>,
    );
    k += 1;
    rest = afterOpen.slice(closeIdx + 1);
  }

  return nodes;
}

// Render CMS rich text. Splits on newlines to preserve line breaks, then parses
// inline formatting per line. Returns null for empty input.
export default function RichText({ text, className }) {
  const value = typeof text === "string" ? text : "";
  if (!value.trim()) return null;

  const lines = value.split("\n");
  return (
    <span className={className}>
      {lines.map((line, i) => (
        <Fragment key={`line-${i}`}>
          {parseInline(line, `l${i}`)}
          {i < lines.length - 1 ? <br /> : null}
        </Fragment>
      ))}
    </span>
  );
}
