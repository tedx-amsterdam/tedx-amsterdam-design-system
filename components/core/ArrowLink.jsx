import React from "react";

/**
 * TEDxAmsterdam — ArrowLink
 * Bold red text link trailed by the brand arrow. Used for
 * "Check out our past Speakers →", "View All Events →", etc.
 */
export function ArrowLink({ children, href = "#", color = "red", style, ...rest }) {
  const c = color === "white" ? "var(--tedx-white)" : "var(--tedx-red)";
  return (
    <a
      href={href}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        fontFamily: "var(--font-sans)",
        fontWeight: 700,
        fontSize: "var(--fs-tag)",
        lineHeight: 1.2,
        color: c,
        textDecoration: "none",
        transition: "gap var(--dur) var(--ease-out)",
        ...style,
      }}
      onMouseEnter={(e) => (e.currentTarget.style.gap = "12px")}
      onMouseLeave={(e) => (e.currentTarget.style.gap = "8px")}
      {...rest}
    >
      {children}
      <svg width="18" height="9" viewBox="0 0 18 9" fill="none" aria-hidden="true">
        <path d="M0 4.5h15" stroke="currentColor" strokeWidth="1.6" />
        <path d="M11.5 1l4 3.5-4 3.5" stroke="currentColor" strokeWidth="1.6" fill="none" />
      </svg>
    </a>
  );
}
