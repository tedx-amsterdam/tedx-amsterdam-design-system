import React from "react";

export interface StatProps {
  /** The big figure, e.g. "2009" or "20K". */
  value: React.ReactNode;
  /** Supporting caption to the right. */
  label?: React.ReactNode;
  /** @default "lg" (80px); "xl" = 140px, "md" = 56px */
  size?: "md" | "lg" | "xl";
  style?: React.CSSProperties;
}

/** Oversized stat figure with supporting label. */
export function Stat(props: StatProps): React.ReactElement;
