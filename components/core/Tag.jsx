import React from "react";

/**
 * TEDxAmsterdam — Tag
 * Small uppercase eyebrow label. Red by default (the most common
 * usage: section eyebrows like "SPEAKERS", "EARLY BIRD"). Use the
 * `dot` variant for list / meta labels with a leading red bullet.
 */
export function Tag({ children, color = "red", dot = false, style, ...rest }) {
  const colors = {
    red: "var(--tedx-red)",
    white: "var(--tedx-white)",
    muted: "var(--tedx-gray-400)",
  };
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        fontFamily: "var(--font-sans)",
        fontWeight: 700,
        fontSize: "var(--fs-tag)",
        lineHeight: 1.2,
        textTransform: "uppercase",
        letterSpacing: "0.04em",
        color: colors[color],
        ...style,
      }}
      {...rest}
    >
      {dot && (
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "var(--tedx-red)",
            flex: "none",
          }}
        />
      )}
      {children}
    </span>
  );
}
