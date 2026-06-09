import React from "react";

export interface SectionHeaderProps {
  /** Red uppercase eyebrow above the title. */
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Optional arrow-link CTA below the copy. */
  link?: React.ReactNode;
  linkHref?: string;
  /** @default "left" */
  align?: "left" | "center";
  style?: React.CSSProperties;
}

/** Eyebrow + heading + description + arrow-link section intro. */
export function SectionHeader(props: SectionHeaderProps): React.ReactElement;
