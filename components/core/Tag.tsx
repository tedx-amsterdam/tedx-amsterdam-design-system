import React from 'react';
import { cn } from '../utils/cn';
import styles from './Tag.module.css';

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  /** @default "red" */
  color?: 'red' | 'white' | 'muted';
  /** Leading red bullet (for meta / dated labels). @default false */
  dot?: boolean;
  style?: React.CSSProperties;
}

/** Uppercase eyebrow / meta label. Red by default. */
export function Tag({ children, color = 'red', dot = false, style, className, ...rest }: TagProps): React.ReactElement {
  return (
    <span
      className={cn(styles.tag, styles[color], className)}
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
