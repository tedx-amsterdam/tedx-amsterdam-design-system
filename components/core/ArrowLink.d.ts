import React from "react";

export interface ArrowLinkProps {
  children: React.ReactNode;
  href?: string;
  /** @default "red" */
  color?: "red" | "white";
  style?: React.CSSProperties;
}

/** Bold red text link with the trailing brand arrow. */
export function ArrowLink(props: ArrowLinkProps): JSX.Element;
