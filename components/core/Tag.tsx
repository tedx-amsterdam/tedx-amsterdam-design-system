import React from 'react';
import { cn } from '../utils/cn';
import styles from './Tag.module.css';

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  /** @default "white" */
  color?: 'red' | 'white' | 'muted';
  /** Leading red dot. Turns the label into a meta line (a name, date or venue): regular weight, sentence case. @default false */
  dot?: boolean;
  style?: React.CSSProperties;
}

/** Uppercase eyebrow label, white by default; with `dot`, a meta line. */
export function Tag({ children, color = 'white', dot = false, style, className, ...rest }: TagProps): React.ReactElement {
  return (
    <span
      className={cn(styles.tag, dot && styles.meta, styles[color], className)}
      style={style}
      {...rest}
    >
      {dot && (
        <span
          aria-hidden="true"
          className={styles.dot}
        />
      )}
      {children}
    </span>
  );
}
