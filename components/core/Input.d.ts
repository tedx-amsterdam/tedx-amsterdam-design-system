import React from "react";

export interface InputProps {
  /** Field label shown above the line. @default "Email" */
  label?: React.ReactNode;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Surface tone. @default "dark" */
  tone?: "dark" | "light";
  style?: React.CSSProperties;
}

/** Underline form field; rule turns red on focus. */
export function Input(props: InputProps): React.ReactElement;
