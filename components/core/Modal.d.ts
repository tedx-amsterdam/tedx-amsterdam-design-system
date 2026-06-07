import React from "react";

export interface ModalProps {
  isOpen: boolean;
  /** Called on overlay click or Escape key. */
  onClose: () => void;
  /** Dialog heading. Rendered as `<h2>` and linked via `aria-labelledby`. */
  title?: string;
  children?: React.ReactNode;
  /** Dialog width. @default "md" */
  size?: "sm" | "md" | "lg";
  /** Hide the × close button. @default false */
  hideCloseButton?: boolean;
  style?: React.CSSProperties;
}

/**
 * Overlay dialog. Traps focus, locks scroll, closes on Escape or overlay click.
 * Red top border signals brand dialog.
 */
export function Modal(props: ModalProps): JSX.Element | null;
