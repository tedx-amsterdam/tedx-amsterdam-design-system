import React from "react";
import { Tag } from "./Tag.jsx";

/**
 * TEDxAmsterdam — MediaCard
 * Blog / event card: square-cornered image with a category label
 * in the top-left corner, a bold UPPERCASE title, a muted
 * description, and a dated meta row with a red bullet.
 */
export function MediaCard({
  image,
  category,
  title,
  description,
  date,
  href = "#",
  ratio = "4 / 3",
  style,
}) {
  return (
    <a
      href={href}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
        textDecoration: "none",
        color: "var(--text-primary)",
        ...style,
      }}
      onMouseEnter={(e) => {
        const img = e.currentTarget.querySelector("[data-img]");
        if (img) img.style.transform = "scale(1.04)";
      }}
      onMouseLeave={(e) => {
        const img = e.currentTarget.querySelector("[data-img]");
        if (img) img.style.transform = "scale(1)";
      }}
    >
      <div style={{ position: "relative", overflow: "hidden", aspectRatio: ratio, background: "var(--grad-tile)" }}>
        <div
          data-img
          style={{
            position: "absolute",
            inset: 0,
            background: image ? `url(${image}) center / cover no-repeat` : "var(--grad-tile)",
            transition: "transform var(--dur-slow) var(--ease-out)",
          }}
        />
        {category && (
          <span
            style={{
              position: "absolute",
              left: 14,
              top: 14,
              font: "var(--text-tag)",
              textTransform: "uppercase",
              letterSpacing: "0.04em",
              color: "var(--tedx-white)",
              textShadow: "0 1px 6px rgba(0,0,0,0.6)",
            }}
          >
            {category}
          </span>
        )}
      </div>

      <h3
        style={{
          margin: 0,
          font: "700 22px/1.15 var(--font-display)",
          letterSpacing: "var(--ls-display)",
          textTransform: "uppercase",
        }}
      >
        {title}
      </h3>
      {description && (
        <p style={{ margin: 0, font: "var(--text-body)", fontSize: 16, color: "var(--text-muted)" }}>
          {description}
        </p>
      )}
      {date && (
        <Tag color="white" dot style={{ textTransform: "none", letterSpacing: 0, fontWeight: 400, fontSize: 16 }}>
          {date}
        </Tag>
      )}
    </a>
  );
}
