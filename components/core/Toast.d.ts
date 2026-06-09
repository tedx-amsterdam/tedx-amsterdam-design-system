import React from "react";

export interface ToastProps {
  message: string;
  /** @default "info" */
  type?: "info" | "success" | "error" | "warning";
  /** Auto-dismiss delay in ms. 0 = persist until manually dismissed. @default 4000 */
  duration?: number;
  /** Called when the toast finishes its exit animation. Use to remove it from state. */
  onDismiss?: () => void;
  style?: React.CSSProperties;
}

/**
 * Transient bottom-right notification. Slides in from right, auto-dismisses.
 * Caller renders/unrenders via state; use `onDismiss` to clean up.
 * error/warning use `role="alert"` (assertive); info/success use `role="status"` (polite).
 */
export function Toast(props: ToastProps): React.ReactElement;
