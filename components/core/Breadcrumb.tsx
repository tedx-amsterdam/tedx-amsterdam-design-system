import React from 'react';
import styles from './Breadcrumb.module.css';

export interface BreadcrumbItem {
  label: string;
  /** Omit for the current page (last item). */
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  /** `aria-label` on the `<nav>`. @default "Breadcrumb" */
  ariaLabel?: string;
  style?: React.CSSProperties;
}

/** Hierarchical navigation trail. Last item is current page. */
export function Breadcrumb({ items = [], ariaLabel = 'Breadcrumb', style }: BreadcrumbProps): React.ReactElement {
  return (
    <nav aria-label={ariaLabel} style={style}>
      <ol className={styles.list}>
        {items.map((item, i) => {
          const isCurrent = i === items.length - 1;
          return (
            <li key={i} className={styles.item}>
              {!isCurrent && item.href ? (
                <a href={item.href} className={styles.link}>
                  {item.label}
                </a>
              ) : (
                <span
                  aria-current={isCurrent ? 'page' : undefined}
                  className={isCurrent ? styles.current : styles.link}
                >
                  {item.label}
                </span>
              )}
              {!isCurrent && (
                <span aria-hidden="true" className={styles.separator}>›</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
