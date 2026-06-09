import React from "react";

export interface NavLink {
  label: string;
  href: string;
}

export interface NavigationBarProps {
  links?: NavLink[];
  /** CTA button label. */
  ctaLabel?: string;
  /** CTA button destination. */
  ctaHref?: string;
  /** Logo link destination. @default "/" */
  logoHref?: string;
  /** Marks the matching link as active (`aria-current="page"`). */
  activePath?: string;
  /** Asset path prefix. Use `"../../"` from nested HTML files. @default "" */
  base?: string;
  /** href for the skip-to-content link. @default "#main-content" */
  skipTarget?: string;
  style?: React.CSSProperties;
}

/**
 * Sticky top nav bar. Desktop: logo + links + CTA. Mobile (< 768px): hamburger.
 * Active link highlighted in red via `activePath`.
 */
export function NavigationBar(props: NavigationBarProps): React.ReactElement;
