import React from 'react';
import { cn } from '../utils/cn';
import styles from './Textarea.module.css';

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
export function Textarea({
  label,
  value,
  onChange,
  placeholder,
  rows = 4,
  disabled = false,
  error,
  id,
  style,
  ...rest
}: TextareaProps & Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, keyof TextareaProps>): React.ReactElement {
  const taId = id || (label ? `textarea-${String(label).toLowerCase().replace(/\s+/g, '-')}` : undefined);
  const errorId = taId && error ? `${taId}-error` : undefined;

  return (
    <div className={styles.wrapper} style={style}>
      {label && (
        <label htmlFor={taId} className={styles.label}>
          {label}
        </label>
      )}
      <textarea
        id={taId}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        aria-invalid={!!error}
        aria-describedby={errorId}
        className={cn(
          styles.textarea,
          error && styles.error,
          disabled && styles.disabled,
        )}
        {...rest}
      />
      {error && (
        <span id={errorId} className={styles.errorMsg}>
          {error}
        </span>
      )}
    </div>
  );
}
