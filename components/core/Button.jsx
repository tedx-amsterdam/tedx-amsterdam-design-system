import React from "react";

/**
 * TEDxAmsterdam — Button
 * Primary = TED-red fill / white bold label, 10px radius.
 * Secondary = white fill / black label. Ghost = outline.
 * Labels are short and bold; an optional arrow trails the label.
 */
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
  const pad = {
    sm: "12px 24px",
    md: "16px 30px",
    lg: "22px 34px",
  }[size];
  const fontSize = size === "lg" ? 16 : 14;

  const variants = {
    primary: { background: "var(--tedx-red)", color: "var(--tedx-white)", border: "none" },
    secondary: { background: "var(--tedx-white)", color: "var(--tedx-black)", border: "none" },
    ghost: {
      background: "transparent",
      color: "var(--tedx-white)",
      border: "1.5px solid var(--border-hairline)",
    },
  };

  const baseStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    fontFamily: "var(--font-sans)",
    fontWeight: 700,
    fontSize,
    lineHeight: 1,
    letterSpacing: "0.01em",
    padding: pad,
    borderRadius: "var(--radius-button)",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.45 : 1,
    textDecoration: "none",
    transition: "background var(--dur) var(--ease-standard), transform var(--dur-fast) var(--ease-standard), opacity var(--dur) var(--ease-standard)",
    WebkitTapHighlightColor: "transparent",
    ...variants[variant],
    ...style,
  };

  const onDown = (e) => { if (!disabled) e.currentTarget.style.transform = "scale(0.97)"; };
  const onUp = (e) => { e.currentTarget.style.transform = "scale(1)"; };
  const onEnter = (e) => {
    if (disabled) return;
    if (variant === "primary") e.currentTarget.style.background = "var(--accent-hover)";
    if (variant === "secondary") e.currentTarget.style.background = "#eaeaea";
    if (variant === "ghost") e.currentTarget.style.background = "rgba(255,255,255,0.08)";
  };
  const onLeave = (e) => {
    e.currentTarget.style.transform = "scale(1)";
    e.currentTarget.style.background = variants[variant].background;
  };

  const Arrow = arrow ? (
    <svg width="18" height="9" viewBox="0 0 18 9" fill="none" aria-hidden="true">
      <path d="M0 4.5h15" stroke="currentColor" strokeWidth="1.6" />
      <path d="M11.5 1l4 3.5-4 3.5" stroke="currentColor" strokeWidth="1.6" fill="none" />
    </svg>
  ) : null;

  const Tag = href ? "a" : "button";
  const tagProps = href ? { href } : { type, disabled };

  return (
    <Tag
      {...tagProps}
      onClick={onClick}
      style={baseStyle}
      onMouseDown={onDown}
      onMouseUp={onUp}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      {...rest}
    >
      {children}
      {Arrow}
    </Tag>
  );
}
