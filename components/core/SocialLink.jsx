import React from "react";

const ICONS = {
  linkedin: "assets/icon-linkedin.svg",
  instagram: "assets/icon-instagram.svg",
  youtube: "assets/icon-youtube.svg",
};

/**
 * TEDxAmsterdam — SocialLink
 * Square white icon chip + label, used in footers and speaker
 * cards. `base` lets you point at the assets folder from any
 * page depth (e.g. "../" or "../../").
 */
export function SocialLink({ network, label, href = "#", base = "", style, ...rest }) {
  const src = base + (ICONS[network] || ICONS.linkedin);
  return (
    <a
      href={href}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 12,
        textDecoration: "none",
        font: "var(--text-body)",
        color: "var(--text-primary)",
        ...style,
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--tedx-red)")}
      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
      {...rest}
    >
      <img
        src={src}
        alt=""
        aria-hidden="true"
        style={{ width: 22, height: 22, objectFit: "contain", filter: "brightness(0) invert(1)" }}
      />
      {label || network}
    </a>
  );
}
