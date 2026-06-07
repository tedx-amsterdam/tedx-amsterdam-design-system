import React from "react";

export interface TagProps {
  children: React.ReactNode;
  /** @default "red" */
  color?: "red" | "white" | "muted";
  /** Leading red bullet (for meta / dated labels). @default false */
  dot?: boolean;
  style?: React.CSSProperties;
}

/** Uppercase eyebrow / meta label. Red by default. */
export function Tag(props: TagProps): JSX.Element;
