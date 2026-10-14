import React from 'react';
import { cn } from '../utils/cn';
import styles from './Accent.module.css';

export interface AccentProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

/** Sets words inside a heading in the accent red, as the designs do ("Our <Accent>speakers</Accent>"). */
export function Accent({ children, className, ...rest }: AccentProps): React.ReactElement {
  return (
    <span className={cn(styles.accent, className)} {...rest}>
      {children}
    </span>
  );
}
