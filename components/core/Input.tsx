import React from 'react';
import { cn } from '../utils/cn';
import { useFormField } from './FormField';
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
  className?: string;
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
  className,
  style,
  ...rest
}: InputProps & Omit<React.InputHTMLAttributes<HTMLInputElement>, keyof InputProps>): React.ReactElement {
  const field = useFormField();
  const inputId = id || field?.id || `input-${String(label).toLowerCase().replace(/\s+/g, '-')}`;
  const errorId = `${inputId}-error`;
  const describedBy = [errorId, field?.errorId].filter(Boolean).join(' ');

  return (
    <label className={cn(styles.wrapper, styles[tone], className)} style={style}>
      <span className={styles.label}>{label}</span>
      <input
        id={inputId}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={field?.required || undefined}
        aria-invalid={Boolean(error) || Boolean(field?.invalid)}
        aria-describedby={describedBy}
        className={cn(styles.input, error && styles.error)}
        {...rest}
      />
      <span id={errorId} className={styles.errorMsg} aria-live="polite">
        {error ?? ''}
      </span>
    </label>
  );
}
