import React from 'react';
import { cn } from '../utils/cn';
import { Tag } from './Tag';
import { ArrowLink } from './ArrowLink';
import styles from './SectionHeader.module.css';

export interface SectionHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Red uppercase eyebrow above the title. */
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Optional arrow-link CTA below the copy. */
  link?: React.ReactNode;
  linkHref?: string;
  /** @default "left" */
  align?: 'left' | 'center';
}

/** Eyebrow + heading + description + arrow-link section intro. */
export function SectionHeader({
  eyebrow,
  title,
  description,
  link,
  linkHref = '#',
  align = 'left',
  className,
  style,
  ...rest
}: SectionHeaderProps): React.ReactElement {
  return (
    <div
      className={cn(styles.root, align === 'center' ? styles.center : styles.left, className)}
      style={style}
      {...rest}
    >
      {eyebrow && <Tag>{eyebrow}</Tag>}
      <h2 className={styles.title}>
        {title}
      </h2>
      {description && (
        <p className={styles.description}>
          {description}
        </p>
      )}
      {link && (
        <div className={styles.linkWrap}>
          <ArrowLink href={linkHref}>{link}</ArrowLink>
        </div>
      )}
    </div>
  );
}
