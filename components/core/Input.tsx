import React from 'react';
import { cn } from '../utils/cn';
import styles from './Input.module.css';

export interface InputProps {
  /** Field label shown above the line. @default "Email" */
  label?: React.ReactNode;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Surface tone. @default "dark" */
  tone?: 'dark' | 'light';
  /** Validation message; triggers red error state. */
  error?: string;
  id?: string;
  style?: React.CSSProperties;
}

/** Underline form field; rule turns red on focus. */
export function Input({
  label = 'Email',
  type = 'email',
  placeholder = '',
  value,
  onChange,
  tone = 'dark',
  error,
  id,
  style,
  ...rest
}: InputProps & Omit<React.InputHTMLAttributes<HTMLInputElement>, keyof InputProps>): React.ReactElement {
  const inputId = id || `input-${String(label).toLowerCase().replace(/\s+/g, '-')}`;
  const errorId = inputId ? `${inputId}-error` : undefined;

  return (
    <label className={cn(styles.wrapper, styles[tone])} style={style}>
      <span className={styles.label}>{label}</span>
      <input
        id={inputId}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        aria-invalid={!!error}
        aria-describedby={errorId}
        className={cn(styles.input, error && styles.error)}
        {...rest}
      />
      <span id={errorId} className={styles.errorMsg} aria-live="polite">
        {error ?? ''}
      </span>
    </label>
  );
}
