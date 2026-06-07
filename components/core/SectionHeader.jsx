import React from "react";
import { Tag } from "./Tag.jsx";
import { ArrowLink } from "./ArrowLink.jsx";

/**
 * TEDxAmsterdam — SectionHeader
 * The repeating section intro: red uppercase eyebrow, a bold
 * heading (optionally with a red-highlighted span), a body
 * description, and an optional arrow link.
 */
export function SectionHeader({
  eyebrow,
  title,
  description,
  link,
  linkHref = "#",
  align = "left",
  style,
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 20,
        alignItems: align === "center" ? "center" : "flex-start",
        textAlign: align,
        maxWidth: 540,
        ...style,
      }}
    >
      {eyebrow && <Tag>{eyebrow}</Tag>}
      <h2
        style={{
          margin: 0,
          font: "var(--text-h2)",
          letterSpacing: "var(--ls-display)",
          color: "var(--text-primary)",
        }}
      >
        {title}
      </h2>
      {description && (
        <p style={{ margin: 0, font: "var(--text-body)", color: "var(--text-secondary)" }}>
          {description}
        </p>
      )}
      {link && (
        <div style={{ marginTop: 4 }}>
          <ArrowLink href={linkHref}>{link}</ArrowLink>
        </div>
      )}
    </div>
  );
}
