import React from "react";

export interface RadioGroupOptionProps {
  value: string;
  label: string;
}

export interface RadioGroupProps {
  /** Shared name attribute for the radio inputs. */
  name: string;
  legend?: string;
  /** Currently selected value (controlled). */
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export declare const RadioGroup: {
  (props: RadioGroupProps): React.ReactElement;
  /** Individual radio option — must be a direct child of RadioGroup. */
  Option(props: RadioGroupOptionProps): React.ReactElement;
};
