import React from "react";

export interface AccordionItem {
  q: React.ReactNode;
  a: React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  /** Index open on mount; -1 for all closed. @default 0 */
  defaultOpen?: number;
  style?: React.CSSProperties;
}

/** FAQ-style disclosure list; one row open at a time, red active question. */
export function Accordion(props: AccordionProps): JSX.Element;
