import React from "react";

export interface TextareaProps {
  /** Visible label above the field. */
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  /** Initial visible row count. @default 4 */
  rows?: number;
  disabled?: boolean;
  /** Validation message; triggers red error state. */
  error?: string;
  id?: string;
  style?: React.CSSProperties;
}

/** Multi-line text input matching the Input underline style. */
export function Textarea(props: TextareaProps): JSX.Element;
