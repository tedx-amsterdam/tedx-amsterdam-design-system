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
  style,
  ...rest
}: InputProps & Omit<React.InputHTMLAttributes<HTMLInputElement>, keyof InputProps>): React.ReactElement {
  return (
    <label className={cn(styles.wrapper, styles[tone])} style={style}>
      <span className={styles.label}>{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={styles.input}
        {...rest}
      />
    </label>
  );
}
