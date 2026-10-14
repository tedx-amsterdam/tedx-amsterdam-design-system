import React from 'react';
import { cn } from '../utils/cn';
import styles from './Badge.module.css';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  label: string;
  /** Fill variant. @default "black" */
  color?: 'black' | 'red' | 'white' | 'muted';
  /** @default "md" */
  size?: 'sm' | 'md';
}

/** Square label on a filled background, such as "News" or "Event" on a photo. Distinct from Tag, which has no background. */
export function Badge({ label, color = 'black', size = 'md', className, style, ...rest }: BadgeProps): React.ReactElement {
  return (
    <span className={cn(styles.badge, styles[color], styles[size], className)} style={style} {...rest}>
      {label}
    </span>
  );
}
