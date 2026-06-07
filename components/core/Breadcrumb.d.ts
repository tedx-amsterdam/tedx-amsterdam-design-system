import React from "react";

export interface BreadcrumbItem {
  label: string;
  /** Omit for the current page (last item). */
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  /** `aria-label` on the `<nav>`. @default "Breadcrumb" */
  ariaLabel?: string;
  style?: React.CSSProperties;
}

/** Hierarchical navigation trail. Last item is current page. */
export function Breadcrumb(props: BreadcrumbProps): JSX.Element;
