import React from "react";

/**
 * TEDxAmsterdam — Breadcrumb
 * Hierarchical location trail. Last item is the current page (no href, aria-current).
 * Items separator: › glyph. Typography matches Tag (uppercase, wide tracking).
 */
export function Breadcrumb({ items = [], ariaLabel = "Breadcrumb", style }) {
  return (
    <nav aria-label={ariaLabel} style={style}>
      <ol
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "var(--space-2)",
          listStyle: "none",
          margin: 0,
          padding: 0,
          fontFamily: "var(--font-sans)",
          fontWeight: "var(--weight-bold)",
          fontSize: "var(--fs-tag)",
          letterSpacing: "var(--ls-wide)",
          textTransform: "uppercase",
        }}
      >
        {items.map((item, i) => {
          const isCurrent = i === items.length - 1;
          return (
            <li key={i} style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
              {!isCurrent && item.href ? (
                <a
                  href={item.href}
                  style={{ color: "var(--text-secondary)", textDecoration: "none" }}
                >
                  {item.label}
                </a>
              ) : (
                <span
                  aria-current={isCurrent ? "page" : undefined}
                  style={{ color: isCurrent ? "var(--text-primary)" : "var(--text-secondary)" }}
                >
                  {item.label}
                </span>
              )}
              {!isCurrent && (
                <span aria-hidden="true" style={{ color: "var(--text-muted)" }}>›</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
