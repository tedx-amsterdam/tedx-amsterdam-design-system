import React from 'react';
import { cn } from '../utils/cn';
import styles from './Stat.module.css';

export interface StatProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The big figure, e.g. "2009" or "20K". */
  value: React.ReactNode;
  /** Supporting caption to the right. */
  label?: React.ReactNode;
  /** @default "lg" (80px); "xl" = 140px, "md" = 56px */
  size?: 'md' | 'lg' | 'xl';
}

/** Oversized stat figure with supporting label. */
export function Stat({ value, label, size = 'lg', className, style, ...rest }: StatProps): React.ReactElement {
  return (
    <div className={cn(styles.root, className)} style={style} {...rest}>
      <span className={cn(styles.value, styles[size])}>
        {value}
      </span>
      {label && (
        <span className={cn(styles.label, size === 'xl' && styles.labelXl)}>
          {label}
        </span>
      )}
    </div>
  );
}
