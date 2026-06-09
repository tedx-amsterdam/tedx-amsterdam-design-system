import React from "react";

/**
 * TEDxAmsterdam — Button
 * Primary = TED-red fill / white bold label, 10px radius.
 * Secondary = white fill / black label. Ghost = outline.
 * Labels are short and bold; an optional arrow trails the label.
 */

const VARIANTS = {
  primary: { background: "var(--tedx-red)", color: "var(--tedx-white)", border: "none" },
  secondary: { background: "var(--tedx-white)", color: "var(--tedx-black)", border: "none" },
  ghost: { background: "transparent", color: "var(--tedx-white)", border: "1.5px solid var(--border-hairline)" },
};

const HOVER_BG = {
  primary: "var(--accent-hover)",
  secondary: "#eaeaea",
  ghost: "rgba(255,255,255,0.08)",
};

const PADS = { sm: "12px 24px", md: "16px 30px", lg: "22px 34px" };

export function Button({
  children,
  variant = "primary",
  size = "md",
  arrow = false,
  href,
  type = "button",
  disabled = false,
  onClick,
  style,
  ...rest
}) {
  const [hovered, setHovered] = React.useState(false);
  const [pressed, setPressed] = React.useState(false);

  const isHovered = hovered && !disabled;
  const isPressed = pressed && !disabled;

  const computedStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    fontFamily: "var(--font-sans)",
    fontWeight: 700,
    fontSize: size === "lg" ? 16 : 14,
    lineHeight: 1,
    letterSpacing: "0.01em",
    padding: PADS[size],
    borderRadius: "var(--radius-button)",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.45 : 1,
    textDecoration: "none",
    transition:
      "background var(--dur) var(--ease-standard), transform var(--dur-fast) var(--ease-standard), opacity var(--dur) var(--ease-standard)",
    WebkitTapHighlightColor: "transparent",
    ...VARIANTS[variant],
    background: isHovered ? HOVER_BG[variant] : VARIANTS[variant].background,
    transform: isPressed ? "scale(0.97)" : "scale(1)",
    ...style,
  };

  const Arrow = arrow ? (
    <svg width="18" height="9" viewBox="0 0 18 9" fill="none" aria-hidden="true">
      <path d="M0 4.5h15" stroke="currentColor" strokeWidth="1.6" />
      <path d="M11.5 1l4 3.5-4 3.5" stroke="currentColor" strokeWidth="1.6" fill="none" />
    </svg>
  ) : null;

  const Tag = href ? "a" : "button";
  const tagProps = href
    ? { href: disabled ? undefined : href, ...(disabled && { "aria-disabled": true, tabIndex: 0 }) }
    : { type, disabled, ...(disabled && { "aria-disabled": true }) };

  return (
    <Tag
      {...tagProps}
      onClick={onClick}
      style={computedStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onMouseDown={() => { if (!disabled) setPressed(true); }}
      onMouseUp={() => setPressed(false)}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { if (!disabled) setPressed(true); } }}
      onKeyUp={(e) => { if (e.key === "Enter" || e.key === " ") setPressed(false); }}
      {...rest}
    >
      {children}
      {Arrow}
    </Tag>
  );
}
