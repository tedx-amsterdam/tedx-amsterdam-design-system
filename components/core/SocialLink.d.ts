import React from "react";

export interface SocialLinkProps {
  network: "linkedin" | "instagram" | "youtube";
  label?: React.ReactNode;
  href?: string;
  /** Path prefix to the project's assets/ folder. @default "" */
  base?: string;
  style?: React.CSSProperties;
}

/** White social icon + label that reddens on hover. */
export function SocialLink(props: SocialLinkProps): React.ReactElement;
