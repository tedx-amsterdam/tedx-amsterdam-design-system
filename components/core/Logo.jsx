import React from "react";

/**
 * TEDxAmsterdam — Logo
 * The locked-up wordmark: red "TEDx" + "Amsterdam" in the
 * surrounding ink colour (white on dark, black on light).
 * `base` resolves the asset path from any page depth.
 */
export function Logo({ tone = "light-on-dark", width = 230, base = "", href, style }) {
  // On dark surfaces use the white-wordmark PNG; on light surfaces the
  // SVG renders TEDx red + Amsterdam black (its currentColor default).
  const src =
    tone === "dark-on-light"
      ? base + "assets/logo-tedxamsterdam.svg"
      : base + "assets/logo-tedxamsterdam-white.png";
  const img = (
    <img
      src={src}
      alt="TEDxAmsterdam"
      style={{ width, height: "auto", display: "block" }}
    />
  );
  const wrap = { display: "inline-flex", ...style };
  return href ? (
    <a href={href} style={{ ...wrap, textDecoration: "none" }}>{img}</a>
  ) : (
    <span style={wrap}>{img}</span>
  );
}
