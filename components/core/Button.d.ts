import React from "react";

/**
 * Button props.
 * @startingPoint section="Core" subtitle="Primary / secondary / ghost CTA" viewport="700x200"
 */
export type ButtonProps = {
  children: React.ReactNode;
  /** Visual style. @default "primary" */
  variant?: "primary" | "secondary" | "ghost";
  /** @default "md" */
  size?: "sm" | "md" | "lg";
  /** Trail the label with a → arrow. @default false */
  arrow?: boolean;
  disabled?: boolean;
  style?: React.CSSProperties;
} & (
  | ({ href?: undefined } & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "style" | "disabled">)
  | ({ href: string }   & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>,  "style" | "href">)
);

/**
 * TED-red call-to-action button. Primary (red), secondary (white),
 * and ghost (outline) variants in three sizes.
 */
export function Button(props: ButtonProps): React.ReactElement;
