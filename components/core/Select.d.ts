import React from "react";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  /** Visible label above the select. */
  label?: string;
  /** Array of options. */
  options: SelectOption[];
  /** Controlled selected value. */
  value?: string;
  onChange?: (value: string) => void;
  /** Placeholder shown when no value selected. @default "Select…" */
  placeholder?: string;
  disabled?: boolean;
  /** Validation message; triggers red error state. */
  error?: string;
  id?: string;
  style?: React.CSSProperties;
}

/** Branded native dropdown matching the Input underline style. */
export function Select(props: SelectProps): React.ReactElement;
