import React from "react";

export interface BadgeProps {
  label: string;
  /** Fill variant. @default "red" */
  color?: "red" | "white" | "muted";
  /** @default "md" */
  size?: "sm" | "md";
  style?: React.CSSProperties;
}

/** Small inline pill label. Distinct from Tag: no dot, pill shape, inline flow. */
export function Badge(props: BadgeProps): JSX.Element;
