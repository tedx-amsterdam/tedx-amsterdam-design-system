import React from "react";

export interface LogoProps {
  /** Wordmark colour context. @default "light-on-dark" */
  tone?: "light-on-dark" | "dark-on-light";
  /** Rendered width in px. @default 230 */
  width?: number;
  /** Path prefix to the project's assets/ folder. @default "" */
  base?: string;
  href?: string;
  style?: React.CSSProperties;
}

/** Locked-up red TEDx + Amsterdam wordmark. */
export function Logo(props: LogoProps): JSX.Element;
