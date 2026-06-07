import React from "react";

/**
 * Button props.
 * @startingPoint section="Core" subtitle="Primary / secondary / ghost CTA" viewport="700x200"
 */
export interface ButtonProps {
  children: React.ReactNode;
  /** Visual style. @default "primary" */
  variant?: "primary" | "secondary" | "ghost";
  /** @default "md" */
  size?: "sm" | "md" | "lg";
  /** Trail the label with a → arrow. @default false */
  arrow?: boolean;
  /** Render as an anchor when set. */
  href?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
}

/**
 * TED-red call-to-action button. Primary (red), secondary (white),
 * and ghost (outline) variants in three sizes.
 */
export function Button(props: ButtonProps): JSX.Element;
