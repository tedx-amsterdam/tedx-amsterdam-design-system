import React from "react";

export interface CheckboxProps {
  /** Visible label beside the checkbox. */
  label: string;
  checked: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  /** Associates the native input; defaults to a slug of label. */
  id?: string;
  style?: React.CSSProperties;
}

/** Single checkbox. Checked state: red fill + white tick. */
export function Checkbox(props: CheckboxProps): JSX.Element;
