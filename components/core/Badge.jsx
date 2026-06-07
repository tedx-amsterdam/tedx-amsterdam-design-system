import React from "react";

/**
 * TEDxAmsterdam — Badge
 * Small inline pill label for statuses, counts, or categories.
 * Distinct from Tag: no dot, not forced uppercase, inline flow, pill shape.
 */
export function Badge({ label, color = "red", size = "md", style }) {
  const colors = {
    red:   { background: "var(--tedx-red)",               color: "var(--tedx-white)" },
    white: { background: "var(--tedx-white)",              color: "var(--tedx-black)" },
    muted: { background: "rgba(255,255,255,0.12)",         color: "var(--text-secondary)" },
  };
  const fontSize = size === "sm" ? 10 : 12;
  const padding  = size === "sm" ? "2px 8px" : "4px 10px";

  return (
    <span
      style={{
        display: "inline-block",
        fontFamily: "var(--font-sans)",
        fontWeight: "var(--weight-bold)",
        fontSize,
        lineHeight: 1.4,
        letterSpacing: "var(--ls-wide)",
        padding,
        borderRadius: "var(--radius-full)",
        ...colors[color],
        ...style,
      }}
    >
      {label}
    </span>
  );
}
