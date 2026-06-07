import React from "react";

/**
 * TEDxAmsterdam — Stat
 * Oversized Helvetica-Bold figure with a small supporting label.
 * Used for the "2009 — events organised since" / "20K — people"
 * counters. Pairs well stacked with a hairline divider between.
 */
export function Stat({ value, label, size = "lg", style }) {
  const fs = size === "xl" ? 140 : size === "lg" ? 80 : 56;
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 28, ...style }}>
      <span
        style={{
          font: `700 ${fs}px/1 var(--font-display)`,
          letterSpacing: "var(--ls-display)",
          color: "var(--text-primary)",
        }}
      >
        {value}
      </span>
      {label && (
        <span
          style={{
            font: "var(--text-body)",
            color: "var(--text-secondary)",
            maxWidth: 170,
            paddingTop: size === "xl" ? 24 : 14,
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
}
