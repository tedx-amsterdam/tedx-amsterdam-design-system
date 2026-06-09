import React from "react";

/**
 * MediaCard props.
 * @startingPoint section="Core" subtitle="Blog / event media card" viewport="380x460"
 */
export interface MediaCardProps {
  /** Image URL. Falls back to the red→orange tile gradient. */
  image?: string;
  /** Corner category label, e.g. "NEWS" / "PODCAST". */
  category?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Dated meta line (rendered with a red bullet). */
  date?: React.ReactNode;
  href?: string;
  /** CSS aspect-ratio for the image. @default "4 / 3" */
  ratio?: string;
  style?: React.CSSProperties;
}

/**
 * Image-led blog / event card with corner category label.
 */
export function MediaCard(props: MediaCardProps): React.ReactElement;
